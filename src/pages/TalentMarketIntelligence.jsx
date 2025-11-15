import { useState, useEffect } from 'react'
import { TalentMarketIntelligence } from '../services/talentMarketIntelligence'
import { 
  TrendingUp, DollarSign, Users, MapPin, AlertCircle, BarChart3, 
  Building2, Briefcase, Clock, Eye, Filter, Search, TrendingDown,
  Target, Zap, Activity, Award, Globe, Calendar, ChevronRight
} from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
import StatCard from '../components/StatCard'
import Tabs from '../components/Tabs'
import { LineChartComponent, BarChartComponent, AreaChartComponent } from '../components/Chart'

export default function TalentMarketIntelligencePage() {
  const [selectedRole, setSelectedRole] = useState('Senior Engineer')
  const [selectedStage, setSelectedStage] = useState('seed')
  const [insights, setInsights] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedTab, setSelectedTab] = useState('overview')

  const roles = ['Senior Engineer', 'Product Manager', 'Head of Sales', 'Designer', 'Marketing Lead', 'Data Scientist', 'DevOps Engineer']
  const stages = ['pre_seed', 'seed', 'series_a', 'series_b', 'series_c', 'growth']

  // Compensation historical data
  const compensationHistory = [
    { year: '2020', min: 80, median: 110, max: 150 },
    { year: '2021', min: 90, median: 120, max: 165 },
    { year: '2022', min: 100, median: 135, max: 180 },
    { year: '2023', min: 110, median: 145, max: 195 },
    { year: '2024', min: 120, median: 160, max: 210 },
  ]

  // Active job postings by competitors
  const activePostings = [
    { 
      company: 'Startup A', 
      role: 'Senior Engineer', 
      posted: '2 days ago', 
      salary: '$140k-180k',
      equity: '0.1-0.3%',
      stage: 'Series A',
      location: 'San Francisco',
      views: 245,
      applicants: 34
    },
    { 
      company: 'Tech Corp B', 
      role: 'Senior Engineer', 
      posted: '1 week ago', 
      salary: '$150k-190k',
      equity: '0.05-0.2%',
      stage: 'Series B',
      location: 'Remote',
      views: 412,
      applicants: 67
    },
    { 
      company: 'Growth Inc', 
      role: 'Senior Engineer', 
      posted: '3 days ago', 
      salary: '$130k-170k',
      equity: '0.2-0.5%',
      stage: 'Seed',
      location: 'New York',
      views: 189,
      applicants: 23
    },
    { 
      company: 'Scale Ventures', 
      role: 'Senior Engineer', 
      posted: '5 days ago', 
      salary: '$155k-200k',
      equity: '0.05-0.15%',
      stage: 'Series C',
      location: 'Austin',
      views: 523,
      applicants: 89
    },
  ]

  // Recent hiring trends
  const recentHiringTrends = [
    { month: 'Jan', postings: 45, hires: 12, avgDays: 32 },
    { month: 'Feb', postings: 52, hires: 15, avgDays: 28 },
    { month: 'Mar', postings: 68, hires: 18, avgDays: 30 },
    { month: 'Apr', postings: 71, hires: 20, avgDays: 25 },
    { month: 'May', postings: 89, hires: 25, avgDays: 27 },
    { month: 'Jun', postings: 95, hires: 28, avgDays: 24 },
  ]

  // Competitor analysis
  const competitorAnalysis = [
    {
      company: 'Startup A',
      stage: 'Series A',
      teamSize: 45,
      recentHires: 8,
      avgCompensation: 155,
      growthRate: 25,
      activeRoles: 12,
    },
    {
      company: 'Tech Corp B',
      stage: 'Series B',
      teamSize: 120,
      recentHires: 15,
      avgCompensation: 170,
      growthRate: 35,
      activeRoles: 23,
    },
    {
      company: 'Growth Inc',
      stage: 'Seed',
      teamSize: 18,
      recentHires: 5,
      avgCompensation: 145,
      growthRate: 40,
      activeRoles: 7,
    },
  ]

  useEffect(() => {
    const marketService = new TalentMarketIntelligence();

    const loadInsights = async () => {
      setLoading(true);
      setError(null);
      try {
        const marketInsights = await marketService.generateMarketInsights(selectedRole, selectedStage);
        setInsights(marketInsights);
      } catch (err) {
        setError('Failed to fetch market insights.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadInsights();
  }, [selectedRole, selectedStage])

  const getDemandColor = (demand) => {
    switch(demand) {
      case 'very_high': return 'text-red-600 bg-red-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'increasing': return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'decreasing': return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />
      default: return <BarChart3 className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-3">
            Talent Market Intelligence
          </h1>
          <p className="text-gray-600 text-lg">Real-time market insights, compensation data, competitor analysis, and active postings</p>
        </div>
        <Button variant="primary" icon={Filter}>
          Advanced Filters
        </Button>
      </div>

      <Card className="mb-8">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Briefcase className="h-4 w-4 mr-2 text-primary-600" />
              Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 font-medium"
            >
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-secondary-600" />
              Company Stage
            </label>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 font-medium"
            >
              {stages.map(stage => (
                <option key={stage} value={stage}>{stage.replace('_', ' ').toUpperCase()}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {loading && (
        <Card className="text-center py-12">
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
          <p className="text-gray-600">Loading market insights...</p>
        </Card>
      )}
      
      {error && (
        <Card className="text-center py-12 bg-danger-50 border-danger-200">
          <AlertCircle className="h-12 w-12 text-danger-600 mx-auto mb-4" />
          <p className="text-danger-800 font-medium">Error: {error}</p>
        </Card>
      )}

      {!loading && !error && insights && (
        <div className="space-y-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <StatCard 
              title="Active Postings" 
              value={activePostings.length} 
              icon={Briefcase} 
              color="primary"
              trend="up"
              trendValue="+12%"
            />
            <StatCard 
              title="Avg Time to Fill" 
              value="26 days" 
              icon={Clock} 
              color="warning"
              trend="down"
              trendValue="-8%"
            />
            <StatCard 
              title="Competition Level" 
              value="High" 
              icon={TrendingUp} 
              color="danger"
            />
          </div>

          <Card className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <DollarSign className="h-6 w-6 mr-2 text-primary-600" />
              Compensation Data & Trends
            </h2>
            
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-gradient-to-br from-primary-50 to-white rounded-lg border border-primary-100">
                <p className="text-sm font-medium text-primary-600 mb-1">Minimum</p>
                <p className="text-3xl font-bold text-primary-700">${(insights.compensation.min / 1000).toFixed(0)}k</p>
                <p className="text-xs text-gray-500 mt-1">Entry level</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-secondary-50 to-white rounded-lg border border-secondary-100">
                <p className="text-sm font-medium text-secondary-600 mb-1">Median</p>
                <p className="text-3xl font-bold text-secondary-700">${(insights.compensation.median / 1000).toFixed(0)}k</p>
                <p className="text-xs text-gray-500 mt-1">Market average</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-success-50 to-white rounded-lg border border-success-100">
                <p className="text-sm font-medium text-success-600 mb-1">Maximum</p>
                <p className="text-3xl font-bold text-success-700">${(insights.compensation.max / 1000).toFixed(0)}k</p>
                <p className="text-xs text-gray-500 mt-1">Top offers</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-warning-50 to-white rounded-lg border border-warning-100">
                <p className="text-sm font-medium text-warning-600 mb-1">Equity Range</p>
                <p className="text-3xl font-bold text-warning-700">{insights.compensation.equity}</p>
                <p className="text-xs text-gray-500 mt-1">Typical equity</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-4">5-Year Compensation Trend</h3>
              <LineChartComponent 
                data={compensationHistory}
                lines={[
                  { dataKey: 'min' },
                  { dataKey: 'median' },
                  { dataKey: 'max' }
                ]}
                xAxisKey="year"
                height={250}
              />
            </div>

            <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-primary-600 mt-0.5" />
                <div>
                  <p className="font-bold text-primary-900 mb-1">Recommended Offer Range</p>
                  <p className="text-sm text-primary-700">
                    <strong>${(insights.compensation.min / 1000).toFixed(0)}k - ${(insights.compensation.median / 1000).toFixed(0)}k</strong> base salary + <strong>{insights.compensation.equity}</strong> equity
                  </p>
                  <p className="text-xs text-primary-600 mt-2">💡 This range is competitive for {selectedStage.replace('_', ' ')} stage companies</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <Briefcase className="h-6 w-6 mr-2 text-secondary-600" />
                Active Job Postings ({activePostings.length})
              </h2>
              <Button variant="outline" size="sm" icon={Search}>
                Search All Postings
              </Button>
            </div>

            <div className="space-y-4">
              {activePostings.map((posting, i) => (
                <div key={i} className="p-5 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-3 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-lg">
                        <Building2 className="h-6 w-6 text-secondary-700" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-lg text-gray-900">{posting.company}</h3>
                          <Badge variant="primary" size="sm">{posting.stage}</Badge>
                        </div>
                        <p className="text-gray-700 font-medium mb-2">{posting.role}</p>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-primary-600" />
                            {posting.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-warning-600" />
                            {posting.posted}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4 text-secondary-600" />
                            {posting.views} views
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-success-600" />
                            {posting.applicants} applicants
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary-700">{posting.salary}</p>
                      <p className="text-sm text-gray-600">Equity: {posting.equity}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <Badge variant="gray" size="sm">
                        {Math.round((posting.applicants / posting.views) * 100)}% apply rate
                      </Badge>
                      <Badge variant={posting.applicants > 50 ? 'danger' : 'warning'} size="sm">
                        {posting.applicants > 50 ? 'High' : 'Medium'} competition
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm" icon={ChevronRight}>
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Building2 className="h-6 w-6 mr-2 text-success-600" />
              Competitor Analysis
            </h2>
            
            <div className="space-y-4 mb-6">
              {competitorAnalysis.map((comp, i) => (
                <div key={i} className="p-5 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{comp.company}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" size="sm">{comp.stage}</Badge>
                        <span className="text-sm text-gray-600">{comp.teamSize} employees</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-success-600">{comp.growthRate}%</p>
                      <p className="text-xs text-gray-500">Growth rate</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4">
                    <div className="p-3 bg-primary-50 rounded-lg text-center">
                      <p className="text-xs text-primary-600 font-medium mb-1">Recent Hires</p>
                      <p className="text-xl font-bold text-primary-700">{comp.recentHires}</p>
                    </div>
                    <div className="p-3 bg-secondary-50 rounded-lg text-center">
                      <p className="text-xs text-secondary-600 font-medium mb-1">Active Roles</p>
                      <p className="text-xl font-bold text-secondary-700">{comp.activeRoles}</p>
                    </div>
                    <div className="p-3 bg-warning-50 rounded-lg text-center">
                      <p className="text-xs text-warning-600 font-medium mb-1">Avg Comp</p>
                      <p className="text-xl font-bold text-warning-700">${comp.avgCompensation}k</p>
                    </div>
                    <div className="p-3 bg-success-50 rounded-lg text-center">
                      <p className="text-xs text-success-600 font-medium mb-1">Team Size</p>
                      <p className="text-xl font-bold text-success-700">{comp.teamSize}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-warning-50 border border-warning-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-warning-600 mt-0.5" />
                <div>
                  <p className="font-bold text-warning-900 mb-1">Competitive Intelligence</p>
                  <p className="text-sm text-warning-700">
                    Your main competitors are hiring aggressively. Consider increasing your offer competitiveness or highlighting unique culture benefits.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Activity className="h-6 w-6 mr-2 text-warning-600" />
              Recent Hiring Trends (6 Months)
            </h2>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-primary-50 rounded-lg border border-primary-100">
                <p className="text-sm font-medium text-primary-600 mb-1">Total Postings</p>
                <p className="text-3xl font-bold text-primary-700">420</p>
                <p className="text-xs text-success-600 mt-1">↑ 15% vs last period</p>
              </div>
              <div className="p-4 bg-secondary-50 rounded-lg border border-secondary-100">
                <p className="text-sm font-medium text-secondary-600 mb-1">Total Hires</p>
                <p className="text-3xl font-bold text-secondary-700">118</p>
                <p className="text-xs text-success-600 mt-1">↑ 22% vs last period</p>
              </div>
              <div className="p-4 bg-warning-50 rounded-lg border border-warning-100">
                <p className="text-sm font-medium text-warning-600 mb-1">Avg Days to Fill</p>
                <p className="text-3xl font-bold text-warning-700">28</p>
                <p className="text-xs text-success-600 mt-1">↓ 12% vs last period</p>
              </div>
            </div>

            <AreaChartComponent 
              data={recentHiringTrends}
              dataKey="postings"
              xAxisKey="month"
              color="#0ea5e9"
              height={250}
            />
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary-600" />
                Market Trends
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Demand</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDemandColor(insights.marketTrends.demand)}`}>
                    {insights.marketTrends.demand.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Supply</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDemandColor(insights.marketTrends.supply)}`}>
                    {insights.marketTrends.supply.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Trend</p>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(insights.marketTrends.trend)}
                    <span className="text-sm font-medium capitalize">{insights.marketTrends.trend}</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-secondary-600" />
                Talent Pool Locations
              </h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {insights.talentPools.map((location, i) => (
                  <Badge key={i} variant="primary">{location}</Badge>
                ))}
              </div>
              <div className="mt-4 p-3 bg-secondary-50 rounded-lg">
                <p className="text-sm text-secondary-800">
                  <strong>Top hubs:</strong> San Francisco and New York lead in talent concentration for this role
                </p>
              </div>
            </Card>
          </div>

          <Card>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Target className="h-6 w-6 mr-2 text-success-600" />
              Strategic Recommendations
            </h2>
            <div className="space-y-3">
              {insights.recommendations.map((rec, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-gradient-to-r from-success-50 to-white rounded-lg border border-success-100">
                  <div className="p-2 bg-success-100 rounded-lg">
                    <Zap className="h-5 w-5 text-success-600" />
                  </div>
                  <p className="text-gray-800 flex-1">{rec}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

