import { useState, useEffect } from 'react'
import { 
  BarChart3, TrendingUp, AlertTriangle, Users, Target, Clock, 
  CheckCircle, XCircle, DollarSign, Calendar, Award, Zap, TrendingDown
} from 'lucide-react'
import Card from '../components/Card'
import StatCard from '../components/StatCard'
import Badge from '../components/Badge'
import { LineChartComponent, BarChartComponent, PieChartComponent, AreaChartComponent } from '../components/Chart'
import Tabs from '../components/Tabs'

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('6m')
  const [selectedMetric, setSelectedMetric] = useState('all')

  const metrics = {
    totalHires: 12,
    successRate: 85,
    avgFitScore: 78,
    misHireAlerts: 2,
    avgTimeToHire: 28,
    offerAcceptanceRate: 92,
    costPerHire: 4200,
    candidateQuality: 82,
  }

  const hiringTrend = [
    { month: 'Jan', hires: 2, interviews: 15, offers: 3 },
    { month: 'Feb', hires: 1, interviews: 12, offers: 2 },
    { month: 'Mar', hires: 3, interviews: 18, offers: 4 },
    { month: 'Apr', hires: 2, interviews: 20, offers: 3 },
    { month: 'May', hires: 2, interviews: 16, offers: 3 },
    { month: 'Jun', hires: 2, interviews: 14, offers: 2 },
  ]

  const fitScoreDistribution = [
    { range: '90-100', count: 5 },
    { range: '80-89', count: 8 },
    { range: '70-79', count: 12 },
    { range: '60-69', count: 7 },
    { range: 'Below 60', count: 3 },
  ]

  const rolePerformance = [
    { role: 'Engineers', avgScore: 82, hires: 5, success: 95 },
    { role: 'Product', avgScore: 78, hires: 3, success: 85 },
    { role: 'Sales', avgScore: 75, hires: 2, success: 80 },
    { role: 'Design', avgScore: 88, hires: 2, success: 100 },
  ]

  const pipelineHealth = [
    { name: 'Applied', value: 45 },
    { name: 'Screening', value: 28 },
    { name: 'Interview', value: 15 },
    { name: 'Offer', value: 8 },
    { name: 'Hired', value: 4 },
  ]

  const predictiveInsights = [
    {
      type: 'risk',
      severity: 'high',
      title: 'Culture Misalignment Risk',
      description: '2 candidates in final rounds show potential culture misalignment based on values assessment',
      recommendation: 'Conduct additional culture-fit interviews',
      impact: 'High risk of early turnover',
    },
    {
      type: 'opportunity',
      severity: 'high',
      title: 'Exceptional Candidates',
      description: '3 candidates have 85%+ fit scores with strong stage-fit and growth potential',
      recommendation: 'Fast-track these candidates to prevent losing them',
      impact: 'High success probability',
    },
    {
      type: 'warning',
      severity: 'medium',
      title: 'Slow Hiring Velocity',
      description: 'Average time-to-hire increased by 15% this month',
      recommendation: 'Review interview scheduling and decision-making process',
      impact: 'May lose top candidates to competitors',
    },
    {
      type: 'success',
      severity: 'low',
      title: 'Strong Offer Acceptance',
      description: '92% offer acceptance rate, above industry benchmark of 85%',
      recommendation: 'Continue current compensation and culture strategy',
      impact: 'Positive hiring efficiency',
    },
  ]

  const outcomeTracking = [
    { 
      hire: 'John Doe',
      role: 'Senior Engineer',
      predictedScore: 82,
      actualPerformance: 85,
      accuracy: 96,
      status: 'success',
    },
    { 
      hire: 'Jane Smith',
      role: 'Product Manager',
      predictedScore: 78,
      actualPerformance: 75,
      accuracy: 96,
      status: 'success',
    },
    { 
      hire: 'Mike Johnson',
      role: 'Sales Lead',
      predictedScore: 75,
      actualPerformance: 60,
      accuracy: 80,
      status: 'at-risk',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-3">
            Analytics & Predictions
          </h1>
          <p className="text-gray-600 text-lg">Hiring performance, predictive insights, and outcome tracking</p>
        </div>
        <div className="flex gap-3">
          {['1m', '3m', '6m', '1y', 'all'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                timeRange === range
                  ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-medium'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {range.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Total Hires" 
          value={metrics.totalHires} 
          icon={Users} 
          color="primary"
          trend="up"
          trendValue="+15%"
        />
        <StatCard 
          title="Success Rate" 
          value={`${metrics.successRate}%`} 
          icon={CheckCircle} 
          color="success"
          trend="up"
          trendValue="+8%"
        />
        <StatCard 
          title="Avg Fit Score" 
          value={`${metrics.avgFitScore}%`} 
          icon={BarChart3} 
          color="secondary"
          trend="up"
          trendValue="+3%"
        />
        <StatCard 
          title="Mis-Hire Alerts" 
          value={metrics.misHireAlerts} 
          icon={AlertTriangle} 
          color="danger"
        />
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Avg Time to Hire</p>
            <Clock className="h-5 w-5 text-primary-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{metrics.avgTimeToHire} days</p>
          <p className="text-xs text-gray-500 mt-1">Industry avg: 36 days</p>
        </Card>
        <Card>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Offer Acceptance</p>
            <Award className="h-5 w-5 text-success-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{metrics.offerAcceptanceRate}%</p>
          <p className="text-xs text-gray-500 mt-1">Industry avg: 85%</p>
        </Card>
        <Card>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Cost Per Hire</p>
            <DollarSign className="h-5 w-5 text-warning-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">${metrics.costPerHire}</p>
          <p className="text-xs text-gray-500 mt-1">23% below benchmark</p>
        </Card>
        <Card>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Candidate Quality</p>
            <Zap className="h-5 w-5 text-secondary-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{metrics.candidateQuality}%</p>
          <p className="text-xs text-gray-500 mt-1">Above target</p>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-primary-600" />
            Hiring Trends (6 Months)
          </h3>
          <LineChartComponent 
            data={hiringTrend}
            lines={[
              { dataKey: 'hires' },
              { dataKey: 'interviews' },
              { dataKey: 'offers' }
            ]}
            xAxisKey="month"
            height={250}
          />
        </Card>

        <Card>
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-secondary-600" />
            Fit Score Distribution
          </h3>
          <BarChartComponent 
            data={fitScoreDistribution}
            dataKey="count"
            xAxisKey="range"
            color="#a855f7"
            height={250}
          />
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Target className="h-5 w-5 mr-2 text-success-600" />
            Pipeline Health
          </h3>
          <PieChartComponent 
            data={pipelineHealth}
            dataKey="value"
            nameKey="name"
            height={250}
          />
        </Card>

        <Card>
          <h3 className="text-xl font-bold mb-4">Role Performance Analysis</h3>
          <div className="space-y-4">
            {rolePerformance.map((role, i) => (
              <div key={i} className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-gray-900">{role.role}</h4>
                    <p className="text-sm text-gray-600">{role.hires} hires</p>
                  </div>
                  <Badge variant={role.success >= 90 ? 'success' : 'warning'}>
                    {role.success}% success
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Avg Score:</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary-600 to-secondary-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${role.avgScore}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-primary-600">{role.avgScore}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mb-8">
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <AlertTriangle className="h-6 w-6 mr-2 text-warning-600" />
          Predictive Insights & Recommendations
        </h3>
        <div className="space-y-4">
          {predictiveInsights.map((insight, i) => (
            <div 
              key={i}
              className={`p-5 rounded-xl border-l-4 ${
                insight.type === 'risk' ? 'bg-danger-50 border-danger-500' :
                insight.type === 'warning' ? 'bg-warning-50 border-warning-500' :
                insight.type === 'opportunity' ? 'bg-primary-50 border-primary-500' :
                'bg-success-50 border-success-500'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${
                  insight.type === 'risk' ? 'bg-danger-100' :
                  insight.type === 'warning' ? 'bg-warning-100' :
                  insight.type === 'opportunity' ? 'bg-primary-100' :
                  'bg-success-100'
                }`}>
                  {insight.type === 'risk' ? <XCircle className="h-6 w-6 text-danger-600" /> :
                   insight.type === 'warning' ? <AlertTriangle className="h-6 w-6 text-warning-600" /> :
                   insight.type === 'opportunity' ? <TrendingUp className="h-6 w-6 text-primary-600" /> :
                   <CheckCircle className="h-6 w-6 text-success-600" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-lg text-gray-900">{insight.title}</h4>
                    <Badge variant={
                      insight.severity === 'high' ? 'danger' :
                      insight.severity === 'medium' ? 'warning' : 'success'
                    }>
                      {insight.severity} priority
                    </Badge>
                  </div>
                  <p className="text-gray-700 mb-3">{insight.description}</p>
                  <div className="grid md:grid-cols-2 gap-4 mt-3">
                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-xs font-medium text-gray-500 mb-1">Recommendation</p>
                      <p className="text-sm text-gray-800">{insight.recommendation}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-xs font-medium text-gray-500 mb-1">Impact</p>
                      <p className="text-sm text-gray-800">{insight.impact}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <Award className="h-6 w-6 mr-2 text-success-600" />
          Outcome Feedback Loop & Prediction Accuracy
        </h3>
        <p className="text-gray-600 mb-6">Track how well our predictions match actual employee performance to continuously improve the model</p>
        <div className="space-y-4">
          {outcomeTracking.map((item, i) => (
            <div key={i} className="p-5 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-medium transition-all">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-bold text-lg text-gray-900">{item.hire}</h4>
                  <p className="text-sm text-gray-600">{item.role}</p>
                </div>
                <Badge variant={item.status === 'success' ? 'success' : 'warning'}>
                  {item.status === 'success' ? 'Performing Well' : 'At Risk'}
                </Badge>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-3 bg-primary-50 rounded-lg">
                  <p className="text-xs font-medium text-primary-600 mb-1">Predicted Fit Score</p>
                  <p className="text-2xl font-bold text-primary-700">{item.predictedScore}%</p>
                </div>
                <div className="p-3 bg-secondary-50 rounded-lg">
                  <p className="text-xs font-medium text-secondary-600 mb-1">Actual Performance</p>
                  <p className="text-2xl font-bold text-secondary-700">{item.actualPerformance}%</p>
                </div>
                <div className="p-3 bg-success-50 rounded-lg">
                  <p className="text-xs font-medium text-success-600 mb-1">Prediction Accuracy</p>
                  <p className="text-2xl font-bold text-success-700">{item.accuracy}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
          <div className="flex items-center gap-3">
            <Zap className="h-5 w-5 text-primary-600" />
            <div>
              <p className="font-medium text-primary-900">Model Learning Active</p>
              <p className="text-sm text-primary-700">System is continuously learning from outcomes to improve future predictions</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}


