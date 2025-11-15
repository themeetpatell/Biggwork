const express = require('express');
const { prisma } = require('../db/client');
const { DNAScanner } = require('../services/dna/dnaScanner');

const router = express.Router();
const dnaScanner = new DNAScanner();

// Scan company DNA
router.post('/companies/:startuposId/scan', async (req, res, next) => {
  try {
    const { startuposId } = req.params;
    
    const dnaProfile = await dnaScanner.scanCompany(startuposId);

    const company = await prisma.company.upsert({
      where: { startuposId },
      update: {
        dnaProfile,
        updatedAt: new Date(),
      },
      create: {
        startuposId,
        name: dnaProfile.companyName || 'Unknown Company',
        industry: dnaProfile.industry || 'Technology',
        stage: dnaProfile.stage || 'seed',
        dnaProfile,
      },
    });

    return res.json({
      success: true,
      data: {
        company,
        dnaProfile,
      },
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

