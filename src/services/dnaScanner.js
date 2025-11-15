// Company DNA Scanner - All logic in frontend
export class DNAScanner {
  async scanCompany(companyData) {
    // Use provided company data directly
    const data = {
      company: {
        name: companyData.name,
        stage: companyData.stage,
        fundingStage: companyData.stage,
        runwayMonths: companyData.runwayMonths,
        teamSize: companyData.teamSize,
        values: companyData.values || ['speed', 'ownership', 'experimentation'],
      },
      team: {
        members: this.generateTeamMembers(companyData.teamSize),
      },
      founder: {
        background: 'technical',
        leadershipStyle: 'hands-on',
        vision: 'Build exceptional products with exceptional teams',
      },
      metrics: {
        velocity: companyData.teamSize < 10 ? 'high' : 'medium',
        growthRate: 25,
      },
      impacts: {
        goals: this.generateGoals(companyData.stage),
      },
    }

    return this.generateDNA(data)
  }

  generateTeamMembers(teamSize) {
    const roles = [
      { role: 'CEO', department: 'executive' },
      { role: 'CTO', department: 'engineering' },
      { role: 'Engineer', department: 'engineering' },
      { role: 'Product Manager', department: 'product' },
      { role: 'Designer', department: 'design' },
      { role: 'Marketing Lead', department: 'marketing' },
      { role: 'Sales Lead', department: 'sales' },
      { role: 'Operations', department: 'operations' },
    ]
    return roles.slice(0, Math.min(teamSize, roles.length))
  }

  generateGoals(stage) {
    const goals = {
      pre_seed: [
        { milestone: 'Build MVP', timeline: '3 months', priority: 'high' },
        { milestone: 'Get first customers', timeline: '6 months', priority: 'high' },
      ],
      seed: [
        { milestone: 'Reach $1M ARR', timeline: '6 months', priority: 'high' },
        { milestone: 'Build sales team', timeline: '3 months', priority: 'high' },
      ],
      series_a: [
        { milestone: 'Scale to $10M ARR', timeline: '12 months', priority: 'high' },
        { milestone: 'Build leadership team', timeline: '6 months', priority: 'high' },
      ],
    }
    return goals[stage] || goals.seed
  }

  generateDNA(data) {
    return {
      stage: data.company.stage,
      velocity: data.metrics.velocity || 'medium',
      cultureDNA: this.analyzeCulture(data),
      teamGaps: this.identifyTeamGaps(data),
      hiringPriorities: this.identifyHiringPriorities(data),
      founderProfile: this.analyzeFounder(data),
      risks: this.identifyRisks(data),
      runwayMonths: data.company.runwayMonths,
      teamSize: data.company.teamSize,
    }
  }

  analyzeCulture(data) {
    return {
      values: data.company.values || ['speed', 'ownership', 'experimentation'],
      workStyle: data.company.teamSize < 10 ? 'async-first' : 'hybrid',
      decisionMaking: 'founder-driven',
      riskTolerance: 'high',
      communicationStyle: 'direct',
    }
  }

  identifyTeamGaps(data) {
    const departments = new Set(data.team.members.map(m => m.department))
    const gaps = []
    
    if (!departments.has('sales')) gaps.push('sales')
    if (!departments.has('operations')) gaps.push('operations')
    
    return gaps
  }

  identifyHiringPriorities(data) {
    const priorities = []
    
    if (data.impacts?.goals) {
      data.impacts.goals.forEach(goal => {
        if (goal.priority === 'high') {
          priorities.push({
            role: this.mapGoalToRole(goal.milestone),
            urgency: 'high',
            reason: `Critical for milestone: ${goal.milestone}`,
          })
        }
      })
    }
    
    return priorities
  }

  analyzeFounder(data) {
    return {
      background: data.founder.background || 'unknown',
      leadershipStyle: data.founder.leadershipStyle || 'hands-on',
      vision: data.founder.vision || '',
      managementExperience: 'first-time',
    }
  }

  identifyRisks(data) {
    const risks = []
    if (data.company.runwayMonths && data.company.runwayMonths < 6) {
      risks.push('low_runway')
    }
    if (data.company.teamSize < 5) {
      risks.push('understaffed')
    }
    return risks
  }

  mapGoalToRole(milestone) {
    const lower = milestone.toLowerCase()
    if (lower.includes('sales') || lower.includes('revenue')) return 'Head of Sales'
    if (lower.includes('product')) return 'Product Lead'
    return 'Generalist'
  }
}

