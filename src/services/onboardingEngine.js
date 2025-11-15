export class OnboardingEngine {
  generateOnboardingPlan(hire, companyDNA, role) {
    return {
      hire,
      role,
      preBoarding: this.generatePreBoarding(hire, companyDNA),
      day1: this.generateDay1(hire, companyDNA, role),
      week1: this.generateWeek1(hire, companyDNA, role),
      weeks2to4: this.generateWeeks2to4(hire, companyDNA, role),
      checkpoints: this.generateCheckpoints(),
      modules: this.generateModules(companyDNA, role),
    }
  }

  generatePreBoarding(hire, companyDNA) {
    return {
      tasks: [
        { id: 'welcome_package', title: 'Digital Welcome Package', completed: false },
        { id: 'documents', title: 'Document Collection', completed: false },
        { id: 'access_setup', title: 'Access Provisioning', completed: false },
        { id: 'buddy_assignment', title: 'Buddy/Mentor Assignment', completed: false },
        { id: 'first_day_prep', title: 'First Day Preparation', completed: false },
        { id: 'culture_preview', title: 'Culture Preview', completed: false },
      ],
      welcomePackage: {
        companyMission: companyDNA.mission || 'Build something great',
        teamBios: 'Team member profiles',
        orgChart: 'Interactive org chart',
        firstWeekSchedule: 'Detailed first week agenda',
      },
    }
  }

  generateDay1(hire, companyDNA, role) {
    return {
      agenda: [
        { time: '9:00 AM', activity: 'Founder Welcome & Vision', type: 'culture' },
        { time: '10:00 AM', activity: 'Workspace Setup & Tool Access', type: 'logistics' },
        { time: '11:00 AM', activity: 'Team Introductions', type: 'team' },
        { time: '12:00 PM', activity: 'Lunch with Team', type: 'social' },
        { time: '1:30 PM', activity: 'Role Overview & Expectations', type: 'role' },
        { time: '3:00 PM', activity: 'Culture Immersion Kickoff', type: 'culture' },
        { time: '4:00 PM', activity: 'First Project Assignment', type: 'role' },
      ],
    }
  }

  generateWeek1(hire, companyDNA, role) {
    return {
      focus: 'Foundation',
      tasks: [
        { day: 1, task: 'Complete company history module', type: 'learning' },
        { day: 2, task: 'Tool training and access verification', type: 'logistics' },
        { day: 3, task: 'Team structure deep dive', type: 'team' },
        { day: 4, task: 'Initial role orientation', type: 'role' },
        { day: 5, task: 'Week 1 feedback session', type: 'feedback' },
      ],
    }
  }

  generateWeeks2to4(hire, companyDNA, role) {
    return {
      focus: 'Deep Dive',
      tasks: [
        { week: 2, task: 'Role-specific training', type: 'role' },
        { week: 2, task: 'Stakeholder meetings', type: 'team' },
        { week: 3, task: 'Project assignments', type: 'role' },
        { week: 3, task: 'Culture integration activities', type: 'culture' },
        { week: 4, task: 'Cross-functional collaboration', type: 'team' },
        { week: 4, task: '30-day checkpoint preparation', type: 'feedback' },
      ],
    }
  }

  generateCheckpoints() {
    return [
      {
        day: 7,
        type: 'early_engagement',
        questions: [
          'How clear is your role and expectations?',
          'Do you feel welcomed by the team?',
          'Any concerns or blockers?',
        ],
      },
      {
        day: 30,
        type: 'milestone',
        focus: 'Onboarding completion, first contributions',
        questions: [
          'What have you accomplished in your first 30 days?',
          'How aligned do you feel with company culture?',
          'What support do you need?',
        ],
      },
      {
        day: 60,
        type: 'milestone',
        focus: 'Key processes established, measurable impact',
        questions: [
          'What processes have you established?',
          'What measurable impact have you made?',
          'How is your alignment with the team?',
        ],
      },
      {
        day: 90,
        type: 'milestone',
        focus: 'Full ownership, targets on track',
        questions: [
          'Do you feel full ownership of your role?',
          'Are you on track with your targets?',
          'How would you rate your overall experience?',
        ],
      },
    ]
  }

  generateModules(companyDNA, role) {
    return [
      {
        id: 'company_history',
        title: 'Company History',
        type: 'culture',
        content: 'Interactive timeline of company journey',
      },
      {
        id: 'product_overview',
        title: 'Product Overview',
        type: 'product',
        content: 'Deep dive into product, market, and customers',
      },
      {
        id: 'culture_values',
        title: 'Culture & Values',
        type: 'culture',
        content: 'Company values, builder mindset, ownership framework',
      },
      {
        id: 'role_specific',
        title: `Role-Specific: ${role}`,
        type: 'role',
        content: `Customized training for ${role} function`,
      },
    ]
  }

  calculateProgress(onboardingPlan) {
    const allTasks = [
      ...onboardingPlan.preBoarding.tasks,
      ...onboardingPlan.week1.tasks,
    ]
    const completed = allTasks.filter(t => t.completed).length
    return Math.round((completed / allTasks.length) * 100)
  }

  getSuccessScore(checkpointResults) {
    if (!checkpointResults || checkpointResults.length === 0) return null
    
    const scores = checkpointResults.map(c => c.alignmentScore || 0)
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
  }
}

