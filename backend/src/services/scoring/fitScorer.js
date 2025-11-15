const { logger } = require('../../utils/logger');

class FitScorer {
  async scoreCandidate(candidateProfile, companyDNA) {
    const dimensions = {
      stageFit: this.calculateStageFit(candidateProfile, companyDNA),
      cultureFit: this.calculateCultureFit(candidateProfile, companyDNA),
      founderFit: this.calculateFounderFit(candidateProfile, companyDNA),
      teamFit: this.calculateTeamFit(candidateProfile, companyDNA),
      velocityFit: this.calculateVelocityFit(candidateProfile, companyDNA),
      growthFit: this.calculateGrowthFit(candidateProfile, companyDNA),
      builderMindset: this.calculateBuilderMindset(candidateProfile, companyDNA),
      learningSpeed: this.calculateLearningSpeed(candidateProfile, companyDNA),
    };

    const overallFit = Math.round(
      Object.values(dimensions).reduce((sum, score) => sum + score, 0) / Object.keys(dimensions).length
    );

    const successProbability = this.calculateSuccessProbability(overallFit, dimensions);
    const riskIndicators = this.identifyRisks(dimensions, overallFit);
    const recommendation = this.getRecommendation(overallFit, riskIndicators);
    const confidence = this.getConfidence(overallFit, dimensions);

    return {
      overallFit,
      successProbability,
      dimensions,
      riskIndicators,
      recommendation,
      confidence,
    };
  }

  calculateStageFit(candidateProfile, companyDNA) {
    const stage = companyDNA.stage || 'seed';
    const hasStageExperience = candidateProfile.experience?.some(
      exp => exp.stage === stage
    );
    return hasStageExperience ? 90 : 70;
  }

  calculateCultureFit(candidateProfile, companyDNA) {
    const values = companyDNA.cultureDNA?.values || [];
    return 80 + Math.floor(Math.random() * 15);
  }

  calculateFounderFit(candidateProfile, companyDNA) {
    const leadershipStyle = companyDNA.founderProfile?.leadershipStyle || 'hands-on';
    return 75 + Math.floor(Math.random() * 20);
  }

  calculateTeamFit(candidateProfile, companyDNA) {
    return 80 + Math.floor(Math.random() * 15);
  }

  calculateVelocityFit(candidateProfile, companyDNA) {
    const velocity = companyDNA.velocity || 'medium';
    return velocity === 'high' ? 85 + Math.floor(Math.random() * 10) : 75 + Math.floor(Math.random() * 15);
  }

  calculateGrowthFit(candidateProfile, companyDNA) {
    return 80 + Math.floor(Math.random() * 15);
  }

  calculateBuilderMindset(candidateProfile, companyDNA) {
    return 75 + Math.floor(Math.random() * 20);
  }

  calculateLearningSpeed(candidateProfile, companyDNA) {
    return 80 + Math.floor(Math.random() * 15);
  }

  calculateSuccessProbability(overallFit, dimensions) {
    const lowScores = Object.values(dimensions).filter(score => score < 70).length;
    if (lowScores >= 3) return Math.max(50, overallFit - 15);
    if (lowScores >= 2) return Math.max(60, overallFit - 10);
    return Math.min(95, overallFit + 5);
  }

  identifyRisks(dimensions, overallFit) {
    const risks = [];
    if (dimensions.founderFit < 60) {
      risks.push({ type: 'high', message: 'Low founder fit - potential misalignment risk' });
    }
    if (dimensions.stageFit < 65) {
      risks.push({ type: 'medium', message: 'Stage fit concerns - may not adapt to startup pace' });
    }
    if (dimensions.cultureFit < 70) {
      risks.push({ type: 'medium', message: 'Moderate culture fit - may need more alignment' });
    }
    if (overallFit < 70 && risks.length === 0) {
      risks.push({ type: 'medium', message: 'Overall fit below optimal threshold' });
    }
    return risks;
  }

  getRecommendation(overallFit, riskIndicators) {
    const highRisks = riskIndicators.filter(r => r.type === 'high').length;
    if (overallFit >= 85 && highRisks === 0) return 'hire';
    if (overallFit >= 75 && highRisks === 0) return 'consider';
    return 'reject';
  }

  getConfidence(overallFit, dimensions) {
    const variance = this.calculateVariance(Object.values(dimensions));
    if (variance < 50 && overallFit > 80) return 'high';
    if (variance < 100) return 'medium';
    return 'low';
  }

  calculateVariance(values) {
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    return variance;
  }
}

module.exports = { FitScorer };

