const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { errorHandler } = require('./middleware/errorHandler');
const { logger } = require('./utils/logger');
const { initializeDummyData } = require('./utils/dummyData');

// Routes
const companyRoutes = require('./routes/companies');
const roleRoutes = require('./routes/roles');
const candidateRoutes = require('./routes/candidates');
const dnaRoutes = require('./routes/dna');
const onboardingRoutes = require('./routes/onboarding');
const interviewRoutes = require('./routes/interviews');
const hireRoutes = require('./routes/hires');
const talentMarketIntelligenceRoutes = require('./routes/talentMarketIntelligence');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize dummy data
initializeDummyData().catch(err => {
  logger.error('Failed to initialize dummy data:', err);
});

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/v1/companies', companyRoutes);
app.use('/api/v1/roles', roleRoutes);
app.use('/api/v1/candidates', candidateRoutes);
app.use('/api/v1/dna', dnaRoutes);
app.use('/api/v1/onboarding', onboardingRoutes);
app.use('/api/v1/interviews', interviewRoutes);
app.use('/api/v1/hires', hireRoutes);
app.use('/api/v1/talent-market-intelligence', talentMarketIntelligenceRoutes);

// Error handling
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  logger.info(`🚀 PeopleOS API server running on port ${PORT}`);
});

// Handle errors
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    logger.error(`Port ${PORT} is already in use. Please free the port or change PORT in .env`);
    process.exit(1);
  } else {
    logger.error(`Server error: ${err}`);
    throw err;
  }
});

module.exports = app;

