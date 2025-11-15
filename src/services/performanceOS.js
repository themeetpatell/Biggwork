export class PerformanceOS {
  constructor() {
    this.performanceData = this.loadPerformanceData()
  }

  loadPerformanceData() {
    const saved = localStorage.getItem('peopleos_performance')
    return saved ? JSON.parse(saved) : {
      employees: [],
      goals: [],
      reviews: [],
      feedback: []
    }
  }

  savePerformanceData() {
    localStorage.setItem('peopleos_performance', JSON.stringify(this.performanceData))
  }

  addEmployee(employeeData) {
    const employee = {
      id: `emp_${Date.now()}`,
      name: employeeData.name,
      role: employeeData.role,
      department: employeeData.department,
      startDate: employeeData.startDate || new Date().toISOString(),
      goals: [],
      reviews: [],
      feedback: [],
      performanceScore: null,
      lastReview: null
    }

    this.performanceData.employees.push(employee)
    this.savePerformanceData()
    return employee
  }

  getEmployees() {
    return this.performanceData.employees
  }

  addGoal(employeeId, goalData) {
    const goal = {
      id: `goal_${Date.now()}`,
      employeeId,
      title: goalData.title,
      description: goalData.description,
      targetDate: goalData.targetDate,
      status: 'in_progress',
      progress: 0,
      createdAt: new Date().toISOString()
    }

    this.performanceData.goals.push(goal)
    const employee = this.performanceData.employees.find(e => e.id === employeeId)
    if (employee) {
      employee.goals.push(goal.id)
    }
    this.savePerformanceData()
    return goal
  }

  updateGoalProgress(goalId, progress) {
    const goal = this.performanceData.goals.find(g => g.id === goalId)
    if (!goal) throw new Error('Goal not found')

    goal.progress = Math.min(Math.max(progress, 0), 100)
    if (goal.progress === 100) {
      goal.status = 'completed'
    }
    this.savePerformanceData()
    return goal
  }

  addReview(employeeId, reviewData) {
    const review = {
      id: `review_${Date.now()}`,
      employeeId,
      type: reviewData.type,
      period: reviewData.period,
      overallScore: reviewData.overallScore,
      strengths: reviewData.strengths || [],
      areasForImprovement: reviewData.areasForImprovement || [],
      goals: reviewData.goals || [],
      feedback: reviewData.feedback,
      reviewedBy: reviewData.reviewedBy,
      date: new Date().toISOString()
    }

    this.performanceData.reviews.push(review)
    const employee = this.performanceData.employees.find(e => e.id === employeeId)
    if (employee) {
      employee.reviews.push(review.id)
      employee.lastReview = review.date
      employee.performanceScore = review.overallScore
    }
    this.savePerformanceData()
    return review
  }

  addFeedback(employeeId, feedbackData) {
    const feedback = {
      id: `feedback_${Date.now()}`,
      employeeId,
      from: feedbackData.from,
      type: feedbackData.type,
      content: feedbackData.content,
      category: feedbackData.category,
      date: new Date().toISOString()
    }

    this.performanceData.feedback.push(feedback)
    const employee = this.performanceData.employees.find(e => e.id === employeeId)
    if (employee) {
      employee.feedback.push(feedback.id)
    }
    this.savePerformanceData()
    return feedback
  }

  getEmployeePerformance(employeeId) {
    const employee = this.performanceData.employees.find(e => e.id === employeeId)
    if (!employee) return null

    const goals = this.performanceData.goals.filter(g => g.employeeId === employeeId)
    const reviews = this.performanceData.reviews.filter(r => r.employeeId === employeeId)
    const feedback = this.performanceData.feedback.filter(f => f.employeeId === employeeId)

    return {
      employee,
      goals,
      reviews,
      feedback,
      performanceScore: employee.performanceScore,
      lastReview: employee.lastReview
    }
  }

  getPerformanceAnalytics() {
    const totalEmployees = this.performanceData.employees.length
    const employeesWithReviews = this.performanceData.employees.filter(e => e.performanceScore !== null).length
    const avgPerformanceScore = this.performanceData.employees
      .filter(e => e.performanceScore !== null)
      .reduce((sum, e) => sum + e.performanceScore, 0) / employeesWithReviews || 0

    const totalGoals = this.performanceData.goals.length
    const completedGoals = this.performanceData.goals.filter(g => g.status === 'completed').length
    const avgGoalProgress = this.performanceData.goals.length > 0
      ? this.performanceData.goals.reduce((sum, g) => sum + g.progress, 0) / this.performanceData.goals.length
      : 0

    return {
      totalEmployees,
      employeesWithReviews,
      reviewCoverage: totalEmployees > 0 ? (employeesWithReviews / totalEmployees) * 100 : 0,
      avgPerformanceScore: Math.round(avgPerformanceScore),
      totalGoals,
      completedGoals,
      goalCompletionRate: totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0,
      avgGoalProgress: Math.round(avgGoalProgress)
    }
  }
}

