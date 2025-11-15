const express = require('express');
const { prisma } = require('../db/client');
const { FitScorer } = require('../services/scoring/fitScorer');

const router = express.Router();
const fitScorer = new FitScorer();

// Get all candidates for company (must come before /role/:roleId)
router.get('/company/:companyId', async (req, res, next) => {
  try {
    const { companyId } = req.params;
    const candidates = await prisma.candidate.findMany({
      where: { companyId },
      orderBy: { fitScore: 'desc' },
    });

    return res.json({ success: true, data: candidates });
  } catch (error) {
    return next(error);
  }
});

// Get candidates for role
router.get('/role/:roleId', async (req, res, next) => {
  try {
    const { roleId } = req.params;
    if (!roleId || roleId === 'all') {
      return res.json({ success: true, data: [] });
    }
    const candidates = await prisma.candidate.findMany({
      where: { roleId },
      orderBy: { fitScore: 'desc' },
    });

    return res.json({ success: true, data: candidates });
  } catch (error) {
    return next(error);
  }
});

// Create candidate
router.post('/', async (req, res, next) => {
  try {
    const candidate = await prisma.candidate.create({
      data: req.body,
    });

    return res.json({ success: true, data: candidate });
  } catch (error) {
    return next(error);
  }
});

// Score candidate
router.post('/:id/score', async (req, res, next) => {
  try {
    const { id } = req.params;
    const candidate = await prisma.candidate.findUnique({
      where: { id },
      include: {
        role: {
          include: {
            company: true,
          },
        },
      },
    });

    if (!candidate || !candidate.role) {
      return res.status(404).json({
        success: false,
        error: { message: 'Candidate or role not found' },
      });
    }

    const companyDNA = candidate.role.company.dnaProfile || {};
    if (!companyDNA || Object.keys(companyDNA).length === 0) {
      return res.status(400).json({
        success: false,
        error: { message: 'Company DNA not found. Please scan company DNA first.' },
      });
    }

    const candidateProfile = {
      id: candidate.id,
      experience: [
        { company: 'Previous Company', role: candidate.role.title, stage: companyDNA.stage, duration: '2 years' },
      ],
      skills: [],
      background: 'technical',
    };

    const genome = await fitScorer.scoreCandidate(candidateProfile, companyDNA);

    const updated = await prisma.candidate.update({
      where: { id },
      data: {
        fitScore: genome.overallFit,
        fitBreakdown: genome.dimensions || {},
        successProbability: genome.successProbability,
        riskIndicators: genome.riskIndicators || [],
        genomeProfile: genome,
      },
    });

    return res.json({ success: true, data: { candidate: updated, genome } });
  } catch (error) {
    return next(error);
  }
});

// Get candidate genome
router.get('/:id/genome', async (req, res, next) => {
  try {
    const { id } = req.params;
    const candidate = await prisma.candidate.findUnique({
      where: { id },
    });

    if (!candidate || !candidate.genomeProfile) {
      return res.status(404).json({
        success: false,
        error: { message: 'Candidate genome not found. Please score candidate first.' },
      });
    }

    return res.json({ success: true, data: candidate.genomeProfile });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

