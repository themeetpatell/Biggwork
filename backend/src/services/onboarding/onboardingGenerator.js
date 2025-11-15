const { logger } = require('../../utils/logger');

class OnboardingGenerator {
  generateOnboardingPlan(hire, companyDNA) {
    const plan = {
      hireId: hire.id,
      companyId: hire.companyId,
      status: 'pending',
      planData: {
        preBoarding: this.generatePreBoarding(companyDNA),
        day1: this.generateDay1(companyDNA),
        week1: this.generateWeek1(companyDNA, hire),
        week2_4: this.generateWeeks2_4(companyDNA, hire),
        checkpoints: {
          day7: this.generateCheckpoint(7, companyDNA),
          day30: this.generateCheckpoint(30, companyDNA),
          day60: this.generateCheckpoint(60, companyDNA),
          day90: this.generateCheckpoint(90, companyDNA),
        },
        builderMode: this.generateBuilderMode(companyDNA),
      },
      createdAt: new Date(),
    };

    return plan;
  }

  generatePreBoarding(companyDNA) {
    return {
      title: 'Pre-Boarding (Before Day 1)',
      tasks: [
        {
          id: 'welcome_email',
          title: 'Welcome Email & Company DNA Overview',
          description: 'Send welcome email with company DNA profile and culture overview',
          completed: false,
        },
        {
          id: 'document_collection',
          title: 'Document Collection',
          description: 'Collect signed offer letter, tax forms, and identification',
          completed: false,
        },
        {
          id: 'tool_access',
          title: 'Tool Access Setup',
          description: 'Provision accounts for Slack, email, and core tools',
          completed: false,
        },
        {
          id: 'buddy_assignment',
          title: 'Buddy Assignment',
          description: 'Assign onboarding buddy from existing team',
          completed: false,
        },
        {
          id: 'first_day_schedule',
          title: 'First Day Schedule',
          description: 'Send detailed schedule for first day including team introductions',
          completed: false,
        },
      ],
    };
  }

  generateDay1(companyDNA) {
    return {
      title: 'Day 1: Welcome & Culture Immersion',
      tasks: [
        {
          id: 'welcome_meeting',
          title: 'Welcome Meeting with Founder',
          description: 'One-on-one with founder to discuss vision and builder mindset',
          completed: false,
        },
        {
          id: 'dna_presentation',
          title: 'Company DNA Presentation',
          description: 'Deep dive into company DNA, culture values, and expectations',
          completed: false,
        },
        {
          id: 'team_introductions',
          title: 'Team Introductions',
          description: 'Meet the entire team and understand org structure',
          completed: false,
        },
        {
          id: 'workspace_setup',
          title: 'Workspace Setup',
          description: 'Set up physical/digital workspace and access all tools',
          completed: false,
        },
        {
          id: 'culture_values',
          title: 'Culture Values Workshop',
          description: `Interactive session on core values: ${companyDNA.cultureDNA?.values?.join(', ') || 'speed, ownership, experimentation'}`,
          completed: false,
        },
      ],
    };
  }

  generateWeek1(companyDNA, hire) {
    return {
      title: 'Week 1: Foundation & Builder Mode Activation',
      tasks: [
        {
          id: 'role_expectations',
          title: 'Role Expectations & 30/60/90 Day Goals',
          description: 'Define clear expectations and success metrics for first 90 days',
          completed: false,
        },
        {
          id: 'builder_mindset',
          title: 'Builder Mindset Training',
          description: 'Complete builder mindset curriculum and ownership framework',
          completed: false,
        },
        {
          id: 'product_demo',
          title: 'Product Deep Dive',
          description: 'Understand product, roadmap, and customer needs',
          completed: false,
        },
        {
          id: 'process_overview',
          title: 'Process & Workflow Overview',
          description: `Learn ${companyDNA.cultureDNA?.workStyle || 'async-first'} work style and decision-making processes`,
          completed: false,
        },
        {
          id: 'first_contribution',
          title: 'First Small Contribution',
          description: 'Make first meaningful contribution to build ownership mindset',
          completed: false,
        },
      ],
    };
  }

  generateWeeks2_4(companyDNA, hire) {
    return {
      title: 'Weeks 2-4: Integration & Impact',
      tasks: [
        {
          id: 'increasing_ownership',
          title: 'Increasing Ownership',
          description: 'Take on progressively larger responsibilities and projects',
          completed: false,
        },
        {
          id: 'cross_functional',
          title: 'Cross-Functional Collaboration',
          description: 'Work with different team members to understand full company context',
          completed: false,
        },
        {
          id: 'customer_interaction',
          title: 'Customer Interaction',
          description: 'Interact with customers to understand needs and pain points',
          completed: false,
        },
        {
          id: 'feedback_loop',
          title: 'Establish Feedback Loop',
          description: 'Set up regular check-ins with manager and team',
          completed: false,
        },
        {
          id: 'culture_immersion',
          title: 'Culture Immersion',
          description: 'Participate in team rituals, meetings, and culture activities',
          completed: false,
        },
      ],
    };
  }

  generateCheckpoint(day, companyDNA) {
    return {
      day,
      title: `Day ${day} Checkpoint`,
      assessments: [
        {
          type: 'alignment',
          questions: [
            'How aligned do you feel with company vision?',
            'Do you understand your role and expectations?',
            'How comfortable are you with the work style?',
          ],
        },
        {
          type: 'builder_mindset',
          questions: [
            'Do you feel ownership over your work?',
            'Are you thinking like a builder or employee?',
            'How comfortable are you with ambiguity?',
          ],
        },
        {
          type: 'culture_fit',
          questions: [
            `How well do you align with values: ${companyDNA.cultureDNA?.values?.join(', ') || 'N/A'}`,
            'Do you feel part of the team?',
            'Is the culture what you expected?',
          ],
        },
      ],
      completed: false,
      alignmentScore: null,
      feedback: null,
    };
  }

  generateBuilderMode(companyDNA) {
    return {
      title: 'Builder Mode Activation',
      description: 'First 30 days focused on culture immersion and builder mindset',
      modules: [
        {
          id: 'ownership_framework',
          title: 'Ownership Framework',
          description: 'Learn to think like an owner, not an employee',
          completed: false,
        },
        {
          id: 'experimentation',
          title: 'Experimentation & Risk-Taking',
          description: 'Understand our high risk tolerance and experimentation culture',
          completed: false,
        },
        {
          id: 'speed_velocity',
          title: 'Speed & Velocity',
          description: `Learn our ${companyDNA.velocity || 'high'} velocity execution style`,
          completed: false,
        },
        {
          id: 'founder_alignment',
          title: 'Founder Alignment',
          description: `Understand ${companyDNA.founderProfile?.leadershipStyle || 'hands-on'} leadership style and vision`,
          completed: false,
        },
      ],
    };
  }
}

module.exports = { OnboardingGenerator };
