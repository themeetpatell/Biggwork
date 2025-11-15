const { logger } = require('../../utils/logger');

class InterviewGenerator {
  generateInterviewQuestions(role, companyDNA) {
    const questions = {
      stageSpecific: this.generateStageQuestions(companyDNA.stage),
      cultureFit: this.generateCultureQuestions(companyDNA.cultureDNA),
      founderAlignment: this.generateFounderQuestions(companyDNA.founderProfile),
      roleSpecific: this.generateRoleQuestions(role),
      behavioral: this.generateBehavioralQuestions(),
      practical: this.generatePracticalAssignments(role),
    };

    return questions;
  }

  generateStageQuestions(stage) {
    const stageQuestions = {
      pre_seed: [
        'Tell me about a time you had to build something from scratch with limited resources.',
        'How do you handle ambiguity and uncertainty?',
        'Describe a situation where you had to wear multiple hats.',
      ],
      seed: [
        'Have you worked at a seed-stage startup before? What was your experience?',
        'How do you prioritize when everything seems urgent?',
        'Tell me about building a process from 0 to 1.',
      ],
      series_a: [
        'How do you balance speed with quality as a company scales?',
        'Describe your experience transitioning from startup to scale-up.',
        'How do you build systems while maintaining startup agility?',
      ],
    };

    return stageQuestions[stage] || stageQuestions.seed;
  }

  generateCultureQuestions(cultureDNA) {
    return [
      `Our values are ${cultureDNA?.values?.join(', ') || 'speed, ownership, experimentation'}. Which resonates most with you and why?`,
      `We work in a ${cultureDNA?.workStyle || 'async-first'} style. How does that fit with your preferences?`,
      `Our decision-making is ${cultureDNA?.decisionMaking || 'founder-driven'}. How do you handle decision-making in this context?`,
      'Tell me about a time you had to make a decision with incomplete information.',
      'How do you handle failure and experimentation?',
      'What does "ownership" mean to you? Give an example.',
    ];
  }

  generateFounderQuestions(founderProfile) {
    return [
      `Our founder has a ${founderProfile?.leadershipStyle || 'hands-on'} leadership style. How do you work with hands-on leaders?`,
      'How do you align your work with company vision when priorities change?',
      'Tell me about working with a founder who is deeply involved in day-to-day.',
      'How do you provide feedback to leadership?',
    ];
  }

  generateRoleQuestions(role) {
    const roleTemplates = {
      sales: [
        'Tell me about building a sales process from scratch.',
        'How do you handle rejection and maintain motivation?',
        'Describe your approach to qualifying leads.',
      ],
      engineering: [
        'How do you balance technical debt with shipping fast?',
        'Tell me about building a feature end-to-end.',
        'How do you handle production incidents?',
      ],
      marketing: [
        'How do you measure marketing ROI with limited budget?',
        'Tell me about a campaign you built from scratch.',
        'How do you prioritize marketing channels?',
      ],
    };

    const roleType = role.title?.toLowerCase() || '';
    if (roleType.includes('sales')) return roleTemplates.sales;
    if (roleType.includes('engineer') || roleType.includes('developer')) return roleTemplates.engineering;
    if (roleType.includes('marketing')) return roleTemplates.marketing;

    return [
      'Tell me about your biggest accomplishment in a similar role.',
      'What challenges do you expect in this role?',
      'How do you measure success in this position?',
    ];
  }

  generateBehavioralQuestions() {
    return [
      'Tell me about a time you disagreed with a decision. How did you handle it?',
      'Describe a situation where you had to learn something new quickly.',
      'Give an example of when you took ownership beyond your job description.',
      'Tell me about a time you failed. What did you learn?',
      'Describe how you handle competing priorities.',
    ];
  }

  generatePracticalAssignments(role) {
    const assignments = {
      sales: {
        title: 'Sales Process Design',
        description: 'Design a sales process for our product. Present your approach.',
        duration: '2-3 hours',
      },
      engineering: {
        title: 'Technical Challenge',
        description: 'Build a small feature or solve a technical problem relevant to our stack.',
        duration: '4-6 hours',
      },
      marketing: {
        title: 'Marketing Strategy',
        description: 'Create a 30-day marketing plan for our product launch.',
        duration: '3-4 hours',
      },
    };

    const roleType = role.title?.toLowerCase() || '';
    if (roleType.includes('sales')) return assignments.sales;
    if (roleType.includes('engineer') || roleType.includes('developer')) return assignments.engineering;
    if (roleType.includes('marketing')) return assignments.marketing;

    return {
      title: 'Role-Specific Challenge',
      description: 'Complete a practical assignment relevant to this role.',
      duration: '3-4 hours',
    };
  }

  generateScorecard(role, companyDNA) {
    return {
      dimensions: [
        { name: 'Stage Fit', weight: 0.15, score: null, notes: '' },
        { name: 'Culture Fit', weight: 0.20, score: null, notes: '' },
        { name: 'Founder Fit', weight: 0.15, score: null, notes: '' },
        { name: 'Role Competency', weight: 0.25, score: null, notes: '' },
        { name: 'Builder Mindset', weight: 0.15, score: null, notes: '' },
        { name: 'Learning Speed', weight: 0.10, score: null, notes: '' },
      ],
      overallScore: null,
      recommendation: null,
      redFlags: [],
      strengths: [],
    };
  }
}

module.exports = { InterviewGenerator };
