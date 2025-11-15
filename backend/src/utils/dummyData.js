const { prisma, db } = require('../db/client');

const dummyCompanies = [
  {
    startuposId: 'demo-123',
    name: 'TechFlow AI',
    industry: 'SaaS',
    stage: 'seed',
    fundingStage: 'Seed',
    employeeCount: 15,
    dnaProfile: {
      stage: 'seed',
      velocity: 'high',
      cultureDNA: {
        values: ['speed', 'ownership', 'experimentation', 'customer-first'],
        workStyle: 'async-first',
        decisionMaking: 'founder-driven',
        riskTolerance: 'high',
      },
      teamGaps: ['sales', 'marketing', 'customer-success'],
      founderProfile: {
        background: 'technical',
        leadershipStyle: 'hands-on',
        vision: 'product-led-growth',
      },
      hiringPriorities: [
        { role: 'Head of Sales', urgency: 'high', reason: 'GTM bottleneck' },
        { role: 'Marketing Lead', urgency: 'medium', reason: 'Growth acceleration' },
        { role: 'Senior Engineer', urgency: 'high', reason: 'Product velocity' },
      ],
      risks: ['runway_12_months', 'no_sales_leader'],
    },
  },
  {
    startuposId: 'startup-456',
    name: 'DataVault',
    industry: 'Data Analytics',
    stage: 'series_a',
    fundingStage: 'Series A',
    employeeCount: 45,
    dnaProfile: {
      stage: 'series_a',
      velocity: 'medium',
      cultureDNA: {
        values: ['data-driven', 'collaboration', 'scalability'],
        workStyle: 'hybrid',
        decisionMaking: 'consensus-driven',
        riskTolerance: 'medium',
      },
      teamGaps: ['engineering', 'product'],
      founderProfile: {
        background: 'business',
        leadershipStyle: 'strategic',
        vision: 'enterprise-sales',
      },
      hiringPriorities: [
        { role: 'VP Engineering', urgency: 'high', reason: 'Scale team' },
        { role: 'Product Manager', urgency: 'medium', reason: 'Roadmap execution' },
      ],
      risks: ['talent_retention'],
    },
  },
];

const dummyRoles = [
  {
    title: 'Head of Sales',
    department: 'Sales',
    priority: 'high',
    status: 'active',
    description: 'Build and lead the sales function from 0 to 1',
  },
  {
    title: 'Marketing Lead',
    department: 'Marketing',
    priority: 'medium',
    status: 'active',
    description: 'Drive growth through strategic marketing initiatives',
  },
  {
    title: 'Senior Full Stack Engineer',
    department: 'Engineering',
    priority: 'high',
    status: 'active',
    description: 'Build core product features and infrastructure',
  },
  {
    title: 'Customer Success Manager',
    department: 'Customer Success',
    priority: 'medium',
    status: 'active',
    description: 'Ensure customer satisfaction and retention',
  },
  {
    title: 'VP Engineering',
    department: 'Engineering',
    priority: 'high',
    status: 'active',
    description: 'Scale engineering team and processes',
  },
];

const dummyCandidates = [
  {
    fullName: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    status: 'interview',
    fitScore: 92,
    successProbability: 88,
    fitBreakdown: {
      stageFit: 95,
      cultureFit: 90,
      founderFit: 88,
      teamFit: 85,
      velocityFit: 93,
      growthFit: 90,
      builderMindset: 92,
      learningSpeed: 90,
    },
    genomeProfile: {
      overallFit: 92,
      successProbability: 88,
      dimensions: {
        stageFit: 95,
        cultureFit: 90,
        founderFit: 88,
        teamFit: 85,
        velocityFit: 93,
        growthFit: 90,
        builderMindset: 92,
        learningSpeed: 90,
      },
      riskIndicators: [],
      recommendation: 'hire',
      confidence: 'high',
    },
  },
  {
    fullName: 'Michael Rodriguez',
    email: 'm.rodriguez@example.com',
    status: 'screening',
    fitScore: 78,
    successProbability: 72,
    fitBreakdown: {
      stageFit: 80,
      cultureFit: 75,
      founderFit: 70,
      teamFit: 82,
      velocityFit: 75,
      growthFit: 80,
      builderMindset: 78,
      learningSpeed: 85,
    },
    genomeProfile: {
      overallFit: 78,
      successProbability: 72,
      dimensions: {
        stageFit: 80,
        cultureFit: 75,
        founderFit: 70,
        teamFit: 82,
        velocityFit: 75,
        growthFit: 80,
        builderMindset: 78,
        learningSpeed: 85,
      },
      riskIndicators: [
        { type: 'medium', message: 'Moderate founder fit - may need more alignment' },
      ],
      recommendation: 'consider',
      confidence: 'medium',
    },
  },
  {
    fullName: 'Emily Johnson',
    email: 'emily.j@example.com',
    status: 'applied',
    fitScore: null,
    successProbability: null,
  },
  {
    fullName: 'David Kim',
    email: 'david.kim@example.com',
    status: 'offer',
    fitScore: 85,
    successProbability: 80,
    fitBreakdown: {
      stageFit: 88,
      cultureFit: 82,
      founderFit: 85,
      teamFit: 88,
      velocityFit: 80,
      growthFit: 85,
      builderMindset: 85,
      learningSpeed: 88,
    },
    genomeProfile: {
      overallFit: 85,
      successProbability: 80,
      dimensions: {
        stageFit: 88,
        cultureFit: 82,
        founderFit: 85,
        teamFit: 88,
        velocityFit: 80,
        growthFit: 85,
        builderMindset: 85,
        learningSpeed: 88,
      },
      riskIndicators: [],
      recommendation: 'hire',
      confidence: 'high',
    },
  },
  {
    fullName: 'Jessica Martinez',
    email: 'j.martinez@example.com',
    status: 'hired',
    fitScore: 90,
    successProbability: 85,
    fitBreakdown: {
      stageFit: 92,
      cultureFit: 88,
      founderFit: 90,
      teamFit: 90,
      velocityFit: 88,
      growthFit: 92,
      builderMindset: 90,
      learningSpeed: 90,
    },
  },
  {
    fullName: 'Robert Taylor',
    email: 'r.taylor@example.com',
    status: 'screening',
    fitScore: 65,
    successProbability: 58,
    fitBreakdown: {
      stageFit: 60,
      cultureFit: 70,
      founderFit: 55,
      teamFit: 70,
      velocityFit: 60,
      growthFit: 65,
      builderMindset: 65,
      learningSpeed: 70,
    },
    genomeProfile: {
      overallFit: 65,
      successProbability: 58,
      dimensions: {
        stageFit: 60,
        cultureFit: 70,
        founderFit: 55,
        teamFit: 70,
        velocityFit: 60,
        growthFit: 65,
        builderMindset: 65,
        learningSpeed: 70,
      },
      riskIndicators: [
        { type: 'high', message: 'Low founder fit - potential misalignment risk' },
        { type: 'medium', message: 'Stage fit concerns - may not adapt to startup pace' },
      ],
      recommendation: 'reject',
      confidence: 'medium',
    },
  },
];

async function initializeDummyData() {
  if (db.initialized) return;
  
  console.log('🚀 Initializing dummy data...');

  // Create companies
  for (const companyData of dummyCompanies) {
    const company = await prisma.company.upsert({
      where: { startuposId: companyData.startuposId },
      update: {},
      create: companyData,
    });

    // Create roles for each company
    const rolesForCompany = dummyRoles.slice(0, companyData.startuposId === 'demo-123' ? 4 : 2);
    const createdRoles = [];
    for (const roleData of rolesForCompany) {
      const role = await prisma.role.create({
        data: {
          ...roleData,
          companyId: company.id,
        },
      });
      createdRoles.push(role);
    }

    // Create candidates and distribute across roles
    let candidateIndex = 0;
    for (const role of createdRoles) {
      // Assign 2-3 candidates per role
      const candidatesForRole = dummyCandidates.slice(candidateIndex, candidateIndex + 2);
      for (const candidateData of candidatesForRole) {
        await prisma.candidate.create({
          data: {
            ...candidateData,
            companyId: company.id,
            roleId: role.id,
            applicationSource: 'referral',
          },
        });
      }
      candidateIndex += 2;
      if (candidateIndex >= dummyCandidates.length) candidateIndex = 0;
    }

    // Create hires with onboarding plans
    if (createdRoles.length > 0) {
      const hiredCandidate = dummyCandidates.find(c => c.status === 'hired');
      if (hiredCandidate) {
        const hire = await prisma.hire.create({
          data: {
            companyId: company.id,
            roleId: createdRoles[0].id,
            candidateId: null,
            startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
            status: 'active',
          },
        });

        // Create onboarding plan for the hire
        const { OnboardingGenerator } = require('../services/onboarding/onboardingGenerator');
        const onboardingGenerator = new OnboardingGenerator();
        const plan = onboardingGenerator.generateOnboardingPlan(hire, companyData.dnaProfile);
        
        // Mark some tasks as completed for realism
        if (plan.planData.preBoarding?.tasks) {
          plan.planData.preBoarding.tasks[0].completed = true;
          plan.planData.preBoarding.tasks[1].completed = true;
        }
        if (plan.planData.day1?.tasks) {
          plan.planData.day1.tasks[0].completed = true;
          plan.planData.day1.tasks[1].completed = true;
        }
        if (plan.planData.week1?.tasks) {
          plan.planData.week1.tasks[0].completed = true;
        }
        if (plan.planData.checkpoints?.day7) {
          plan.planData.checkpoints.day7.completed = true;
          plan.planData.checkpoints.day7.alignmentScore = 88;
        }

        await prisma.onboardingPlan.create({
          data: {
            hireId: hire.id,
            companyId: company.id,
            planData: plan.planData,
            status: 'in_progress',
            startedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
        });
      }
    }
  }

  db.initialized = true;
  console.log('✅ Dummy data initialized');
}

module.exports = { initializeDummyData };

