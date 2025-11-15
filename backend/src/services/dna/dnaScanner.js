const { logger } = require('../../utils/logger');

class DNAScanner {
  async scanCompany(startuposId) {
    logger.info(`Scanning company DNA for StartupOS ID: ${startuposId}`);

    const mockData = {
      companyName: startuposId === 'demo-123' ? 'TechFlow AI' : 'DataVault',
      industry: startuposId === 'demo-123' ? 'SaaS' : 'Data Analytics',
      stage: startuposId === 'demo-123' ? 'seed' : 'series_a',
      velocity: startuposId === 'demo-123' ? 'high' : 'medium',
      cultureDNA: {
        values: startuposId === 'demo-123' 
          ? ['speed', 'ownership', 'experimentation', 'customer-first']
          : ['data-driven', 'collaboration', 'scalability'],
        workStyle: startuposId === 'demo-123' ? 'async-first' : 'hybrid',
        decisionMaking: startuposId === 'demo-123' ? 'founder-driven' : 'consensus-driven',
        riskTolerance: startuposId === 'demo-123' ? 'high' : 'medium',
      },
      teamGaps: startuposId === 'demo-123'
        ? ['sales', 'marketing', 'customer-success']
        : ['engineering', 'product'],
      founderProfile: {
        background: startuposId === 'demo-123' ? 'technical' : 'business',
        leadershipStyle: startuposId === 'demo-123' ? 'hands-on' : 'strategic',
        vision: startuposId === 'demo-123' ? 'product-led-growth' : 'enterprise-sales',
      },
      hiringPriorities: startuposId === 'demo-123'
        ? [
            { role: 'Head of Sales', urgency: 'high', reason: 'GTM bottleneck' },
            { role: 'Marketing Lead', urgency: 'medium', reason: 'Growth acceleration' },
            { role: 'Senior Engineer', urgency: 'high', reason: 'Product velocity' },
          ]
        : [
            { role: 'VP Engineering', urgency: 'high', reason: 'Scale team' },
            { role: 'Product Manager', urgency: 'medium', reason: 'Roadmap execution' },
          ],
      risks: startuposId === 'demo-123'
        ? ['runway_12_months', 'no_sales_leader']
        : ['talent_retention'],
    };

    return mockData;
  }
}

module.exports = { DNAScanner };

