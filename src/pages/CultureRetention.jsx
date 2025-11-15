import { useState } from 'react'
import { 
  Users, TrendingUp, AlertCircle, Heart, Target, Zap, MessageSquare,
  Award, TrendingDown, CheckCircle, BarChart3, Shield, Clock, Calendar,
  ThumbsUp, Activity, Gift, Bell, ChevronRight, Filter, Search
} from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
import StatCard from '../components/StatCard'
import ProgressBar from '../components/ProgressBar'
import Tabs from '../components/Tabs'
import { LineChartComponent, AreaChartComponent, PieChartComponent } from '../components/Chart'

export default function CultureRetention() {
  const [selectedTab, setSelectedTab] = useState('overview')
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Retention risk data with detailed employee profiles
  const employeeRisks = [
    { 
      id: 1, 
      name: 'Sarah Chen', 
      role: 'Senior Engineer',
      department: 'Engineering',
      tenure: 18,
      riskLevel: 'low', 
      riskScore: 15,
      engagementScore: 92,
      cultureAlignment: 95,
      performanceScore: 90,
      lastPulse: '2 days ago',
      lastOneOnOne: '1 week ago',
      trends: { engagement: 'up', performance: 'up', alignment: 'same' },
      strengths: ['High performer', 'Cultural champion', 'Team player'],
      concerns: []
    },
    { 
      id: 2, 
      name: 'Mike Johnson', 
      role: 'Product Manager',
      department: 'Product',
      tenure: 8,
      riskLevel: 'high', 
      riskScore: 78,
      engagementScore: 45,
      cultureAlignment: 52,
      performanceScore: 65,
      lastPulse: '1 week ago',
      lastOneOnOne: '3 weeks ago',
      trends: { engagement: 'down', performance: 'down', alignment: 'down' },
      riskFactors: ['Declining engagement', 'Missed pulse surveys', 'Low alignment scores', 'No recent 1-on-1'],
      strengths: ['Strong product skills'],
      concerns: ['Burnout risk', 'Cultural misfit', 'Manager relationship']
    },
    { 
      id: 3, 
      name: 'Emma Wilson', 
      role: 'Designer',
      department: 'Design',
      tenure: 14,
      riskLevel: 'medium', 
      riskScore: 42,
      engagementScore: 68,
      cultureAlignment: 70,
      performanceScore: 80,
      lastPulse: '4 days ago',
      lastOneOnOne: '2 weeks ago',
      trends: { engagement: 'same', performance: 'up', alignment: 'down' },
      riskFactors: ['Culture alignment declining', 'Career growth concerns'],
      strengths: ['High performer', 'Creative problem solver'],
      concerns: ['Seeking growth opportunities']
    },
    { 
      id: 4, 
      name: 'Alex Turner', 
      role: 'Engineering Lead',
      department: 'Engineering',
      tenure: 24,
      riskLevel: 'low', 
      riskScore: 12,
      engagementScore: 95,
      cultureAlignment: 93,
      performanceScore: 95,
      lastPulse: '1 day ago',
      lastOneOnOne: '3 days ago',
      trends: { engagement: 'up', performance: 'up', alignment: 'up' },
      strengths: ['Leadership', 'Mentor', 'High impact', 'Culture carrier'],
      concerns: []
    },
    { 
      id: 5, 
      name: 'Lisa Brown', 
      role: 'Marketing Manager',
      department: 'Marketing',
      tenure: 10,
      riskLevel: 'medium', 
      riskScore: 35,
      engagementScore: 72,
      cultureAlignment: 75,
      performanceScore: 78,
      lastPulse: '3 days ago',
      lastOneOnOne: '1 week ago',
      trends: { engagement: 'same', performance: 'same', alignment: 'same' },
      riskFactors: ['Workload concerns'],
      strengths: ['Results-driven', 'Team builder'],
      concerns: ['Work-life balance']
    },
  ]

  // Pulse survey trend data (6 months)
  const pulseHistory = [
    { month: 'Jan', engagement: 85, alignment: 88, satisfaction: 82, velocity: 83 },
    { month: 'Feb', engagement: 87, alignment: 86, satisfaction: 84, velocity: 85 },
    { month: 'Mar', engagement: 89, alignment: 90, satisfaction: 87, velocity: 88 },
    { month: 'Apr', engagement: 88, alignment: 92, satisfaction: 86, velocity: 89 },
    { month: 'May', engagement: 90, alignment: 91, satisfaction: 88, velocity: 90 },
    { month: 'Jun', engagement: 92, alignment: 93, satisfaction: 90, velocity: 92 },
  ]

  // Retention strategies with impact metrics
  const retentionStrategies = [
    {
      id: 1,
      title: 'Immediate 1-on-1 with High-Risk Employees',
      description: 'Schedule urgent conversations with Mike Johnson and address concerns',
      priority: 'critical',
      impact: 'High - Prevent immediate departure',
      targetEmployees: ['Mike Johnson'],
      estimatedImpact: 85,
      timeframe: 'This week',
      actions: ['Schedule meeting', 'Prepare talking points', 'Identify solutions'],
      icon: MessageSquare,
      color: 'danger'
    },
    {
      id: 2,
      title: 'Career Development Plans',
      description: 'Create growth paths for employees showing stagnation concerns',
      priority: 'high',
      impact: 'Medium-High retention improvement',
      targetEmployees: ['Emma Wilson', 'Lisa Brown'],
      estimatedImpact: 70,
      timeframe: 'This month',
      actions: ['Career mapping session', 'Set development goals', 'Mentorship pairing'],
      icon: Target,
      color: 'warning'
    },
    {
      id: 3,
      title: 'Culture Immersion Workshops',
      description: 'Monthly builder mindset reinforcement and values alignment sessions',
      priority: 'medium',
      impact: 'Improved long-term alignment',
      targetEmployees: 'All team',
      estimatedImpact: 60,
      timeframe: 'Ongoing',
      actions: ['Schedule quarterly workshops', 'Invite guest speakers', 'Team activities'],
      icon: Users,
      color: 'primary'
    },
    {
      id: 4,
      title: 'Recognition & Rewards Program',
      description: 'Implement peer-to-peer recognition system and achievement celebrations',
      priority: 'medium',
      impact: 'Increased engagement & morale',
      targetEmployees: 'All team',
      estimatedImpact: 65,
      timeframe: 'Next quarter',
      actions: ['Set up recognition platform', 'Define reward tiers', 'Launch campaign'],
      icon: Award,
      color: 'success'
    },
    {
      id: 5,
      title: 'Flexible Work Arrangements',
      description: 'Offer hybrid/remote options to improve work-life balance',
      priority: 'low',
      impact: 'Work-life balance improvement',
      targetEmployees: ['Lisa Brown'],
      estimatedImpact: 50,
      timeframe: 'Next month',
      actions: ['Policy review', 'Trial period', 'Feedback collection'],
      icon: Zap,
      color: 'secondary'
    },
  ]

  // Early warning signals with severity
  const earlyWarnings = [
    {
      employee: 'Mike Johnson',
      signal: 'Engagement dropped 40% in last month',
      severity: 'critical',
      action: 'Immediate intervention needed',
      icon: AlertCircle,
      daysAgo: 0,
      category: 'engagement'
    },
    {
      employee: 'Mike Johnson',
      signal: 'No 1-on-1 meeting in 3 weeks',
      severity: 'critical',
      action: 'Schedule urgent check-in',
      icon: Calendar,
      daysAgo: 21,
      category: 'management'
    },
    {
      employee: 'Emma Wilson',
      signal: 'Culture alignment declining for 2 months',
      severity: 'warning',
      action: 'Schedule culture check-in',
      icon: TrendingDown,
      daysAgo: 60,
      category: 'culture'
    },
    {
      employee: 'Emma Wilson',
      signal: 'Expressed career growth concerns',
      severity: 'warning',
      action: 'Create development plan',
      icon: Target,
      daysAgo: 14,
      category: 'career'
    },
    {
      employee: 'Lisa Brown',
      signal: 'Work-life balance feedback',
      severity: 'info',
      action: 'Discuss flexible options',
      icon: Clock,
      daysAgo: 7,
      category: 'wellbeing'
    },
    {
      employee: '3 employees',
      signal: 'Haven\'t completed recent pulse survey',
      severity: 'info',
      action: 'Send reminder',
      icon: MessageSquare,
      daysAgo: 5,
      category: 'feedback'
    },
  ]

  // Success stories
  const successStories = [
    {
      id: 1,
      title: 'Retention Win: Alex Turner',
      description: 'Prevented departure through timely promotion and equity adjustment',
      impact: 'Saved key technical leader',
      date: '2024-01-15',
      metrics: { riskBefore: 75, riskAfter: 12, retentionValue: '$250k' },
      icon: CheckCircle,
      type: 'success'
    },
    {
      id: 2,
      title: 'Engagement Boost: Design Team',
      description: 'Team engagement increased 15% after implementing recognition program',
      impact: '3 team members at risk → 0 at risk',
      date: '2024-02-01',
      metrics: { engagementIncrease: '+15%', teamSize: 5 },
      icon: TrendingUp,
      type: 'improvement'
    },
    {
      id: 3,
      title: 'Culture Alignment: New Hires',
      description: 'Enhanced onboarding program improved 30-day alignment scores',
      impact: '30-day alignment: 78% → 94%',
      date: '2024-02-15',
      metrics: { alignmentBefore: 78, alignmentAfter: 94 },
      icon: Heart,
      type: 'program'
    },
  ]

  // Department breakdown
  const departmentData = [
    { name: 'Engineering', health: 88, engagement: 90, alignment: 92, atRisk: 0, total: 15 },
    { name: 'Product', health: 65, engagement: 58, alignment: 60, atRisk: 1, total: 8 },
    { name: 'Design', health: 75, engagement: 72, alignment: 75, atRisk: 1, total: 5 },
    { name: 'Marketing', health: 78, engagement: 75, alignment: 78, atRisk: 1, total: 7 },
    { name: 'Sales', health: 82, engagement: 80, alignment: 85, atRisk: 0, total: 10 },
  ]

  // Retention metrics over time
  const retentionTrends = [
    { month: 'Jan', retentionRate: 92, atRisk: 2, voluntary: 1, involuntary: 0 },
    { month: 'Feb', retentionRate: 94, atRisk: 1, voluntary: 0, involuntary: 1 },
    { month: 'Mar', retentionRate: 95, atRisk: 2, voluntary: 1, involuntary: 0 },
    { month: 'Apr', retentionRate: 93, atRisk: 3, voluntary: 1, involuntary: 0 },
    { month: 'May', retentionRate: 96, atRisk: 2, voluntary: 0, involuntary: 0 },
    { month: 'Jun', retentionRate: 94, atRisk: 3, voluntary: 0, involuntary: 0 },
  ]

  const filteredEmployees = employeeRisks.filter(emp =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getRiskColor = (level) => {
    switch(level) {
      case 'high': return 'danger'
      case 'medium': return 'warning'
      case 'low': return 'success'
      default: return 'gray'
    }
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'critical': return 'danger'
      case 'high': return 'warning'
      case 'medium': return 'primary'
      case 'low': return 'success'
      default: return 'gray'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-3">
            Culture & Retention Intelligence
          </h1>
          <p className="text-gray-600 text-lg">Proactive retention strategies and culture alignment tracking</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" icon={Filter}>
            Filters
          </Button>
          <Button variant="primary" icon={Bell}>
            Configure Alerts
          </Button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <StatCard 
          title="Overall Engagement" 
          value="92%" 
          icon={Heart} 
          color="success"
          trend="up"
          trendValue="+5%"
        />
        <StatCard 
          title="At Risk Employees" 
          value={employeeRisks.filter(e => e.riskLevel === 'high').length}
          icon={AlertCircle} 
          color="danger"
          subtext="Immediate action"
        />
        <StatCard 
          title="Culture Alignment" 
          value="93%" 
          icon={Target} 
          color="primary"
          trend="up"
          trendValue="+3%"
        />
        <StatCard 
          title="Pulse Response" 
          value="87%" 
          icon={MessageSquare} 
          color="warning"
          subtext="Last week"
        />
        <StatCard 
          title="Retention Rate" 
          value="94%" 
          icon={Users} 
          color="success"
          trend="up"
          trendValue="+2%"
        />
      </div>

      {/* Tabs Navigation */}
      <Tabs
        tabs={[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'employees', label: 'Employee Risks', icon: Users },
          { id: 'strategies', label: 'Strategies', icon: Target },
          { id: 'analytics', label: 'Analytics', icon: Activity },
        ]}
        activeTab={selectedTab}
        onChange={setSelectedTab}
        className="mb-8"
      />

      {/* Overview Tab */}
      {selectedTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Early Warnings */}
            <Card className="md:col-span-2">
              <h2 className="text-xl font-bold mb-6 flex items-center justify-between">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-warning-600" />
                  Early Warning Signals ({earlyWarnings.filter(w => w.severity !== 'info').length})
                </div>
                <Badge variant="danger">{earlyWarnings.filter(w => w.severity === 'critical').length} Critical</Badge>
              </h2>
              <div className="space-y-3">
                {earlyWarnings.slice(0, 6).map((warning, i) => {
                  const Icon = warning.icon
                  return (
                    <div 
                      key={i}
                      className={`p-4 rounded-lg border-l-4 ${
                        warning.severity === 'critical' ? 'bg-danger-50 border-danger-500' :
                        warning.severity === 'warning' ? 'bg-warning-50 border-warning-500' :
                        'bg-primary-50 border-primary-500'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className={`h-5 w-5 mt-0.5 ${
                          warning.severity === 'critical' ? 'text-danger-600' :
                          warning.severity === 'warning' ? 'text-warning-600' :
                          'text-primary-600'
                        }`} />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <p className="font-bold text-sm text-gray-900">{warning.employee}</p>
                            <Badge variant={warning.severity === 'critical' ? 'danger' : warning.severity === 'warning' ? 'warning' : 'primary'} size="sm">
                              {warning.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{warning.signal}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">{warning.action}</span>
                            <span className="text-xs text-gray-500">{warning.daysAgo === 0 ? 'Today' : `${warning.daysAgo} days ago`}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Quick Stats */}
            <div className="space-y-6">
              <Card>
                <h3 className="font-bold text-gray-900 mb-4">Risk Distribution</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-success-500"></div>
                      <span className="text-sm text-gray-700">Low Risk</span>
                    </div>
                    <span className="font-bold text-gray-900">{employeeRisks.filter(e => e.riskLevel === 'low').length}</span>
                  </div>
                  <ProgressBar progress={(employeeRisks.filter(e => e.riskLevel === 'low').length / employeeRisks.length) * 100} color="success" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-warning-500"></div>
                      <span className="text-sm text-gray-700">Medium Risk</span>
                    </div>
                    <span className="font-bold text-gray-900">{employeeRisks.filter(e => e.riskLevel === 'medium').length}</span>
                  </div>
                  <ProgressBar progress={(employeeRisks.filter(e => e.riskLevel === 'medium').length / employeeRisks.length) * 100} color="warning" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-danger-500"></div>
                      <span className="text-sm text-gray-700">High Risk</span>
                    </div>
                    <span className="font-bold text-gray-900">{employeeRisks.filter(e => e.riskLevel === 'high').length}</span>
                  </div>
                  <ProgressBar progress={(employeeRisks.filter(e => e.riskLevel === 'high').length / employeeRisks.length) * 100} color="danger" />
                </div>
              </Card>

              <Card>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <Gift className="h-5 w-5 mr-2 text-success-600" />
                  Success Stories
                </h3>
                <div className="space-y-3">
                  {successStories.slice(0, 2).map((story) => (
                    <div key={story.id} className="p-3 bg-success-50 rounded-lg border border-success-200">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-success-600" />
                        <p className="text-sm font-bold text-success-900">{story.title.split(': ')[1]}</p>
                      </div>
                      <p className="text-xs text-success-700">{story.impact}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* Culture Pulse Trends */}
          <Card>
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-primary-600" />
              Culture Pulse Trends (6 Months)
            </h2>
            <LineChartComponent 
              data={pulseHistory}
              lines={[
                { dataKey: 'engagement', name: 'Engagement' },
                { dataKey: 'alignment', name: 'Alignment' },
                { dataKey: 'satisfaction', name: 'Satisfaction' },
                { dataKey: 'velocity', name: 'Velocity' }
              ]}
              xAxisKey="month"
              height={300}
            />
            <div className="grid grid-cols-4 gap-4 mt-6">
              <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
                <p className="text-sm font-medium text-primary-600 mb-1">Engagement</p>
                <p className="text-3xl font-bold text-primary-700">92%</p>
                <p className="text-xs text-success-600 mt-1">↑ 8% improvement</p>
              </div>
              <div className="p-4 bg-secondary-50 rounded-lg border border-secondary-200">
                <p className="text-sm font-medium text-secondary-600 mb-1">Alignment</p>
                <p className="text-3xl font-bold text-secondary-700">93%</p>
                <p className="text-xs text-success-600 mt-1">↑ 6% improvement</p>
              </div>
              <div className="p-4 bg-success-50 rounded-lg border border-success-200">
                <p className="text-sm font-medium text-success-600 mb-1">Satisfaction</p>
                <p className="text-3xl font-bold text-success-700">90%</p>
                <p className="text-xs text-success-600 mt-1">↑ 10% improvement</p>
              </div>
              <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
                <p className="text-sm font-medium text-warning-600 mb-1">Velocity</p>
                <p className="text-3xl font-bold text-warning-700">92%</p>
                <p className="text-xs text-success-600 mt-1">↑ 11% improvement</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Employee Risks Tab */}
      {selectedTab === 'employees' && (
        <div className="space-y-6">
          <Card>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search employees..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              <Button variant="outline" icon={Filter}>
                Filter by Risk
              </Button>
            </div>

            <div className="space-y-4">
              {filteredEmployees.map((employee) => (
                <div 
                  key={employee.id}
                  className={`p-5 rounded-xl border-2 transition-all cursor-pointer hover:shadow-md ${
                    employee.riskLevel === 'high' ? 'bg-danger-50 border-danger-300' :
                    employee.riskLevel === 'medium' ? 'bg-warning-50 border-warning-300' :
                    'bg-success-50 border-success-300'
                  }`}
                  onClick={() => setSelectedEmployee(employee)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                        employee.riskLevel === 'high' ? 'bg-danger-500' :
                        employee.riskLevel === 'medium' ? 'bg-warning-500' :
                        'bg-success-500'
                      }`}>
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-lg text-gray-900">{employee.name}</h3>
                          <Badge variant={getRiskColor(employee.riskLevel)} size="sm">
                            {employee.riskLevel.toUpperCase()} RISK ({employee.riskScore}%)
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{employee.role} • {employee.department} • {employee.tenure} months tenure</p>
                        <div className="grid grid-cols-4 gap-3">
                          <div className="p-2 bg-white rounded-lg">
                            <p className="text-xs text-gray-500">Engagement</p>
                            <p className="text-lg font-bold text-gray-900">{employee.engagementScore}%</p>
                          </div>
                          <div className="p-2 bg-white rounded-lg">
                            <p className="text-xs text-gray-500">Alignment</p>
                            <p className="text-lg font-bold text-gray-900">{employee.cultureAlignment}%</p>
                          </div>
                          <div className="p-2 bg-white rounded-lg">
                            <p className="text-xs text-gray-500">Performance</p>
                            <p className="text-lg font-bold text-gray-900">{employee.performanceScore}%</p>
                          </div>
                          <div className="p-2 bg-white rounded-lg">
                            <p className="text-xs text-gray-500">Last Pulse</p>
                            <p className="text-sm font-bold text-gray-900">{employee.lastPulse}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {employee.trends.engagement === 'up' && <Badge variant="success" size="sm"><TrendingUp className="h-3 w-3 mr-1" />Engaged</Badge>}
                      {employee.trends.engagement === 'down' && <Badge variant="danger" size="sm"><TrendingDown className="h-3 w-3 mr-1" />Disengaged</Badge>}
                      {employee.trends.alignment === 'down' && <Badge variant="warning" size="sm">Alignment ↓</Badge>}
                    </div>
                  </div>
                  {employee.riskFactors && employee.riskFactors.length > 0 && (
                    <div className="pt-3 border-t border-gray-200 mb-3">
                      <p className="text-xs font-medium text-gray-600 mb-2">Risk Factors:</p>
                      <div className="flex flex-wrap gap-2">
                        {employee.riskFactors.map((factor, i) => (
                          <Badge key={i} variant="danger" size="sm">{factor}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {employee.strengths && employee.strengths.length > 0 && (
                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-xs font-medium text-gray-600 mb-2">Strengths:</p>
                      <div className="flex flex-wrap gap-2">
                        {employee.strengths.map((strength, i) => (
                          <Badge key={i} variant="success" size="sm">{strength}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500">Last 1-on-1: {employee.lastOneOnOne}</p>
                    <Button variant={employee.riskLevel === 'high' ? 'danger' : 'outline'} size="sm" icon={ChevronRight}>
                      {employee.riskLevel === 'high' ? 'Take Action' : 'View Details'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Strategies Tab */}
      {selectedTab === 'strategies' && (
        <div className="space-y-6">
          <Card>
            <h2 className="text-xl font-bold mb-6">Recommended Retention Strategies</h2>
            <div className="space-y-4">
              {retentionStrategies.map((strategy) => {
                const Icon = strategy.icon
                return (
                  <div 
                    key={strategy.id} 
                    className={`p-5 rounded-xl border-2 bg-gradient-to-r from-${strategy.color}-50 to-white border-${strategy.color}-200 hover:shadow-md transition-all`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`p-3 bg-${strategy.color}-100 rounded-lg`}>
                        <Icon className={`h-6 w-6 text-${strategy.color}-600`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-lg text-gray-900 mb-1">{strategy.title}</h3>
                            <p className="text-sm text-gray-600">{strategy.description}</p>
                          </div>
                          <Badge variant={getPriorityColor(strategy.priority)} size="lg">
                            {strategy.priority}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-4">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Impact</p>
                            <p className="text-sm font-bold text-gray-900">{strategy.impact}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Timeframe</p>
                            <p className="text-sm font-bold text-gray-900">{strategy.timeframe}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Estimated Impact</p>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-bold text-gray-900">{strategy.estimatedImpact}%</p>
                              <ProgressBar progress={strategy.estimatedImpact} color={strategy.color} className="flex-1" />
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="text-xs font-medium text-gray-600 mb-2">Action Items:</p>
                          <div className="flex flex-wrap gap-2">
                            {strategy.actions.map((action, i) => (
                              <span key={i} className="text-xs px-2 py-1 bg-white rounded border border-gray-200">{action}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      {Array.isArray(strategy.targetEmployees) ? (
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {strategy.targetEmployees.length} employees: {strategy.targetEmployees.join(', ')}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{strategy.targetEmployees}</span>
                        </div>
                      )}
                      <Button variant="primary" size="sm">
                        Implement Strategy
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Award className="h-5 w-5 mr-2 text-success-600" />
              Success Stories & Wins
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {successStories.map((story) => {
                const Icon = story.icon
                return (
                  <div key={story.id} className="p-5 bg-gradient-to-br from-success-50 to-white rounded-xl border border-success-200">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-2 bg-success-100 rounded-lg">
                        <Icon className="h-5 w-5 text-success-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">{story.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{story.description}</p>
                        <Badge variant="success" size="sm">{story.impact}</Badge>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
                      <span>{new Date(story.date).toLocaleDateString()}</span>
                      {story.metrics && (
                        <span className="font-medium text-success-600">
                          {story.metrics.retentionValue || `${story.metrics.engagementIncrease || story.metrics.alignmentAfter + '%'}`}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>
      )}

      {/* Analytics Tab */}
      {selectedTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <h2 className="text-xl font-bold mb-6">Retention Trends (6 Months)</h2>
              <AreaChartComponent 
                data={retentionTrends}
                dataKey="retentionRate"
                xAxisKey="month"
                color="#10b981"
                height={250}
              />
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="p-3 bg-success-50 rounded-lg text-center">
                  <p className="text-sm text-success-600 font-medium mb-1">Avg Rate</p>
                  <p className="text-2xl font-bold text-success-700">94%</p>
                </div>
                <div className="p-3 bg-warning-50 rounded-lg text-center">
                  <p className="text-sm text-warning-600 font-medium mb-1">Voluntary</p>
                  <p className="text-2xl font-bold text-warning-700">3</p>
                </div>
                <div className="p-3 bg-primary-50 rounded-lg text-center">
                  <p className="text-sm text-primary-600 font-medium mb-1">Current Risk</p>
                  <p className="text-2xl font-bold text-primary-700">3</p>
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-bold mb-6">Department Health</h2>
              <div className="space-y-4">
                {departmentData.map((dept) => (
                  <div key={dept.name} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-bold text-gray-900">{dept.name}</p>
                        <p className="text-sm text-gray-600">{dept.total} members</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={dept.atRisk > 0 ? 'warning' : 'success'} size="sm">
                          {dept.atRisk} at risk
                        </Badge>
                        <p className="text-2xl font-bold text-gray-900">{dept.health}%</p>
                      </div>
                    </div>
                    <ProgressBar progress={dept.health} color={dept.health >= 80 ? 'success' : dept.health >= 70 ? 'warning' : 'danger'} />
                    <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                      <div className="flex items-center justify-between px-2 py-1 bg-white rounded">
                        <span className="text-gray-600">Engagement</span>
                        <span className="font-bold">{dept.engagement}%</span>
                      </div>
                      <div className="flex items-center justify-between px-2 py-1 bg-white rounded">
                        <span className="text-gray-600">Alignment</span>
                        <span className="font-bold">{dept.alignment}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card>
            <h2 className="text-xl font-bold mb-6">Retention Intelligence Summary</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="p-5 bg-gradient-to-br from-success-50 to-white rounded-xl border border-success-100 text-center">
                <p className="text-sm font-medium text-success-600 mb-2">Low Risk</p>
                <p className="text-4xl font-bold text-success-700 mb-2">
                  {employeeRisks.filter(e => e.riskLevel === 'low').length}
                </p>
                <p className="text-xs text-gray-600">
                  {Math.round((employeeRisks.filter(e => e.riskLevel === 'low').length / employeeRisks.length) * 100)}% of team
                </p>
              </div>
              <div className="p-5 bg-gradient-to-br from-warning-50 to-white rounded-xl border border-warning-100 text-center">
                <p className="text-sm font-medium text-warning-600 mb-2">Medium Risk</p>
                <p className="text-4xl font-bold text-warning-700 mb-2">
                  {employeeRisks.filter(e => e.riskLevel === 'medium').length}
                </p>
                <p className="text-xs text-gray-600">Needs attention</p>
              </div>
              <div className="p-5 bg-gradient-to-br from-danger-50 to-white rounded-xl border border-danger-100 text-center">
                <p className="text-sm font-medium text-danger-600 mb-2">High Risk</p>
                <p className="text-4xl font-bold text-danger-700 mb-2">
                  {employeeRisks.filter(e => e.riskLevel === 'high').length}
                </p>
                <p className="text-xs text-gray-600">Immediate action</p>
              </div>
              <div className="p-5 bg-gradient-to-br from-primary-50 to-white rounded-xl border border-primary-100 text-center">
                <p className="text-sm font-medium text-primary-600 mb-2">Retention Rate</p>
                <p className="text-4xl font-bold text-primary-700 mb-2">94%</p>
                <p className="text-xs text-success-600">↑ Above target</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
