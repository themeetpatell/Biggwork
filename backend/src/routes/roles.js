const express = require('express');
const { prisma } = require('../db/client');
const { JDGenerator } = require('../services/roles/jdGenerator');

const router = express.Router();
const jdGenerator = new JDGenerator();

// Get roles for company
router.get('/company/:companyId', async (req, res, next) => {
  try {
    const { companyId } = req.params;
    const roles = await prisma.role.findMany({
      where: { companyId },
      include: {
        _count: {
          select: {
            candidates: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.json({ success: true, data: roles });
  } catch (error) {
    return next(error);
  }
});

// Get role by ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const role = await prisma.role.findUnique({
      where: { id },
      include: {
        company: true,
        _count: {
          select: {
            candidates: true,
          },
        },
      },
    });

    if (!role) {
      return res.status(404).json({
        success: false,
        error: { message: 'Role not found' },
      });
    }

    return res.json({ success: true, data: role });
  } catch (error) {
    return next(error);
  }
});

// Create role
router.post('/', async (req, res, next) => {
  try {
    const role = await prisma.role.create({
      data: req.body,
    });

    return res.json({ success: true, data: role });
  } catch (error) {
    return next(error);
  }
});

// Update role
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const role = await prisma.role.update({
      where: { id },
      data: req.body,
    });

    return res.json({ success: true, data: role });
  } catch (error) {
    return next(error);
  }
});

// Generate JD for role
router.post('/:id/generate-jd', async (req, res, next) => {
  try {
    const { id } = req.params;
    const role = await prisma.role.findUnique({
      where: { id },
      include: {
        company: true,
      },
    });

    if (!role || !role.company) {
      return res.status(404).json({
        success: false,
        error: { message: 'Role or company not found' },
      });
    }

    const companyDNA = role.company.dnaProfile || {};
    if (!companyDNA || Object.keys(companyDNA).length === 0) {
      return res.status(400).json({
        success: false,
        error: { message: 'Company DNA not found. Please scan company DNA first.' },
      });
    }

    const jd = await jdGenerator.generateJD(role, companyDNA);

    const updated = await prisma.role.update({
      where: { id },
      data: {
        jobDescription: jd.text,
        jdData: jd,
      },
    });

    return res.json({ success: true, data: updated });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

