const express = require('express');
const { prisma } = require('../db/client');

const router = express.Router();

// Get hires for company
router.get('/', async (req, res, next) => {
  try {
    const { companyId } = req.query;
    const hires = await prisma.hire.findMany({
      where: companyId ? { companyId } : {},
      include: {
        role: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.json({ success: true, data: hires });
  } catch (error) {
    return next(error);
  }
});

// Create hire
router.post('/', async (req, res, next) => {
  try {
    const hire = await prisma.hire.create({
      data: req.body,
    });

    return res.json({ success: true, data: hire });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

