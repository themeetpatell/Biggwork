// Talent Genome - Fit Scoring
export class FitScorer {
  scoreCandidate(candidate, companyDNA) {
    const dimensions = this.calculateDimensions(candidate, companyDNA)
    const overallFit = this.calculateOverallFit(dimensions)
    const successProbability = this.calculateSuccessProbability(dimensions, companyDNA)
    const riskIndicators = this.identifyRisks(dimensions)
    const recommendation = this.getRecommendation(overallFit, riskIndicators)

    return {
      overallFit,
      successProbability,
      dimensions,
      riskIndicators,
      recommendation,
    }
  }

  calculateDimensions(candidate, companyDNA) {
    return {
      stageFit: this.calculateStageFit(candidate, companyDNA.stage),
      cultureFit: 75,
      founderFit: 80,
      teamFit: 75,
      velocityFit: 75,
      growthFit: 70,
      builderMindset: this.calculateBuilderMindset(candidate),
      learningSpeed: 80,
    }
  }

  calculateStageFit(candidate, companyStage) {
    // Simplified logic
    return candidate.experience?.some(exp => exp.stage === companyStage) ? 95 : 60
  }

  calculateBuilderMindset(candidate) {
    return candidate.experience?.some(exp => 
      exp.role?.toLowerCase().includes('founder') || 
      exp.role?.toLowerCase().includes('owner')
    ) ? 90 : 70
  }

  calculateOverallFit(dimensions) {
    return Math.round(
      dimensions.stageFit * 0.15 +
      dimensions.cultureFit * 0.20 +
      dimensions.founderFit * 0.15 +
      dimensions.teamFit * 0.10 +
      dimensions.velocityFit * 0.10 +
      dimensions.growthFit * 0.10 +
      dimensions.builderMindset * 0.15 +
      dimensions.learningSpeed * 0.05
    )
  }

  calculateSuccessProbability(dimensions, companyDNA) {
    let probability = this.calculateOverallFit(dimensions)
    if (companyDNA.risks?.includes('low_runway')) probability -= 5
    if (dimensions.stageFit < 50) probability -= 10
    return Math.max(0, Math.min(100, probability))
  }

  identifyRisks(dimensions) {
    const risks = []
    if (dimensions.stageFit < 50) {
      risks.push({ type: 'high', message: 'Candidate has not worked at similar stage' })
    }
    if (dimensions.cultureFit < 60) {
      risks.push({ type: 'medium', message: 'Potential culture misalignment' })
    }
    return risks.length > 0 ? risks : [{ type: 'low', message: 'Strong fit across all dimensions' }]
  }

  getRecommendation(overallFit, risks) {
    if (risks.some(r => r.type === 'high') || overallFit < 60) return 'reject'
    if (overallFit >= 80) return 'hire'
    return 'consider'
  }
}

