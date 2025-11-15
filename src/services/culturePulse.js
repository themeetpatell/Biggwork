export class CulturePulse {
  constructor() {
    this.pulseData = this.loadPulseData()
  }

  loadPulseData() {
    const saved = localStorage.getItem('peopleos_culture_pulse')
    if (saved) return JSON.parse(saved)

    return {
      overallHealth: 82,
      lastUpdate: new Date().toISOString(),
      metrics: {
        alignment: 85,
        engagement: 78,
        velocity: 88,
        satisfaction: 80,
        collaboration: 82,
        innovation: 75,
        ownership: 90,
        communication: 77
      },
      trends: {
        alignment: 'up',
        engagement: 'stable',
        velocity: 'up',
        satisfaction: 'down',
        collaboration: 'stable',
        innovation: 'up',
        ownership: 'up',
        communication: 'stable'
      },
      alerts: [
        {
          id: 'alert_1',
          type: 'warning',
          severity: 'medium',
          metric: 'satisfaction',
          title: 'Satisfaction Score Declining',
          description: 'Team satisfaction dropped 5% in last 30 days',
          recommendation: 'Schedule team retrospective and gather feedback',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'alert_2',
          type: 'positive',
          severity: 'low',
          metric: 'ownership',
          title: 'Ownership Mindset Strengthening',
          description: 'Team members showing increased ownership behavior',
          recommendation: 'Recognize and celebrate ownership wins',
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
        }
      ],
      feedback: [
        {
          id: 'fb_1',
          type: 'anonymous',
          sentiment: 'positive',
          category: 'culture',
          content: 'Love the builder mindset focus and the autonomy we have',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'fb_2',
          type: 'anonymous',
          sentiment: 'concern',
          category: 'workload',
          content: 'Pace is intense, need better work-life balance',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'fb_3',
          type: 'anonymous',
          sentiment: 'positive',
          category: 'team',
          content: 'Great collaboration across teams, everyone helps each other',
          timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
        }
      ],
      history: this.generateHistoricalData()
    }
  }

  generateHistoricalData() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    return months.map((month, i) => ({
      month,
      alignment: 75 + i * 2,
      engagement: 70 + i * 1.5,
      velocity: 82 + i,
      satisfaction: 85 - i * 0.5,
      overallHealth: 78 + i * 0.8
    }))
  }

  savePulseData() {
    localStorage.setItem('peopleos_culture_pulse', JSON.stringify(this.pulseData))
  }

  getOverallHealth() {
    return this.pulseData.overallHealth
  }

  getMetrics() {
    return this.pulseData.metrics
  }

  getTrends() {
    return this.pulseData.trends
  }

  getAlerts() {
    return this.pulseData.alerts.sort((a, b) => {
      const severityOrder = { high: 0, medium: 1, low: 2 }
      return severityOrder[a.severity] - severityOrder[b.severity]
    })
  }

  getFeedback() {
    return this.pulseData.feedback
  }

  getHistory() {
    return this.pulseData.history
  }

  addFeedback(feedbackData) {
    const feedback = {
      id: `fb_${Date.now()}`,
      type: feedbackData.anonymous ? 'anonymous' : 'named',
      sentiment: this.analyzeSentiment(feedbackData.content),
      category: feedbackData.category,
      content: feedbackData.content,
      timestamp: new Date().toISOString()
    }

    this.pulseData.feedback.unshift(feedback)
    this.recalculateHealth()
    this.savePulseData()
    return feedback
  }

  analyzeSentiment(content) {
    const lowerContent = content.toLowerCase()
    
    const positiveWords = ['love', 'great', 'excellent', 'amazing', 'awesome', 'happy', 'good', 'best']
    const negativeWords = ['bad', 'poor', 'worse', 'terrible', 'awful', 'need', 'lacking', 'missing']
    
    const positiveCount = positiveWords.filter(word => lowerContent.includes(word)).length
    const negativeCount = negativeWords.filter(word => lowerContent.includes(word)).length

    if (positiveCount > negativeCount) return 'positive'
    if (negativeCount > positiveCount) return 'concern'
    return 'neutral'
  }

  recalculateHealth() {
    const metrics = this.pulseData.metrics
    const values = Object.values(metrics)
    const avg = values.reduce((sum, val) => sum + val, 0) / values.length

    this.pulseData.overallHealth = Math.round(avg)
    this.pulseData.lastUpdate = new Date().toISOString()
  }

  updateMetric(metricName, value) {
    if (this.pulseData.metrics[metricName] !== undefined) {
      const oldValue = this.pulseData.metrics[metricName]
      this.pulseData.metrics[metricName] = value

      const diff = value - oldValue
      if (diff > 5) {
        this.pulseData.trends[metricName] = 'up'
      } else if (diff < -5) {
        this.pulseData.trends[metricName] = 'down'
      } else {
        this.pulseData.trends[metricName] = 'stable'
      }

      this.checkForAlerts(metricName, value, oldValue)
      this.recalculateHealth()
      this.savePulseData()
    }
  }

  checkForAlerts(metricName, newValue, oldValue) {
    if (newValue < 70 && oldValue >= 70) {
      this.addAlert({
        type: 'warning',
        severity: 'high',
        metric: metricName,
        title: `${metricName.charAt(0).toUpperCase() + metricName.slice(1)} Below Threshold`,
        description: `${metricName} has dropped below 70%`,
        recommendation: `Immediate action needed to address ${metricName} concerns`
      })
    } else if (newValue < 75 && oldValue >= 75) {
      this.addAlert({
        type: 'warning',
        severity: 'medium',
        metric: metricName,
        title: `${metricName.charAt(0).toUpperCase() + metricName.slice(1)} Declining`,
        description: `${metricName} has dropped below 75%`,
        recommendation: `Monitor and gather feedback on ${metricName}`
      })
    }
  }

  addAlert(alertData) {
    const alert = {
      id: `alert_${Date.now()}`,
      type: alertData.type,
      severity: alertData.severity,
      metric: alertData.metric,
      title: alertData.title,
      description: alertData.description,
      recommendation: alertData.recommendation,
      timestamp: new Date().toISOString(),
      resolved: false
    }

    this.pulseData.alerts.unshift(alert)
    this.savePulseData()
    return alert
  }

  resolveAlert(alertId) {
    const alert = this.pulseData.alerts.find(a => a.id === alertId)
    if (alert) {
      alert.resolved = true
      alert.resolvedAt = new Date().toISOString()
      this.savePulseData()
    }
  }

  getDepartmentBreakdown() {
    return {
      Engineering: { health: 85, alignment: 88, engagement: 82, size: 12 },
      Product: { health: 78, alignment: 80, engagement: 75, size: 5 },
      Design: { health: 90, alignment: 92, engagement: 88, size: 3 },
      Sales: { health: 72, alignment: 70, engagement: 74, size: 8 },
      Operations: { health: 80, alignment: 82, engagement: 78, size: 4 }
    }
  }

  getInsights() {
    const metrics = this.pulseData.metrics
    const trends = this.pulseData.trends
    const insights = []

    const upTrends = Object.entries(trends).filter(([_, trend]) => trend === 'up')
    if (upTrends.length >= 3) {
      insights.push({
        type: 'positive',
        title: 'Positive Momentum',
        description: `${upTrends.length} key metrics trending upward`,
        icon: 'TrendingUp'
      })
    }

    const lowMetrics = Object.entries(metrics).filter(([_, value]) => value < 75)
    if (lowMetrics.length > 0) {
      insights.push({
        type: 'warning',
        title: 'Attention Needed',
        description: `${lowMetrics.length} metrics below target threshold`,
        icon: 'AlertTriangle'
      })
    }

    if (metrics.ownership >= 85) {
      insights.push({
        type: 'success',
        title: 'Strong Builder Culture',
        description: 'Team demonstrating excellent ownership mindset',
        icon: 'Award'
      })
    }

    if (metrics.velocity >= 85) {
      insights.push({
        type: 'success',
        title: 'High Velocity',
        description: 'Team executing at exceptional pace',
        icon: 'Zap'
      })
    }

    return insights
  }

  getSentimentAnalysis() {
    const feedback = this.pulseData.feedback
    const sentiments = feedback.reduce((acc, fb) => {
      acc[fb.sentiment] = (acc[fb.sentiment] || 0) + 1
      return acc
    }, {})

    const total = feedback.length
    return {
      positive: Math.round(((sentiments.positive || 0) / total) * 100),
      neutral: Math.round(((sentiments.neutral || 0) / total) * 100),
      concern: Math.round(((sentiments.concern || 0) / total) * 100),
      totalFeedback: total
    }
  }

  getCategoryBreakdown() {
    const feedback = this.pulseData.feedback
    const categories = feedback.reduce((acc, fb) => {
      acc[fb.category] = (acc[fb.category] || 0) + 1
      return acc
    }, {})

    return Object.entries(categories).map(([name, value]) => ({ name, value }))
  }
}

