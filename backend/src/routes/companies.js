const express = require('express');
const { prisma } = require('../db/client');

const router = express.Router();

// Get company by StartupOS ID
router.get('/startupos/:startuposId', async (req, res, next) => {
  try {
    const { startuposId } = req.params;
    const company = await prisma.company.findUnique({
      where: { startuposId },
      include: {
        roles: true,
        _count: {
          select: {
            candidates: true,
            hires: true,
            roles: true,
          },
        },
      },
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        error: { message: 'Company not found' },
      });
    }

    return res.json({ success: true, data: company });
  } catch (error) {
    return next(error);
  }
});

// Get company by ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const company = await prisma.company.findUnique({
      where: { id },
      include: {
        roles: true,
      },
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        error: { message: 'Company not found' },
      });
    }

    return res.json({ success: true, data: company });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

