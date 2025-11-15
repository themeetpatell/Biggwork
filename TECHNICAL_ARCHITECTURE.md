# PeopleOS - Technical Architecture

## 🏗️ System Architecture Overview

### High-Level Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                      │
│  - Web Application (React/TypeScript)                      │
│  - Admin Dashboard                                          │
│  - Candidate Portal                                         │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────────────────┐
│                  API Gateway (Kong/AWS)                     │
│  - Authentication & Authorization                           │
│  - Rate Limiting                                            │
│  - Request Routing                                          │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        │                             │
┌───────▼────────┐          ┌────────▼────────┐
│  Backend API   │          │   ML Services    │
│  (Node.js/TS)  │          │   (Python)       │
│                │          │                  │
│  - REST API    │◄─────────┤  - DNA Scanner   │
│  - GraphQL     │          │  - Fit Scoring   │
│  - WebSockets  │          │  - Predictions   │
└───────┬────────┘          └────────┬────────┘
        │                            │
        └────────────┬───────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
┌───────▼────────┐      ┌────────▼────────┐
│   PostgreSQL   │      │    Redis        │
│   (Primary DB) │      │    (Cache/Queue) │
└────────────────┘      └─────────────────┘
        │
┌───────▼────────┐
│   Vector DB   │
│  (Pinecone/   │
│   Weaviate)   │
└───────────────┘
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Library**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand + React Query
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Real-time**: Socket.io client

### Backend
- **Runtime**: Node.js 20+
- **Framework**: Express.js / Fastify
- **Language**: TypeScript
- **API**: REST + GraphQL (Apollo)
- **Authentication**: JWT + OAuth2
- **Validation**: Zod
- **ORM**: Prisma
- **Queue**: Bull (Redis-based)

### Database
- **Primary**: PostgreSQL 15+
- **Cache**: Redis 7+
- **Vector DB**: Pinecone / Weaviate (for embeddings)
- **Search**: PostgreSQL Full-Text Search + Elasticsearch (optional)

### ML/AI Services
- **Language**: Python 3.11+
- **Framework**: FastAPI
- **ML Libraries**: 
  - scikit-learn (traditional ML)
  - PyTorch (deep learning)
  - LangChain (LLM orchestration)
- **Embeddings**: OpenAI / Cohere / Local models
- **Model Serving**: TorchServe / TensorFlow Serving
- **MLOps**: MLflow

### Infrastructure
- **Hosting**: AWS / Vercel (frontend)
- **Containers**: Docker + Kubernetes
- **CI/CD**: GitHub Actions
- **Monitoring**: Datadog / New Relic
- **Logging**: ELK Stack
- **Error Tracking**: Sentry

### Integrations
- **StartupOS**: REST API integration
- **Job Boards**: APIs (LinkedIn, Indeed, etc.)
- **Communication**: Slack Webhooks, Email (SendGrid)

## 📊 Database Schema

### Core Tables

```sql
-- Companies (from StartupOS)
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  startupos_id UUID UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  stage VARCHAR(50) NOT NULL, -- pre_seed, seed, series_a, etc.
  funding_stage VARCHAR(50),
  runway_months INTEGER,
  team_size INTEGER,
  dna_profile JSONB, -- Full DNA scan result
  dna_updated_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Company DNA Dimensions
CREATE TABLE company_dna_dimensions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id),
  dimension_type VARCHAR(50) NOT NULL, -- culture, velocity, stage, etc.
  dimension_data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Roles
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id),
  title VARCHAR(255) NOT NULL,
  department VARCHAR(100),
  priority VARCHAR(20), -- high, medium, low
  status VARCHAR(20) DEFAULT 'draft', -- draft, active, filled, closed
  role_intelligence JSONB, -- Generated role definition
  jd_text TEXT,
  jd_generated_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Candidates
CREATE TABLE candidates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id),
  role_id UUID REFERENCES roles(id),
  email VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  resume_url TEXT,
  linkedin_url TEXT,
  application_source VARCHAR(50),
  status VARCHAR(50) DEFAULT 'applied', -- applied, screening, interview, offer, hired, rejected
  fit_score INTEGER, -- 0-100
  fit_breakdown JSONB, -- Detailed scoring
  success_probability INTEGER, -- 0-100
  risk_indicators JSONB,
  genome_profile JSONB, -- Full talent genome
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Fit Score Dimensions
CREATE TABLE fit_score_dimensions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id UUID REFERENCES candidates(id),
  dimension_type VARCHAR(50) NOT NULL, -- stage_fit, culture_fit, etc.
  score INTEGER NOT NULL, -- 0-100
  reasoning TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Interviews
CREATE TABLE interviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id UUID REFERENCES candidates(id),
  role_id UUID REFERENCES roles(id),
  interview_type VARCHAR(50), -- phone, technical, culture, final
  scheduled_at TIMESTAMP,
  conducted_at TIMESTAMP,
  interviewer_id UUID,
  questions JSONB, -- Generated questions
  feedback JSONB,
  score INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Hires (Successful Candidates)
CREATE TABLE hires (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id UUID REFERENCES candidates(id),
  role_id UUID REFERENCES roles(id),
  company_id UUID REFERENCES companies(id),
  start_date DATE,
  predicted_fit_score INTEGER,
  actual_outcome VARCHAR(50), -- success, failure, neutral
  outcome_reason TEXT,
  retention_days INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Onboarding
CREATE TABLE onboarding_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hire_id UUID REFERENCES hires(id),
  company_id UUID REFERENCES companies(id),
  plan_data JSONB, -- Personalized onboarding plan
  status VARCHAR(50) DEFAULT 'pending',
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Onboarding Checkpoints
CREATE TABLE onboarding_checkpoints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  onboarding_plan_id UUID REFERENCES onboarding_plans(id),
  checkpoint_day INTEGER, -- 7, 30, 60, 90
  alignment_score INTEGER,
  feedback JSONB,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Culture Pulse
CREATE TABLE culture_pulse_checks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id),
  employee_id UUID,
  alignment_score INTEGER,
  builder_mindset_score INTEGER,
  pulse_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Predictions (ML Model Outputs)
CREATE TABLE predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type VARCHAR(50), -- candidate, hire, retention
  entity_id UUID,
  prediction_type VARCHAR(50), -- fit_score, success_prob, retention_risk
  predicted_value NUMERIC,
  confidence NUMERIC,
  model_version VARCHAR(50),
  features JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Outcomes (Feedback Loop)
CREATE TABLE outcomes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prediction_id UUID REFERENCES predictions(id),
  actual_value NUMERIC,
  accuracy NUMERIC,
  feedback_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- StartupOS Integration
CREATE TABLE startupos_sync (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id),
  sync_type VARCHAR(50), -- full, incremental
  data_snapshot JSONB,
  sync_status VARCHAR(50),
  synced_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_companies_startupos_id ON companies(startupos_id);
CREATE INDEX idx_candidates_company_role ON candidates(company_id, role_id);
CREATE INDEX idx_candidates_fit_score ON candidates(fit_score DESC);
CREATE INDEX idx_hires_company ON hires(company_id);
CREATE INDEX idx_predictions_entity ON predictions(entity_type, entity_id);
CREATE INDEX idx_dna_profile ON companies USING GIN(dna_profile);
```

## 🔌 API Design

### REST Endpoints

#### Company DNA
```
GET    /api/v1/companies/:id/dna
POST   /api/v1/companies/:id/dna/scan
GET    /api/v1/companies/:id/dna/recommendations
```

#### Roles
```
GET    /api/v1/companies/:id/roles
POST   /api/v1/companies/:id/roles
GET    /api/v1/roles/:id
PUT    /api/v1/roles/:id
POST   /api/v1/roles/:id/generate-jd
GET    /api/v1/roles/:id/intelligence
```

#### Candidates
```
GET    /api/v1/roles/:id/candidates
POST   /api/v1/roles/:id/candidates
GET    /api/v1/candidates/:id
PUT    /api/v1/candidates/:id
POST   /api/v1/candidates/:id/score
GET    /api/v1/candidates/:id/genome
POST   /api/v1/candidates/:id/predict
```

#### Interviews
```
GET    /api/v1/candidates/:id/interviews
POST   /api/v1/candidates/:id/interviews
GET    /api/v1/interviews/:id
PUT    /api/v1/interviews/:id
POST   /api/v1/interviews/:id/questions
```

#### Onboarding
```
GET    /api/v1/hires/:id/onboarding
POST   /api/v1/hires/:id/onboarding/start
POST   /api/v1/onboarding/:id/checkpoint
GET    /api/v1/onboarding/:id/status
```

#### Analytics
```
GET    /api/v1/companies/:id/analytics
GET    /api/v1/companies/:id/predictions
GET    /api/v1/companies/:id/outcomes
```

### GraphQL Schema

```graphql
type Company {
  id: ID!
  name: String!
  stage: String!
  dnaProfile: DNAProfile
  roles: [Role!]!
}

type Role {
  id: ID!
  title: String!
  intelligence: RoleIntelligence
  candidates: [Candidate!]!
}

type Candidate {
  id: ID!
  fitScore: Int!
  fitBreakdown: FitBreakdown!
  successProbability: Int!
  genome: TalentGenome!
}

type DNAProfile {
  stage: String!
  velocity: String!
  cultureDNA: CultureDNA!
  teamGaps: [String!]!
  hiringPriorities: [HiringPriority!]!
}
```

## 🤖 ML/AI Architecture

### Models

#### 1. DNA Scanner Model
- **Input**: StartupOS data (company profile, team, metrics)
- **Output**: Company DNA profile (structured JSON)
- **Type**: Transformer-based (fine-tuned)
- **Training**: Supervised learning on labeled startup data

#### 2. Fit Scoring Model
- **Input**: Candidate profile + Company DNA
- **Output**: Multi-dimensional fit scores
- **Type**: Ensemble (XGBoost + Neural Network)
- **Training**: Historical hiring outcomes

#### 3. Success Prediction Model
- **Input**: Fit scores + Role intelligence
- **Output**: Success probability (0-100%)
- **Type**: Gradient Boosting
- **Training**: Hire outcomes (90-day retention, performance)

#### 4. Retention Risk Model
- **Input**: Employee data + Culture pulse
- **Output**: Retention risk score
- **Type**: Time-series + Classification
- **Training**: Historical exit data

### Model Serving
- **Framework**: FastAPI + TorchServe
- **Deployment**: Kubernetes pods
- **Scaling**: Auto-scaling based on load
- **Versioning**: MLflow model registry
- **A/B Testing**: Feature flags for model versions

## 🔄 Data Flow

### DNA Scan Flow
```
1. User triggers DNA scan
2. Backend fetches StartupOS data
3. Data sent to ML service
4. DNA Scanner model processes
5. DNA profile stored in DB
6. Recommendations generated
7. User notified
```

### Candidate Scoring Flow
```
1. Candidate applies/submitted
2. Backend extracts candidate data
3. Fetches company DNA
4. Sends to Fit Scoring model
5. Model returns scores
6. Scores stored in DB
7. Alerts generated if risk detected
8. Results returned to user
```

### Feedback Loop
```
1. Hire outcome recorded (success/failure)
2. Outcome matched to prediction
3. Accuracy calculated
4. Data added to training set
5. Model retrained periodically
6. New model version deployed
7. A/B tested
8. Rolled out if better
```

## 🚀 Deployment Architecture

### Production Setup
```
┌─────────────────────────────────────────┐
│         Load Balancer (AWS ALB)        │
└──────────────┬──────────────────────────┘
               │
    ┌──────────┴──────────┐
    │                     │
┌───▼────┐          ┌─────▼────┐
│  Web   │          │   API    │
│  (Vercel)│         │ (ECS/K8s)│
└────────┘          └─────┬─────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
┌───────▼────┐    ┌──────▼──────┐   ┌─────▼─────┐
│ PostgreSQL │    │    Redis    │   │   ML      │
│  (RDS)     │    │  (ElastiCache)│  │ Services  │
└────────────┘    └─────────────┘   └───────────┘
```

### Environment Strategy
- **Development**: Local Docker Compose
- **Staging**: AWS ECS / Kubernetes
- **Production**: AWS ECS / Kubernetes (multi-AZ)

## 📈 Scalability Plan

### Phase 1 (0-1K companies)
- Single region
- Monolithic API
- Single PostgreSQL instance
- Basic caching

### Phase 2 (1K-10K companies)
- Multi-region
- Microservices (DNA, Scoring, Onboarding)
- Read replicas
- Advanced caching
- CDN

### Phase 3 (10K+ companies)
- Full microservices
- Database sharding
- Event-driven architecture
- Global distribution
- Advanced ML infrastructure

## 🔒 Security

- **Authentication**: JWT with refresh tokens
- **Authorization**: RBAC (Role-Based Access Control)
- **Data Encryption**: AES-256 at rest, TLS in transit
- **API Security**: Rate limiting, input validation
- **Compliance**: SOC 2, GDPR ready
- **Audit Logging**: All actions logged

## 📊 Monitoring & Observability

- **APM**: Datadog / New Relic
- **Logging**: ELK Stack
- **Metrics**: Prometheus + Grafana
- **Error Tracking**: Sentry
- **Uptime**: Pingdom / UptimeRobot
- **Alerts**: PagerDuty integration

