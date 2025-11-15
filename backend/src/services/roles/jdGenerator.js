const { logger } = require('../../utils/logger');

class JDGenerator {
  async generateJD(role, companyDNA) {
    const stage = companyDNA.stage || 'seed';
    const values = companyDNA.cultureDNA?.values || [];
    const workStyle = companyDNA.cultureDNA?.workStyle || 'hybrid';

    const jd = {
      title: role.title,
      company: companyDNA.companyName || 'Our Company',
      stage,
      overview: this.generateOverview(role, stage),
      responsibilities: this.generateResponsibilities(role, stage),
      requirements: this.generateRequirements(role, stage, values),
      cultureFit: this.generateCultureFit(values, workStyle),
      whatWeOffer: this.generateWhatWeOffer(stage),
      text: '',
    };

    jd.text = this.formatJD(jd);
    return jd;
  }

  generateOverview(role, stage) {
    const overviews = {
      'Head of Sales': `As our first Head of Sales, you'll build our sales function from the ground up. This is a ${stage}-stage opportunity to define our go-to-market strategy and lead our revenue growth.`,
      'Marketing Lead': `Join us as Marketing Lead to drive our growth engine. You'll own our marketing strategy, brand, and customer acquisition at this critical ${stage} stage.`,
      'Senior Full Stack Engineer': `We're looking for a Senior Full Stack Engineer to build core product features. At this ${stage} stage, you'll have massive impact on our product direction.`,
      'Customer Success Manager': `As our first Customer Success Manager, you'll ensure our customers succeed and grow with us. This role is critical at our ${stage} stage.`,
    };
    return overviews[role.title] || `Join our team as ${role.title} at this exciting ${stage} stage.`;
  }

  generateResponsibilities(role, stage) {
    const responsibilities = {
      'Head of Sales': [
        'Build sales process from 0 to 1',
        'Close first enterprise deals',
        'Hire and scale sales team',
        'Define pricing and packaging strategy',
      ],
      'Marketing Lead': [
        'Develop and execute marketing strategy',
        'Own brand and messaging',
        'Drive customer acquisition',
        'Build marketing team',
      ],
      'Senior Full Stack Engineer': [
        'Build core product features',
        'Design scalable architecture',
        'Mentor junior engineers',
        'Ship fast and iterate',
      ],
    };
    return responsibilities[role.title] || ['Execute on key initiatives', 'Collaborate with team', 'Drive results'];
  }

  generateRequirements(role, stage, values) {
    return [
      `${stage} stage experience preferred`,
      `Alignment with our values: ${values.join(', ')}`,
      'Builder mindset and ownership mentality',
      'High velocity execution',
      'Adaptability and learning agility',
    ];
  }

  generateCultureFit(values, workStyle) {
    return `We're looking for someone who embodies our values: ${values.join(', ')}. We work in a ${workStyle} environment and value ownership, speed, and experimentation.`;
  }

  generateWhatWeOffer(stage) {
    return [
      'Competitive equity package',
      'Remote-first culture',
      'Learning and growth opportunities',
      'Impact on company direction',
      stage === 'seed' ? 'Early-stage equity upside' : 'Growth-stage stability',
    ];
  }

  formatJD(jd) {
    return `
# ${jd.title}

## About ${jd.company}

We're a ${jd.stage}-stage company building the future. Join us to make a massive impact.

## Overview

${jd.overview}

## Responsibilities

${jd.responsibilities.map(r => `- ${r}`).join('\n')}

## Requirements

${jd.requirements.map(r => `- ${r}`).join('\n')}

## Culture Fit

${jd.cultureFit}

## What We Offer

${jd.whatWeOffer.map(o => `- ${o}`).join('\n')}

## Apply

If this sounds like you, we'd love to hear from you!
    `.trim();
  }
}

module.exports = { JDGenerator };

