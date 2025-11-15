export class CultureEngine {
  generateCultureProfile(companyDNA) {
    return {
      values: companyDNA.cultureDNA?.values || [],
      mission: companyDNA.mission || '',
      vision: companyDNA.vision || '',
      builderMindset: this.defineBuilderMindset(),
      ownershipFramework: this.defineOwnershipFramework(),
      workStyle: companyDNA.cultureDNA?.workStyle || 'collaborative',
      decisionMaking: companyDNA.cultureDNA?.decisionMaking || 'fast',
      riskTolerance: companyDNA.cultureDNA?.riskTolerance || 'high',
    }
  }

  defineBuilderMindset() {
    return {
      principles: [
        'Think like an owner, not an employee',
        'Move fast and iterate',
        'Embrace ambiguity and uncertainty',
        'Focus on outcomes, not hours',
        'Take initiative and ownership',
        'Learn continuously and adapt quickly',
      ],
      behaviors: [
        'Proactively identify and solve problems',
        'Make decisions with incomplete information',
        'Take calculated risks',
        'Own outcomes, not just tasks',
        'Build for scale from day one',
      ],
    }
  }

  defineOwnershipFramework() {
    return {
      levels: [
        {
          level: 1,
          name: 'Task Owner',
          description: 'Owns specific tasks and deliverables',
        },
        {
          level: 2,
          name: 'Project Owner',
          description: 'Owns entire projects and outcomes',
        },
        {
          level: 3,
          name: 'Function Owner',
          description: 'Owns entire function and strategy',
        },
        {
          level: 4,
          name: 'Company Owner',
          description: 'Thinks and acts like a founder',
        },
      ],
      assessment: 'Evaluate where you are and where you want to grow',
    }
  }

  calculateAlignmentScore(employee, cultureProfile) {
    const valueAlignment = this.calculateValueAlignment(employee.values || [], cultureProfile.values)
    const mindsetAlignment = this.calculateMindsetAlignment(employee, cultureProfile)
    const behaviorAlignment = this.calculateBehaviorAlignment(employee, cultureProfile)

    return {
      overall: Math.round((valueAlignment + mindsetAlignment + behaviorAlignment) / 3),
      valueAlignment,
      mindsetAlignment,
      behaviorAlignment,
      breakdown: {
        values: valueAlignment,
        mindset: mindsetAlignment,
        behaviors: behaviorAlignment,
      },
    }
  }

  calculateValueAlignment(employeeValues, companyValues) {
    if (companyValues.length === 0) return 75
    const aligned = companyValues.filter(cv => 
      employeeValues.some(ev => ev.toLowerCase().includes(cv.toLowerCase()))
    ).length
    return Math.round((aligned / companyValues.length) * 100)
  }

  calculateMindsetAlignment(employee, cultureProfile) {
    const builderBehaviors = employee.builderBehaviors || []
    const expectedBehaviors = cultureProfile.builderMindset.behaviors.length
    const demonstrated = builderBehaviors.length
    return Math.min(100, Math.round((demonstrated / expectedBehaviors) * 100))
  }

  calculateBehaviorAlignment(employee, cultureProfile) {
    const ownershipLevel = employee.ownershipLevel || 1
    const maxLevel = 4
    return Math.round((ownershipLevel / maxLevel) * 100)
  }

  generatePulseSurvey() {
    return {
      questions: [
        {
          id: 'engagement',
          question: 'How engaged do you feel at work?',
          type: 'scale',
          scale: 1,
          to: 10,
        },
        {
          id: 'alignment',
          question: 'How aligned do you feel with company vision?',
          type: 'scale',
          scale: 1,
          to: 10,
        },
        {
          id: 'culture',
          question: 'How well does the company live its values?',
          type: 'scale',
          scale: 1,
          to: 10,
        },
        {
          id: 'ownership',
          question: 'Do you feel like an owner?',
          type: 'scale',
          scale: 1,
          to: 10,
        },
        {
          id: 'feedback',
          question: 'Any additional feedback?',
          type: 'text',
        },
      ],
    }
  }

  calculateCultureHealth(surveyResults) {
    if (!surveyResults || surveyResults.length === 0) return null

    const averages = {
      engagement: 0,
      alignment: 0,
      culture: 0,
      ownership: 0,
    }

    surveyResults.forEach(result => {
      averages.engagement += result.engagement || 0
      averages.alignment += result.alignment || 0
      averages.culture += result.culture || 0
      averages.ownership += result.ownership || 0
    })

    const count = surveyResults.length
    Object.keys(averages).forEach(key => {
      averages[key] = Math.round(averages[key] / count)
    })

    const overall = Math.round(
      (averages.engagement + averages.alignment + averages.culture + averages.ownership) / 4
    )

    return {
      overall,
      breakdown: averages,
      trend: this.calculateTrend(surveyResults),
    }
  }

  calculateTrend(surveyResults) {
    if (surveyResults.length < 2) return 'stable'
    
    const recent = surveyResults.slice(-3)
    const older = surveyResults.slice(-6, -3)
    
    if (older.length === 0) return 'stable'
    
    const recentAvg = recent.reduce((sum, r) => sum + (r.engagement || 0), 0) / recent.length
    const olderAvg = older.reduce((sum, r) => sum + (r.engagement || 0), 0) / older.length
    
    if (recentAvg > olderAvg + 1) return 'improving'
    if (recentAvg < olderAvg - 1) return 'declining'
    return 'stable'
  }
}

