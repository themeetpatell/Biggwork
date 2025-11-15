import { useState, useEffect } from 'react'
import { CulturePulse } from '../services/culturePulse'
import { 
  Activity, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, 
  MessageSquare, Award, Zap, Users, Heart, Target, BarChart3
} from 'lucide-react'
import Card from '../components/Card'
import StatCard from '../components/StatCard'
import Badge from '../components/Badge'
import { LineChartComponent, PieChartComponent, BarChartComponent } from '../components/Chart'

export default function CulturePulsePage() {
  const [pulseService] = useState(() => new CulturePulse())
  const [health, setHealth] = useState(0)
  const [metrics, setMetrics] = useState({})
  const [trends, setTrends] = useState({})
  const [alerts, setAlerts] = useState([])
  const [feedback, setFeedback] = useState([])
  const [history, setHistory] = useState([])
  const [insights, setInsights] = useState([])
  const [departments, setDepartments] = useState({})
  const [sentiment, setSentiment] = useState({})
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [feedbackForm, setFeedbackForm] = useState({
    content: '',
    category: 'culture',
    anonymous: true
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    setHealth(pulseService.getOverallHealth())
    setMetrics(pulseService.getMetrics())
    setTrends(pulseService.getTrends())
    setAlerts(pulseService.getAlerts())
    setFeedback(pulseService.getFeedback())
    setHistory(pulseService.getHistory())
    setInsights(pulseService.getInsights())
    setDepartments(pulseService.getDepartmentBreakdown())
    setSentiment(pulseService.getSentimentAnalysis())
  }

  const handleSubmitFeedback = () => {
    if (!feedbackForm.content.trim()) return

    pulseService.addFeedback(feedbackForm)
    setFeedbackForm({ content: '', category: 'culture', anonymous: true })
    setShowFeedbackForm(false)
    loadData()
  }

  const handleResolveAlert = (alertId) => {
    pulseService.resolveAlert(alertId)
    loadData()
  }

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-success-600" />
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-danger-600" />
    return <div className="h-4 w-4 bg-gray-400 rounded-full" />
  }

  const getHealthColor = (value) => {
    if (value >= 80) return 'success'
    if (value >= 70) return 'warning'
    return 'danger'
  }

  const getInsightIcon = (iconName) => {
    const icons = {
      TrendingUp: TrendingUp,
      AlertTriangle: AlertTriangle,
      Award: Award,
      Zap: Zap
    }
    const Icon = icons[iconName] || Activity
    return <Icon className="h-6 w-6" />
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-3">
          Culture Pulse
        </h1>
        <p className="text-gray-600 text-lg">Real-time organizational health monitoring and culture analytics</p>
      </div>

      <div className="mb-8 p-8 bg-gradient-to-br from-primary-50 via-white to-secondary-50 rounded-2xl border border-primary-200 shadow-lg">
        <div className="text-center mb-6">
          <p className="text-sm text-gray-600 mb-2">Overall Culture Health</p>
          <div className="relative inline-block">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#e5e7eb"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke={health >= 80 ? '#10b981' : health >= 70 ? '#f59e0b' : '#ef4444'}
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${(health / 100) * 439.6} 439.6`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-5xl font-bold text-gray-900">{health}%</p>
                <p className="text-sm text-gray-500">Health Score</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          {insights.map((insight, i) => (
            <Badge
              key={i}
              variant={
                insight.type === 'positive' ? 'success' :
                insight.type === 'success' ? 'primary' :
                'warning'
              }
              size="lg"
            >
              {insight.title}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Alignment"
          value={`${metrics.alignment || 0}%`}
          icon={Target}
          color={getHealthColor(metrics.alignment)}
          trend={trends.alignment === 'up' ? 'up' : trends.alignment === 'down' ? 'down' : null}
        />
        <StatCard
          title="Engagement"
          value={`${metrics.engagement || 0}%`}
          icon={Heart}
          color={getHealthColor(metrics.engagement)}
          trend={trends.engagement === 'up' ? 'up' : trends.engagement === 'down' ? 'down' : null}
        />
        <StatCard
          title="Velocity"
          value={`${metrics.velocity || 0}%`}
          icon={Zap}
          color={getHealthColor(metrics.velocity)}
          trend={trends.velocity === 'up' ? 'up' : trends.velocity === 'down' ? 'down' : null}
        />
        <StatCard
          title="Ownership"
          value={`${metrics.ownership || 0}%`}
          icon={Award}
          color={getHealthColor(metrics.ownership)}
          trend={trends.ownership === 'up' ? 'up' : trends.ownership === 'down' ? 'down' : null}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-primary-600" />
            Culture Metrics Breakdown
          </h2>
          <div className="space-y-4">
            {Object.entries(metrics).map(([key, value]) => (
              <div key={key}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700 capitalize">{key}</span>
                    {getTrendIcon(trends[key])}
                  </div>
                  <span className="text-sm font-bold text-gray-900">{value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      value >= 80 ? 'bg-gradient-to-r from-success-500 to-success-600' :
                      value >= 70 ? 'bg-gradient-to-r from-warning-500 to-warning-600' :
                      'bg-gradient-to-r from-danger-500 to-danger-600'
                    }`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-secondary-600" />
            Health Trends (6 Months)
          </h2>
          <LineChartComponent
            data={history}
            lines={[
              { dataKey: 'alignment', name: 'Alignment' },
              { dataKey: 'engagement', name: 'Engagement' },
              { dataKey: 'velocity', name: 'Velocity' },
              { dataKey: 'overallHealth', name: 'Overall' }
            ]}
            xAxisKey="month"
            height={250}
          />
        </Card>
      </div>

      {alerts.filter(a => !a.resolved).length > 0 && (
        <Card className="mb-8 bg-warning-50 border border-warning-200">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-warning-600" />
            Active Alerts ({alerts.filter(a => !a.resolved).length})
          </h2>
          <div className="space-y-3">
            {alerts.filter(a => !a.resolved).map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border-l-4 ${
                  alert.severity === 'high' ? 'bg-danger-50 border-danger-500' :
                  alert.severity === 'medium' ? 'bg-warning-50 border-warning-500' :
                  'bg-primary-50 border-primary-500'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900">{alert.title}</h3>
                      <Badge
                        variant={
                          alert.severity === 'high' ? 'danger' :
                          alert.severity === 'medium' ? 'warning' : 'primary'
                        }
                        size="sm"
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{alert.description}</p>
                    <p className="text-sm text-gray-600 font-medium">
                      💡 {alert.recommendation}
                    </p>
                  </div>
                  <button
                    onClick={() => handleResolveAlert(alert.id)}
                    className="px-3 py-1 bg-white text-gray-700 text-sm rounded hover:bg-gray-100 border"
                  >
                    Resolve
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  {new Date(alert.timestamp).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2 text-primary-600" />
            Department Health Breakdown
          </h2>
          <div className="space-y-3">
            {Object.entries(departments).map(([dept, data]) => (
              <div key={dept} className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900">{dept}</h3>
                    <p className="text-sm text-gray-600">{data.size} members</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary-600">{data.health}%</p>
                    <p className="text-xs text-gray-500">health</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center justify-between px-2 py-1 bg-primary-50 rounded">
                    <span className="text-gray-600">Alignment</span>
                    <span className="font-bold text-primary-700">{data.alignment}%</span>
                  </div>
                  <div className="flex items-center justify-between px-2 py-1 bg-secondary-50 rounded">
                    <span className="text-gray-600">Engagement</span>
                    <span className="font-bold text-secondary-700">{data.engagement}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-secondary-600" />
            Sentiment Analysis
          </h2>
          <div className="mb-6">
            <PieChartComponent
              data={[
                { name: 'Positive', value: sentiment.positive || 0 },
                { name: 'Neutral', value: sentiment.neutral || 0 },
                { name: 'Concern', value: sentiment.concern || 0 }
              ]}
              dataKey="value"
              nameKey="name"
              height={200}
            />
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-success-50 rounded-lg">
              <p className="text-2xl font-bold text-success-700">{sentiment.positive}%</p>
              <p className="text-xs text-gray-600">Positive</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-700">{sentiment.neutral}%</p>
              <p className="text-xs text-gray-600">Neutral</p>
            </div>
            <div className="p-3 bg-warning-50 rounded-lg">
              <p className="text-2xl font-bold text-warning-700">{sentiment.concern}%</p>
              <p className="text-xs text-gray-600">Concerns</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-indigo-600" />
            Recent Feedback ({feedback.length})
          </h2>
          <button
            onClick={() => setShowFeedbackForm(true)}
            className="px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            Submit Feedback
          </button>
        </div>
        <div className="space-y-3">
          {feedback.slice(0, 10).map((fb) => (
            <div
              key={fb.id}
              className={`p-4 rounded-lg border-l-4 ${
                fb.sentiment === 'positive' ? 'bg-success-50 border-success-500' :
                fb.sentiment === 'concern' ? 'bg-warning-50 border-warning-500' :
                'bg-gray-50 border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      fb.sentiment === 'positive' ? 'success' :
                      fb.sentiment === 'concern' ? 'warning' : 'gray'
                    }
                    size="sm"
                  >
                    {fb.sentiment}
                  </Badge>
                  <Badge variant="gray" size="sm">{fb.category}</Badge>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(fb.timestamp).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-700">{fb.content}</p>
              <p className="text-xs text-gray-500 mt-1">{fb.type}</p>
            </div>
          ))}
        </div>
      </Card>

      {showFeedbackForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Submit Anonymous Feedback</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={feedbackForm.category}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="culture">Culture</option>
                  <option value="workload">Workload</option>
                  <option value="team">Team</option>
                  <option value="leadership">Leadership</option>
                  <option value="process">Process</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Your Feedback</label>
                <textarea
                  value={feedbackForm.content}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, content: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows="5"
                  placeholder="Share your thoughts..."
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={feedbackForm.anonymous}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, anonymous: e.target.checked })}
                  className="mr-2"
                />
                <label className="text-sm">Submit anonymously</label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSubmitFeedback}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:shadow-lg"
              >
                Submit
              </button>
              <button
                onClick={() => setShowFeedbackForm(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

