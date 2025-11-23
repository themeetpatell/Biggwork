export class ExitIntelligence {
  constructor() {
    this.exitHistory = this.loadExitHistory()
  }

  loadExitHistory() {
    const saved = localStorage.getItem('biggwork_exits')
    return saved ? JSON.parse(saved) : []
  }

  saveExitHistory() {
    localStorage.setItem('biggwork_exits', JSON.stringify(this.exitHistory))
  }

  predictExitRisk(employeeData, companyDNA) {
    const riskFactors = []
    let riskScore = 0

    if (employeeData.tenure < 6) {
      riskFactors.push({ type: 'short_tenure', severity: 'high', message: 'Employee has been with company less than 6 months' })
      riskScore += 30
    }

    if (employeeData.alignmentScore < 60) {
      riskFactors.push({ type: 'low_alignment', severity: 'high', message: 'Culture alignment score below threshold' })
      riskScore += 25
    }

    if (employeeData.engagementScore < 50) {
      riskFactors.push({ type: 'low_engagement', severity: 'medium', message: 'Engagement metrics declining' })
      riskScore += 20
    }

    if (employeeData.recentFeedback && employeeData.recentFeedback.sentiment === 'negative') {
      riskFactors.push({ type: 'negative_feedback', severity: 'medium', message: 'Recent feedback indicates dissatisfaction' })
      riskScore += 15
    }

    if (employeeData.roleMismatch) {
      riskFactors.push({ type: 'role_mismatch', severity: 'high', message: 'Role expectations not aligned with reality' })
      riskScore += 20
    }

    if (employeeData.careerGrowthBlocked) {
      riskFactors.push({ type: 'growth_blocked', severity: 'medium', message: 'Limited growth opportunities identified' })
      riskScore += 15
    }

    const riskLevel = riskScore >= 60 ? 'high' : riskScore >= 40 ? 'medium' : 'low'

    return {
      riskScore: Math.min(riskScore, 100),
      riskLevel,
      riskFactors,
      predictedExitWindow: this.calculateExitWindow(riskScore),
      recommendations: this.generateRecommendations(riskFactors)
    }
  }

  calculateExitWindow(riskScore) {
    if (riskScore >= 70) return '1-3 months'
    if (riskScore >= 50) return '3-6 months'
    if (riskScore >= 30) return '6-12 months'
    return '12+ months'
  }

  generateRecommendations(riskFactors) {
    const recommendations = []
    
    riskFactors.forEach(factor => {
      switch(factor.type) {
        case 'low_alignment':
          recommendations.push('Schedule culture alignment session with founder')
          recommendations.push('Review company values and mission together')
          break
        case 'low_engagement':
          recommendations.push('Conduct one-on-one to understand concerns')
          recommendations.push('Identify quick wins to boost engagement')
          break
        case 'role_mismatch':
          recommendations.push('Clarify role expectations and responsibilities')
          recommendations.push('Consider role adjustment or additional support')
          break
        case 'growth_blocked':
          recommendations.push('Create clear career development path')
          recommendations.push('Provide learning and growth opportunities')
          break
        default:
          recommendations.push('Schedule retention conversation')
      }
    })

    return [...new Set(recommendations)]
  }

  createExitPlan(employeeData, exitReason) {
    const exitPlan = {
      id: `exit_${Date.now()}`,
      employeeId: employeeData.id,
      employeeName: employeeData.name,
      exitDate: new Date().toISOString(),
      exitReason,
      status: 'in_progress',
      checklist: [
        { task: 'Exit interview scheduled', completed: false },
        { task: 'Knowledge transfer documented', completed: false },
        { task: 'Access revoked from systems', completed: false },
        { task: 'Final feedback collected', completed: false },
        { task: 'Alumni network invitation sent', completed: false },
        { task: 'Referral program information shared', completed: false }
      ],
      feedback: null,
      knowledgeTransfer: []
    }

    this.exitHistory.push(exitPlan)
    this.saveExitHistory()
    return exitPlan
  }

  conductExitInterview(exitId, interviewData) {
    const exit = this.exitHistory.find(e => e.id === exitId)
    if (!exit) throw new Error('Exit plan not found')

    exit.feedback = {
      overallExperience: interviewData.overallExperience,
      cultureFit: interviewData.cultureFit,
      managementFeedback: interviewData.managementFeedback,
      whatWorked: interviewData.whatWorked,
      whatDidntWork: interviewData.whatDidntWork,
      suggestions: interviewData.suggestions,
      wouldRecommend: interviewData.wouldRecommend,
      exitReason: interviewData.exitReason,
      timestamp: new Date().toISOString()
    }

    exit.checklist[0].completed = true
    this.saveExitHistory()
    return exit
  }

  getExitAnalytics() {
    const totalExits = this.exitHistory.length
    const completedInterviews = this.exitHistory.filter(e => e.feedback).length
    const exitReasons = {}
    const satisfactionScores = []

    this.exitHistory.forEach(exit => {
      if (exit.feedback) {
        const reason = exit.feedback.exitReason || 'unknown'
        exitReasons[reason] = (exitReasons[reason] || 0) + 1
        if (exit.feedback.overallExperience) {
          satisfactionScores.push(exit.feedback.overallExperience)
        }
      }
    })

    const avgSatisfaction = satisfactionScores.length > 0
      ? satisfactionScores.reduce((a, b) => a + b, 0) / satisfactionScores.length
      : 0

    return {
      totalExits,
      completedInterviews,
      interviewCompletionRate: totalExits > 0 ? (completedInterviews / totalExits) * 100 : 0,
      exitReasons,
      avgSatisfaction: Math.round(avgSatisfaction),
      positiveExits: satisfactionScores.filter(s => s >= 7).length,
      negativeExits: satisfactionScores.filter(s => s < 4).length
    }
  }

  getExitHistory() {
    return this.exitHistory
  }
}

