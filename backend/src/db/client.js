function generateId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

class InMemoryDB {
  constructor() {
    this.companies = new Map();
    this.roles = new Map();
    this.candidates = new Map();
    this.hires = new Map();
    this.onboardingPlans = new Map();
    this.interviews = new Map();
    this.onboardingCheckpoints = new Map();
    this.startuposIndex = new Map();
    this.initialized = false;
  }

  _applyIncludes(entity, include) {
    if (!include || !entity) return entity;
    const result = { ...entity };
    if (include.roles) {
      result.roles = Array.from(this.roles.values()).filter(r => r.companyId === entity.id);
    }
    if (include.company) {
      result.company = this.companies.get(entity.companyId) || null;
    }
    if (include.candidates) {
      const candidates = Array.from(this.candidates.values()).filter(c => c.roleId === entity.id);
      if (include.candidates.orderBy) {
        const orderBy = include.candidates.orderBy;
        candidates.sort((a, b) => {
          const key = Object.keys(orderBy)[0];
          const direction = orderBy[key];
          const aVal = a[key] || 0;
          const bVal = b[key] || 0;
          return direction === 'desc' ? (bVal - aVal) : (aVal - bVal);
        });
      }
      result.candidates = candidates;
    }
    if (include.role) {
      result.role = entity.roleId ? this.roles.get(entity.roleId) || null : null;
      if (result.role && include.role.company) {
        result.role.company = this.companies.get(result.role.companyId) || null;
      }
    }
    if (include.hire) {
      result.hire = entity.hireId ? this.hires.get(entity.hireId) || null : null;
      if (result.hire && include.hire.company) {
        result.hire.company = this.companies.get(result.hire.companyId) || null;
      }
    }
    if (include._count) {
      result._count = {};
      if (include._count.select) {
        if (include._count.select.candidates !== undefined) {
          result._count.candidates = Array.from(this.candidates.values()).filter(c => c.companyId === entity.id).length;
        }
        if (include._count.select.hires !== undefined) {
          result._count.hires = Array.from(this.hires.values()).filter(h => h.companyId === entity.id).length;
        }
        if (include._count.select.roles !== undefined) {
          result._count.roles = Array.from(this.roles.values()).filter(r => r.companyId === entity.id).length;
        }
      }
    }
    return result;
  }

  company = {
    findUnique: async (query) => {
      const { where, include } = query || {};
      let company = null;
      if (where.id) {
        company = this.companies.get(where.id) || null;
      } else if (where.startuposId) {
        const id = this.startuposIndex.get(where.startuposId);
        company = id ? this.companies.get(id) || null : null;
      }
      if (!company) return null;
      return this._applyIncludes(company, include);
    },
    findMany: async (query) => {
      const { where } = query || {};
      const results = Array.from(this.companies.values());
      if (where) {
        return results.filter(c => {
          if (where.companyId && c.id !== where.companyId) return false;
          return true;
        });
      }
      return results;
    },
    create: async (data) => {
      const id = generateId();
      const company = {
        id,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.companies.set(id, company);
      if (data.startuposId) {
        this.startuposIndex.set(data.startuposId, id);
      }
      return company;
    },
    update: async (query) => {
      const { where, data } = query;
      const company = this.companies.get(where.id);
      if (!company) throw new Error('Company not found');
      const updated = { ...company, ...data, updatedAt: new Date() };
      this.companies.set(where.id, updated);
      return updated;
    },
    upsert: async (query) => {
      const { where, update, create } = query;
      const existing = await this.company.findUnique({ where });
      if (existing) {
        return await this.company.update({ where: { id: existing.id }, data: update });
      }
      return await this.company.create(create);
    },
  };

  role = {
    findUnique: async (query) => {
      const { where, include } = query || {};
      const role = this.roles.get(where.id) || null;
      if (!role) return null;
      return this._applyIncludes(role, include);
    },
    findMany: async (query) => {
      const { where, include, orderBy } = query || {};
      let results = Array.from(this.roles.values());
      if (where && where.companyId) {
        results = results.filter(r => r.companyId === where.companyId);
      }
      if (orderBy) {
        const key = Object.keys(orderBy)[0];
        const direction = orderBy[key];
        results.sort((a, b) => {
          const aVal = a[key];
          const bVal = b[key];
          return direction === 'desc' ? (bVal > aVal ? 1 : -1) : (aVal > bVal ? 1 : -1);
        });
      }
      return results.map(r => include ? this._applyIncludes(r, include) : r);
    },
    create: async (data) => {
      const id = generateId();
      const role = {
        id,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.roles.set(id, role);
      return role;
    },
    update: async (query) => {
      const { where, data } = query;
      const role = this.roles.get(where.id);
      if (!role) throw new Error('Role not found');
      const updated = { ...role, ...data, updatedAt: new Date() };
      this.roles.set(where.id, updated);
      return updated;
    },
  };

  candidate = {
    findUnique: async (query) => {
      const { where, include } = query || {};
      const candidate = this.candidates.get(where.id) || null;
      if (!candidate) return null;
      return this._applyIncludes(candidate, include);
    },
    findMany: async (query) => {
      const { where, orderBy } = query || {};
      let results = Array.from(this.candidates.values());
      if (where) {
        results = results.filter(c => {
          if (where.roleId && c.roleId !== where.roleId) return false;
          if (where.companyId && c.companyId !== where.companyId) return false;
          return true;
        });
      }
      if (orderBy) {
        const key = Object.keys(orderBy)[0];
        const direction = orderBy[key];
        results.sort((a, b) => {
          const aVal = a[key] || 0;
          const bVal = b[key] || 0;
          return direction === 'desc' ? (bVal - aVal) : (aVal - bVal);
        });
      }
      return results;
    },
    create: async (data) => {
      const id = generateId();
      const candidate = {
        id,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.candidates.set(id, candidate);
      return candidate;
    },
    update: async (query) => {
      const { where, data } = query;
      const candidate = this.candidates.get(where.id);
      if (!candidate) throw new Error('Candidate not found');
      const updated = { ...candidate, ...data, updatedAt: new Date() };
      this.candidates.set(where.id, updated);
      return updated;
    },
  };

  hire = {
    findUnique: async (query) => {
      const { where, include } = query || {};
      const hire = this.hires.get(where.id) || null;
      if (!hire) return null;
      return this._applyIncludes(hire, include);
    },
    findMany: async (query) => {
      const { where } = query || {};
      const results = Array.from(this.hires.values());
      if (where && where.companyId) {
        return results.filter(h => h.companyId === where.companyId);
      }
      return results;
    },
    create: async (data) => {
      const id = generateId();
      const hire = {
        id,
        ...data,
        createdAt: new Date(),
      };
      this.hires.set(id, hire);
      return hire;
    },
  };

  onboardingPlan = {
    findUnique: async (query) => {
      const { where, include } = query || {};
      let plan = null;
      if (where.id) {
        plan = this.onboardingPlans.get(where.id) || null;
      } else if (where.hireId) {
        const plans = Array.from(this.onboardingPlans.values());
        plan = plans.find(p => p.hireId === where.hireId) || null;
      }
      if (!plan) return null;
      return this._applyIncludes(plan, include);
    },
    findMany: async (query) => {
      const { where } = query || {};
      const results = Array.from(this.onboardingPlans.values());
      if (where && where.companyId) {
        return results.filter(p => p.companyId === where.companyId);
      }
      return results;
    },
    create: async (data) => {
      const id = generateId();
      const plan = {
        id,
        ...data,
        createdAt: new Date(),
      };
      this.onboardingPlans.set(id, plan);
      return plan;
    },
    update: async (query) => {
      const { where, data } = query;
      const plan = this.onboardingPlans.get(where.id);
      if (!plan) throw new Error('Onboarding plan not found');
      const updated = { ...plan, ...data };
      this.onboardingPlans.set(where.id, updated);
      return updated;
    },
    upsert: async (query) => {
      const { where, update, create } = query;
      const existing = await this.onboardingPlan.findUnique({ where });
      if (existing) {
        return await this.onboardingPlan.update({ where: { id: existing.id }, data: update });
      }
      return await this.onboardingPlan.create(create);
    },
  };

  onboardingCheckpoint = {
    create: async (data) => {
      const id = generateId();
      const checkpoint = {
        id,
        ...data,
        createdAt: new Date(),
      };
      this.onboardingCheckpoints.set(id, checkpoint);
      return checkpoint;
    },
  };

  interview = {
    findUnique: async (query) => {
      const { where } = query;
      return this.interviews.get(where.id) || null;
    },
    findMany: async (query) => {
      const { where } = query || {};
      const results = Array.from(this.interviews.values());
      if (where && where.candidateId) {
        return results.filter(i => i.candidateId === where.candidateId);
      }
      if (where && where.roleId) {
        return results.filter(i => i.roleId === where.roleId);
      }
      return results;
    },
    create: async (data) => {
      const id = generateId();
      const interview = {
        id,
        ...data,
        createdAt: new Date(),
      };
      this.interviews.set(id, interview);
      return interview;
    },
    update: async (query) => {
      const { where, data } = query;
      const interview = this.interviews.get(where.id);
      if (!interview) throw new Error('Interview not found');
      const updated = { ...interview, ...data };
      this.interviews.set(where.id, updated);
      return updated;
    },
  };
}

const db = new InMemoryDB();

const prisma = {
  company: db.company,
  role: db.role,
  candidate: db.candidate,
  hire: db.hire,
  onboardingPlan: db.onboardingPlan,
  onboardingCheckpoint: db.onboardingCheckpoint,
  interview: db.interview,
};

module.exports = { prisma, db };

