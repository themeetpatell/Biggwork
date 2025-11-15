const express = require('express');
const { prisma } = require('../db/client');
const { OnboardingGenerator } = require('../services/onboarding/onboardingGenerator');

const router = express.Router();
const onboardingGenerator = new OnboardingGenerator();

// Get onboarding plan for hire
router.get('/hire/:hireId', async (req, res, next) => {
  try {
    const { hireId } = req.params;
    const onboardingPlan = await prisma.onboardingPlan.findUnique({
      where: { hireId },
      include: {
        hire: {
          include: {
            company: true,
          },
        },
      },
    });

    if (!onboardingPlan) {
      return res.status(404).json({
        success: false,
        error: { message: 'Onboarding plan not found' },
      });
    }

    return res.json({ success: true, data: onboardingPlan });
  } catch (error) {
    return next(error);
  }
});

// Start onboarding for a hire
router.post('/hire/:hireId/start', async (req, res, next) => {
  try {
    const { hireId } = req.params;
    const hire = await prisma.hire.findUnique({
      where: { id: hireId },
      include: {
        company: true,
      },
    });

    if (!hire) {
      return res.status(404).json({
        success: false,
        error: { message: 'Hire not found' },
      });
    }

    const companyDNA = hire.company.dnaProfile || {};
    if (!companyDNA || Object.keys(companyDNA).length === 0) {
      return res.status(400).json({
        success: false,
        error: { message: 'Company DNA not found. Please scan company DNA first.' },
      });
    }

    const plan = onboardingGenerator.generateOnboardingPlan(hire, companyDNA);

    const onboardingPlan = await prisma.onboardingPlan.upsert({
      where: { hireId },
      update: {
        planData: plan.planData,
        status: 'in_progress',
        startedAt: new Date(),
      },
      create: {
        hireId,
        companyId: hire.companyId,
        planData: plan.planData,
        status: 'in_progress',
        startedAt: new Date(),
      },
    });

    return res.json({ success: true, data: onboardingPlan });
  } catch (error) {
    return next(error);
  }
});

// Complete checkpoint
router.post('/:id/checkpoint/:day', async (req, res, next) => {
  try {
    const { id, day } = req.params;
    const { alignmentScore, feedback } = req.body;

    const onboardingPlan = await prisma.onboardingPlan.findUnique({
      where: { id },
    });

    if (!onboardingPlan) {
      return res.status(404).json({
        success: false,
        error: { message: 'Onboarding plan not found' },
      });
    }

    const planData = onboardingPlan.planData || {};
    const checkpointDay = parseInt(day);
    const checkpointKey = `day${checkpointDay}`;

    if (planData.checkpoints && planData.checkpoints[checkpointKey]) {
      planData.checkpoints[checkpointKey].completed = true;
      planData.checkpoints[checkpointKey].alignmentScore = alignmentScore;
      planData.checkpoints[checkpointKey].feedback = feedback;
      planData.checkpoints[checkpointKey].completedAt = new Date();
    }

    await prisma.onboardingPlan.update({
      where: { id },
      data: { planData },
    });

    await prisma.onboardingCheckpoint.create({
      data: {
        onboardingPlanId: id,
        checkpointDay: checkpointDay,
        alignmentScore,
        feedback,
        completedAt: new Date(),
      },
    });

    return res.json({ success: true, data: planData.checkpoints[checkpointKey] });
  } catch (error) {
    return next(error);
  }
});

// Get onboarding status
router.get('/:id/status', async (req, res, next) => {
  try {
    const { id } = req.params;
    const onboardingPlan = await prisma.onboardingPlan.findUnique({
      where: { id },
      include: {
        hire: true,
      },
    });

    if (!onboardingPlan) {
      return res.status(404).json({
        success: false,
        error: { message: 'Onboarding plan not found' },
      });
    }

    const planData = onboardingPlan.planData || {};
    const totalTasks = [
      ...(planData.preBoarding?.tasks || []),
      ...(planData.day1?.tasks || []),
      ...(planData.week1?.tasks || []),
      ...(planData.week2_4?.tasks || []),
    ];
    const completedTasks = totalTasks.filter((t) => t.completed).length;
    const progress = totalTasks.length > 0 ? Math.round((completedTasks / totalTasks.length) * 100) : 0;

    return res.json({
      success: true,
      data: {
        ...onboardingPlan,
        progress,
        completedTasks,
        totalTasks: totalTasks.length,
      },
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

