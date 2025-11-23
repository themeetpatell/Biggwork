export class BuilderMode {
  constructor() {
    this.modules = this.loadModules()
    this.progress = this.loadProgress()
  }

  loadModules() {
    return [
      {
        id: 'builder_mindset_101',
        title: 'Builder Mindset 101',
        description: 'Introduction to thinking like a builder, not an employee',
        duration: '30 min',
        type: 'video',
        content: {
          videos: ['Introduction to Builder Culture', 'Ownership vs. Employment'],
          exercises: ['Reflection: What does ownership mean to you?', 'Case Study: Builder vs. Employee mindset']
        },
        completed: false
      },
      {
        id: 'ownership_framework',
        title: 'Ownership Framework',
        description: 'Learn to take ownership and drive outcomes',
        duration: '45 min',
        type: 'interactive',
        content: {
          concepts: ['Ownership Principles', 'Outcome-Driven Thinking', 'Proactive Problem Solving'],
          exercises: ['Ownership Assessment', 'Scenario Planning Exercise']
        },
        completed: false
      },
      {
        id: 'startup_velocity',
        title: 'Startup Velocity & Speed',
        description: 'Understanding and embracing startup pace',
        duration: '20 min',
        type: 'reading',
        content: {
          readings: ['Speed as Competitive Advantage', 'Decision-Making in Uncertainty'],
          exercises: ['Velocity Self-Assessment']
        },
        completed: false
      },
      {
        id: 'culture_alignment',
        title: 'Culture Alignment',
        description: 'Aligning with company values and mission',
        duration: '25 min',
        type: 'assessment',
        content: {
          assessments: ['Culture Fit Assessment', 'Values Alignment Check'],
          exercises: ['Personal Values Mapping']
        },
        completed: false
      },
      {
        id: 'founder_mindset',
        title: 'Founder Mindset',
        description: 'Thinking like a founder, even as an employee',
        duration: '40 min',
        type: 'video',
        content: {
          videos: ['Founder Thinking Patterns', 'Resourcefulness & Creativity'],
          exercises: ['Founder Mindset Challenge']
        },
        completed: false
      }
    ]
  }

  loadProgress() {
    const saved = localStorage.getItem('biggwork_builder_progress')
    return saved ? JSON.parse(saved) : {}
  }

  saveProgress() {
    localStorage.setItem('biggwork_builder_progress', JSON.stringify(this.progress))
  }

  getModules() {
    return this.modules.map(module => ({
      ...module,
      completed: this.progress[module.id]?.completed || false,
      progress: this.progress[module.id]?.progress || 0
    }))
  }

  getModule(id) {
    return this.modules.find(m => m.id === id)
  }

  startModule(id) {
    if (!this.progress[id]) {
      this.progress[id] = { started: new Date().toISOString(), progress: 0, completed: false }
    }
    this.saveProgress()
  }

  updateProgress(id, progress) {
    if (!this.progress[id]) {
      this.progress[id] = { started: new Date().toISOString(), progress: 0, completed: false }
    }
    this.progress[id].progress = Math.max(this.progress[id].progress, progress)
    if (progress >= 100) {
      this.progress[id].completed = true
      this.progress[id].completedAt = new Date().toISOString()
    }
    this.saveProgress()
  }

  completeModule(id) {
    if (!this.progress[id]) {
      this.progress[id] = { started: new Date().toISOString(), progress: 0, completed: false }
    }
    this.progress[id].completed = true
    this.progress[id].progress = 100
    this.progress[id].completedAt = new Date().toISOString()
    this.saveProgress()
  }

  getOverallProgress() {
    const total = this.modules.length
    const completed = Object.values(this.progress).filter(p => p.completed).length
    const totalProgress = Object.values(this.progress).reduce((sum, p) => sum + (p.progress || 0), 0)
    const avgProgress = total > 0 ? totalProgress / total : 0

    return {
      total,
      completed,
      completionRate: total > 0 ? (completed / total) * 100 : 0,
      avgProgress: Math.round(avgProgress)
    }
  }

  getBuilderScore() {
    const progress = this.getOverallProgress()
    const completedModules = Object.keys(this.progress).filter(id => this.progress[id].completed).length
    
    let score = 0
    score += (progress.completionRate / 100) * 60
    score += (completedModules / this.modules.length) * 40

    return Math.round(score)
  }
}

