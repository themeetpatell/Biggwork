export class TalentMarketIntelligence {
  constructor() {
    // Mock data service for demo purposes
  }

  async generateMarketInsights(role, stage) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const insights = this.getMockInsights(role, stage);
    insights.recommendations = this.generateRecommendations(
      insights.compensation, 
      insights.marketTrends, 
      insights.competitorActivity, 
      stage
    );
    return insights;
  }

  getMockInsights(role, stage) {
    // Generate realistic mock data based on role and stage
    const baseCompensation = this.getBaseCompensation(role, stage);
    
    return {
      role,
      stage,
      compensation: {
        min: baseCompensation.min,
        median: baseCompensation.median,
        max: baseCompensation.max,
        equity: baseCompensation.equity,
        currency: 'USD'
      },
      marketTrends: {
        demand: this.getMarketDemand(role),
        supply: 'medium',
        trend: 'increasing',
        competitiveness: 'high'
      },
      competitorActivity: {
        active: 4,
        recentHires: 28,
        avgTimeToHire: 26
      },
      talentPools: [
        'San Francisco', 'New York', 'Austin', 'Seattle', 
        'Boston', 'Remote', 'Los Angeles', 'Chicago'
      ]
    };
  }

  getBaseCompensation(role, stage) {
    // Base compensation by stage
    const stageMultipliers = {
      'pre_seed': 0.85,
      'seed': 1.0,
      'series_a': 1.15,
      'series_b': 1.3,
      'series_c': 1.45,
      'growth': 1.6
    };

    // Base salaries by role (at seed stage)
    const roleBases = {
      'Senior Engineer': { min: 130, median: 160, max: 200, equity: '0.1-0.5%' },
      'Product Manager': { min: 140, median: 170, max: 210, equity: '0.15-0.6%' },
      'Head of Sales': { min: 150, median: 180, max: 230, equity: '0.2-0.8%' },
      'Designer': { min: 100, median: 130, max: 170, equity: '0.05-0.3%' },
      'Marketing Lead': { min: 120, median: 150, max: 190, equity: '0.1-0.4%' },
      'Data Scientist': { min: 140, median: 170, max: 210, equity: '0.1-0.5%' },
      'DevOps Engineer': { min: 135, median: 165, max: 205, equity: '0.1-0.4%' }
    };

    const base = roleBases[role] || roleBases['Senior Engineer'];
    const multiplier = stageMultipliers[stage] || 1.0;

    return {
      min: Math.round(base.min * multiplier),
      median: Math.round(base.median * multiplier),
      max: Math.round(base.max * multiplier),
      equity: base.equity
    };
  }

  getMarketDemand(role) {
    const demandMap = {
      'Senior Engineer': 'very_high',
      'Product Manager': 'high',
      'Head of Sales': 'high',
      'Designer': 'medium',
      'Marketing Lead': 'medium',
      'Data Scientist': 'very_high',
      'DevOps Engineer': 'very_high'
    };
    return demandMap[role] || 'medium';
  }

  generateRecommendations(compensation, trends, competitorActivity, stage) {
    const recommendations = [];

    if (trends.demand === 'very_high' && trends.supply === 'low') {
      recommendations.push('High demand, low supply - consider offering premium compensation');
      recommendations.push('Act quickly - top candidates receive multiple offers');
    }

    if (competitorActivity.active > 3) {
      recommendations.push('High competitor activity - differentiate your offer');
      recommendations.push('Emphasize company culture and growth opportunities');
    }

    if (stage === 'pre_seed' || stage === 'seed') {
      recommendations.push('Early stage - focus on equity and growth potential');
      recommendations.push('Target candidates with early-stage experience');
    }

    if (trends.trend === 'increasing') {
      recommendations.push('Market rates increasing - review compensation regularly');
    }

    return recommendations;
  }

  // Removed old methods related to local storage and static data
}

