import { FitScorer } from './fitScorer.js'

export class CandidateEvaluation {
  constructor() {
    this.fitScorer = new FitScorer()
  }

  evaluateCandidate(candidate, companyDNA, currentTeam, role) {
    const fitScore = this.fitScorer.scoreCandidate(candidate, companyDNA)
    const stageFit = this.evaluateStageFit(candidate, companyDNA.stage)
    const teamFit = this.evaluateTeamFit(candidate, currentTeam)
    const cultureFit = this.evaluateCultureFit(candidate, companyDNA)
    const founderFit = this.evaluateFounderFit(candidate, companyDNA)
    const growthFit = this.evaluateGrowthFit(candidate, companyDNA)
    const budgetFit = this.evaluateBudgetFit(candidate, companyDNA)
    const redFlags = this.detectRedFlags(candidate, companyDNA, role)

    const multiDimensionalScore = {
      overall: fitScore.overallFit,
      stageFit: stageFit.score,
      teamFit: teamFit.score,
      cultureFit: cultureFit.score,
      founderFit: founderFit.score,
      growthFit: growthFit.score,
      budgetFit: budgetFit.score,
      builderMindset: fitScore.dimensions.builderMindset,
      learningSpeed: fitScore.dimensions.learningSpeed,
    }

    return {
      candidate,
      role,
      scores: multiDimensionalScore,
      stageFit: stageFit,
      teamFit: teamFit,
      cultureFit: cultureFit,
      founderFit: founderFit,
      growthFit: growthFit,
      budgetFit: budgetFit,
      redFlags,
      recommendation: this.getRecommendation(multiDimensionalScore, redFlags),
      riskIndicators: fitScore.riskIndicators,
    }
  }

  evaluateStageFit(candidate, companyStage) {
    const stageExperience = candidate.experience?.filter(exp => 
      this.isSimilarStage(exp.stage, companyStage)
    ) || []

    const score = stageExperience.length > 0 ? 95 : 
                  candidate.experience?.some(exp => this.isAdjacentStage(exp.stage, companyStage)) ? 70 : 40

    return {
      score,
      hasExperience: stageExperience.length > 0,
      experience: stageExperience,
      reasoning: stageExperience.length > 0 
        ? 'Has direct experience at similar stage' 
        : 'Limited experience at this stage',
    }
  }

  isSimilarStage(stage1, stage2) {
    return stage1 === stage2
  }

  isAdjacentStage(stage1, stage2) {
    const stages = ['pre_seed', 'seed', 'series_a', 'series_b', 'series_c', 'growth']
    const idx1 = stages.indexOf(stage1)
    const idx2 = stages.indexOf(stage2)
    return Math.abs(idx1 - idx2) <= 1
  }

  evaluateTeamFit(candidate, currentTeam) {
    const teamSkills = currentTeam.map(m => m.skills || []).flat()
    const candidateSkills = candidate.skills || []
    
    const complementarySkills = candidateSkills.filter(skill => !teamSkills.includes(skill))
    const overlapSkills = candidateSkills.filter(skill => teamSkills.includes(skill))
    
    const score = complementarySkills.length > overlapSkills.length ? 85 : 
                 complementarySkills.length > 0 ? 70 : 50

    return {
      score,
      complementarySkills,
      overlapSkills,
      reasoning: complementarySkills.length > 0 
        ? 'Brings new skills to complement team' 
        : 'Significant skill overlap with existing team',
    }
  }

  evaluateCultureFit(candidate, companyDNA) {
    const companyValues = companyDNA.cultureDNA?.values || []
    const candidateValues = candidate.values || []
    
    const alignment = companyValues.filter(v => 
      candidateValues.some(cv => cv.toLowerCase().includes(v.toLowerCase()))
    ).length

    const score = Math.min(100, 60 + (alignment * 15))

    return {
      score,
      alignedValues: companyValues.filter(v => 
        candidateValues.some(cv => cv.toLowerCase().includes(v.toLowerCase()))
      ),
      missingValues: companyValues.filter(v => 
        !candidateValues.some(cv => cv.toLowerCase().includes(v.toLowerCase()))
      ),
      reasoning: alignment >= companyValues.length * 0.7 
        ? 'Strong alignment with company values' 
        : 'Some values misalignment detected',
    }
  }

  evaluateFounderFit(candidate, companyDNA) {
    const founderStyle = companyDNA.founderStyle || 'collaborative'
    const candidateWorkStyle = candidate.preferredWorkStyle || 'collaborative'
    
    const score = founderStyle === candidateWorkStyle ? 90 : 70

    return {
      score,
      founderStyle,
      candidateWorkStyle,
      reasoning: founderStyle === candidateWorkStyle 
        ? 'Work style aligns with founder preferences' 
        : 'Work style may require adjustment',
    }
  }

  evaluateGrowthFit(candidate, companyDNA) {
    const isGeneralist = candidate.isGeneralist || false
    const companyStage = companyDNA.stage
    
    const needsGeneralist = ['pre_seed', 'seed'].includes(companyStage)
    const needsSpecialist = ['series_b', 'series_c', 'growth'].includes(companyStage)
    
    let score = 70
    if (needsGeneralist && isGeneralist) score = 90
    if (needsSpecialist && !isGeneralist) score = 90
    if (needsGeneralist && !isGeneralist) score = 50
    if (needsSpecialist && isGeneralist) score = 50

    return {
      score,
      isGeneralist,
      companyNeeds: needsGeneralist ? 'generalist' : 'specialist',
      reasoning: (needsGeneralist && isGeneralist) || (needsSpecialist && !isGeneralist)
        ? 'Growth trajectory fit is strong' 
        : 'Growth trajectory fit may be challenging',
    }
  }

  evaluateBudgetFit(candidate, companyDNA) {
    const candidateExpectation = candidate.salaryExpectation || 0
    const stageBudget = this.getStageBudget(companyDNA.stage, companyDNA.runwayMonths)
    
    const score = candidateExpectation <= stageBudget.max ? 90 :
                  candidateExpectation <= stageBudget.max * 1.2 ? 70 : 40

    return {
      score,
      candidateExpectation,
      stageBudget,
      reasoning: candidateExpectation <= stageBudget.max 
        ? 'Compensation expectations align with stage' 
        : 'Compensation expectations may exceed budget',
    }
  }

  getStageBudget(stage, runway) {
    const budgets = {
      pre_seed: { min: 60, max: 120 },
      seed: { min: 100, max: 180 },
      series_a: { min: 150, max: 250 },
      series_b: { min: 200, max: 350 },
      series_c: { min: 250, max: 500 },
      growth: { min: 300, max: 600 },
    }
    return budgets[stage] || budgets.seed
  }

  detectRedFlags(candidate, companyDNA, role) {
    const flags = []

    if (candidate.experience?.every(exp => exp.companySize > 1000)) {
      flags.push({
        type: 'over_qualified',
        severity: 'high',
        message: 'Only enterprise experience - may struggle with startup pace',
      })
    }

    if (candidate.experience?.some(exp => exp.tenure < 6)) {
      flags.push({
        type: 'job_hopper',
        severity: 'medium',
        message: 'Short tenures may indicate poor fit or commitment issues',
      })
    }

    if (!this.evaluateStageFit(candidate, companyDNA.stage).hasExperience) {
      flags.push({
        type: 'stage_mismatch',
        severity: 'high',
        message: 'No experience at similar startup stage',
      })
    }

    if (this.evaluateCultureFit(candidate, companyDNA).score < 60) {
      flags.push({
        type: 'culture_mismatch',
        severity: 'high',
        message: 'Significant culture misalignment detected',
      })
    }

    if (candidate.salaryExpectation > this.getStageBudget(companyDNA.stage, companyDNA.runwayMonths).max * 1.2) {
      flags.push({
        type: 'budget_mismatch',
        severity: 'medium',
        message: 'Compensation expectations significantly exceed stage budget',
      })
    }

    return flags
  }

  getRecommendation(scores, redFlags) {
    const highRiskFlags = redFlags.filter(f => f.severity === 'high')
    const overallScore = scores.overall

    if (highRiskFlags.length > 0 || overallScore < 60) return 'reject'
    if (overallScore >= 80 && highRiskFlags.length === 0) return 'strong_hire'
    if (overallScore >= 70) return 'hire'
    return 'consider'
  }
}

