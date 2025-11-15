const express = require('express');
const { prisma } = require('../db/client');
const { InterviewGenerator } = require('../services/interview/interviewGenerator');

const router = express.Router();
const interviewGenerator = new InterviewGenerator();

// Generate interview questions for role
router.post('/role/:roleId/questions', async (req, res, next) => {
  try {
    const { roleId } = req.params;
    const role = await prisma.role.findUnique({
      where: { id: roleId },
      include: {
        company: true,
      },
    });

    if (!role) {
      return res.status(404).json({
        success: false,
        error: { message: 'Role not found' },
      });
    }

    const companyDNA = role.company.dnaProfile || {};
    if (!companyDNA || Object.keys(companyDNA).length === 0) {
      return res.status(400).json({
        success: false,
        error: { message: 'Company DNA not found. Please scan company DNA first.' },
      });
    }

    const questions = interviewGenerator.generateInterviewQuestions(role, companyDNA);
    const scorecard = interviewGenerator.generateScorecard(role, companyDNA);

    return res.json({
      success: true,
      data: {
        questions,
        scorecard,
      },
    });
  } catch (error) {
    return next(error);
  }
});

// Create interview
router.post('/candidate/:candidateId', async (req, res, next) => {
  try {
    const { candidateId } = req.params;
    const { interviewType, scheduledAt, questions, scorecard } = req.body;

    const candidate = await prisma.candidate.findUnique({
      where: { id: candidateId },
      include: {
        role: true,
      },
    });

    if (!candidate) {
      return res.status(404).json({
        success: false,
        error: { message: 'Candidate not found' },
      });
    }

    const interview = await prisma.interview.create({
      data: {
        candidateId,
        roleId: candidate.roleId,
        interviewType: interviewType || 'phone',
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        questions: questions || {},
        feedback: {},
        score: null,
      },
    });

    return res.json({ success: true, data: interview });
  } catch (error) {
    return next(error);
  }
});

// Update interview with feedback
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { feedback, score, scorecard } = req.body;

    const interview = await prisma.interview.findUnique({
      where: { id },
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        error: { message: 'Interview not found' },
      });
    }

    const updated = await prisma.interview.update({
      where: { id },
      data: {
        feedback: feedback || interview.feedback,
        score,
        conductedAt: new Date(),
      },
    });

    return res.json({ success: true, data: updated });
  } catch (error) {
    return next(error);
  }
});

// Get interviews for candidate
router.get('/candidate/:candidateId', async (req, res, next) => {
  try {
    const { candidateId } = req.params;
    const interviews = await prisma.interview.findMany({
      where: { candidateId },
      orderBy: { scheduledAt: 'desc' },
    });

    return res.json({ success: true, data: interviews });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
