import { useState, useEffect } from 'react'
import { DNAScanner } from '../services/dnaScanner'
import { 
  Dna, AlertTriangle, TrendingUp, Users, Settings, Briefcase, 
  Target, CheckCircle, Clock, DollarSign, BarChart2, Activity,
  Zap, Award, GitBranch
} from 'lucide-react'
import Card from '../components/Card'
import StatCard from '../components/StatCard'
import Badge from '../components/Badge'
import Button from '../components/Button'
import Modal from '../components/Modal'
import Input from '../components/Input'
import { AreaChartComponent, LineChartComponent, PieChartComponent } from '../components/Chart'

export default function Dashboard() {
  const [dna, setDna] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showSetup, setShowSetup] = useState(false)
  const [companyData, setCompanyData] = useState({
    name: '',
    stage: 'seed',
    teamSize: 5,
    runwayMonths: 12,
    values: ['speed', 'ownership', 'experimentation'],
  })

  const scanDNA = async () => {
    if (!companyData.name) {
      setError('Please set up your company profile first')
      setShowSetup(true)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const scanner = new DNAScanner()
      const result = await scanner.scanCompany(companyData)
      setDna(result)
      setShowSetup(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Load saved company data from localStorage
    const saved = localStorage.getItem('biggwork_company')
    if (saved) {
      const data = JSON.parse(saved)
      setCompanyData(data)
      // Auto-scan if data exists
      const scanner = new DNAScanner()
      scanner.scanCompany(data).then(setDna)
    } else {
      setShowSetup(true)
    }
  }, [])

  const handleSaveCompany = () => {
    localStorage.setItem('biggwork_company', JSON.stringify(companyData))
    scanDNA()
  }

  const mockStats = {
    activeRoles: 5,
    candidates: 23,
    interviews: 12,
    hiresThisMonth: 2,
  }

  const hiringTrendData = [
    { month: 'Jan', candidates: 15, interviews: 8, hires: 1 },
    { month: 'Feb', candidates: 20, interviews: 12, hires: 2 },
    { month: 'Mar', candidates: 23, interviews: 15, hires: 2 },
    { month: 'Apr', candidates: 30, interviews: 18, hires: 3 },
    { month: 'May', candidates: 35, interviews: 22, hires: 4 },
    { month: 'Jun', candidates: 40, interviews: 25, hires: 3 },
  ]

  const pipelineData = [
    { name: 'Applied', value: 40 },
    { name: 'Screening', value: 25 },
    { name: 'Interview', value: 15 },
    { name: 'Offer', value: 8 },
    { name: 'Hired', value: 5 },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-3">
            {companyData.name || 'Company'} Dashboard
          </h1>
          <p className="text-gray-600 text-lg flex items-center gap-2">
            <Activity className="h-5 w-5" />
            {companyData.name ? 'Real-time talent intelligence & analytics' : 'Set up your company profile to get started'}
          </p>
        </div>
        <Button variant="outline" icon={Settings} onClick={() => setShowSetup(!showSetup)}>
          {showSetup ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>

      <Modal
        isOpen={showSetup}
        onClose={() => setShowSetup(false)}
        title="Company Profile Setup"
        size="lg"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowSetup(false)}>Cancel</Button>
            <Button variant="primary" icon={Zap} onClick={handleSaveCompany}>Save & Scan DNA</Button>
          </>
        }
      >
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Company Name"
              placeholder="Your Company Name"
              value={companyData.name}
              onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Funding Stage</label>
              <select
                value={companyData.stage}
                onChange={(e) => setCompanyData({ ...companyData, stage: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 transition-colors"
              >
                <option value="pre_seed">Pre-Seed</option>
                <option value="seed">Seed</option>
                <option value="series_a">Series A</option>
                <option value="series_b">Series B</option>
                <option value="series_c">Series C</option>
                <option value="growth">Growth</option>
              </select>
            </div>
            <Input
              label="Team Size"
              type="number"
              value={companyData.teamSize}
              onChange={(e) => setCompanyData({ ...companyData, teamSize: parseInt(e.target.value) || 0 })}
              icon={Users}
            />
            <Input
              label="Runway (months)"
              type="number"
              value={companyData.runwayMonths}
              onChange={(e) => setCompanyData({ ...companyData, runwayMonths: parseInt(e.target.value) || 0 })}
              icon={Clock}
            />
          </div>
          <Input
            label="Company Values (comma-separated)"
            placeholder="speed, ownership, experimentation"
            value={companyData.values.join(', ')}
            onChange={(e) => setCompanyData({ ...companyData, values: e.target.value.split(',').map(v => v.trim()).filter(Boolean) })}
            icon={Award}
            helper="Enter the core values that define your company culture"
          />
        </div>
      </Modal>

      {loading && (
        <Card className="text-center py-12">
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
          <p className="text-gray-600 text-lg">Scanning company DNA...</p>
        </Card>
      )}

      {error && (
        <Card className="bg-danger-50 border-l-4 border-danger-500 mb-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-danger-600" />
            <p className="text-danger-700 font-medium">{error}</p>
          </div>
        </Card>
      )}

      {dna && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Active Roles"
              value={mockStats.activeRoles}
              icon={Briefcase}
              color="primary"
              trend="up"
              trendValue="+12%"
            />
            <StatCard
              title="Total Candidates"
              value={mockStats.candidates}
              icon={Users}
              color="secondary"
              trend="up"
              trendValue="+25%"
            />
            <StatCard
              title="Interviews Scheduled"
              value={mockStats.interviews}
              icon={Target}
              color="success"
              trend="up"
              trendValue="+8%"
            />
            <StatCard
              title="Hires This Month"
              value={mockStats.hiresThisMonth}
              icon={CheckCircle}
              color="warning"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <BarChart2 className="h-6 w-6 mr-2 text-primary-600" />
                Hiring Activity Trend
              </h3>
              <LineChartComponent
                data={hiringTrendData}
                lines={[
                  { dataKey: 'candidates', name: 'Candidates' },
                  { dataKey: 'interviews', name: 'Interviews' },
                  { dataKey: 'hires', name: 'Hires' }
                ]}
                xAxisKey="month"
                height={300}
              />
            </Card>

            <Card>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <GitBranch className="h-6 w-6 mr-2 text-secondary-600" />
                Pipeline Distribution
              </h3>
              <PieChartComponent
                data={pipelineData}
                dataKey="value"
                nameKey="name"
                height={300}
              />
            </Card>
          </div>
        </>
      )}

      {dna && (
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-full -mr-20 -mt-20" />
            <div className="relative">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <div className="p-2 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg mr-3">
                  <Dna className="h-6 w-6 text-white" />
                </div>
                Company DNA Profile
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Funding Stage</p>
                  <Badge variant="primary" size="lg">{dna.stage}</Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Velocity</p>
                  <Badge variant="success" size="lg">{dna.velocity}</Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    Team Size
                  </p>
                  <p className="text-2xl font-bold text-gray-900">{dna.teamSize}</p>
                </div>
                {dna.runwayMonths && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Runway
                    </p>
                    <p className="text-2xl font-bold text-gray-900">{dna.runwayMonths} <span className="text-sm text-gray-500">months</span></p>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {dna.cultureDNA && (
            <Card>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <div className="p-2 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-lg mr-3">
                  <Award className="h-6 w-6 text-white" />
                </div>
                Culture DNA
              </h3>
              <div className="space-y-6">
                {dna.cultureDNA.values && dna.cultureDNA.values.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500 mb-3 font-medium">Core Values</p>
                    <div className="flex flex-wrap gap-2">
                      {dna.cultureDNA.values.map((value, i) => (
                        <Badge key={i} variant="secondary" size="md">{value}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                <div className="grid gap-4">
                  <div className="p-4 bg-primary-50 rounded-lg border border-primary-100">
                    <p className="text-sm text-primary-600 font-medium mb-1">Work Style</p>
                    <p className="font-bold text-gray-900">{dna.cultureDNA.workStyle || 'N/A'}</p>
                  </div>
                  <div className="p-4 bg-secondary-50 rounded-lg border border-secondary-100">
                    <p className="text-sm text-secondary-600 font-medium mb-1">Decision Making</p>
                    <p className="font-bold text-gray-900">{dna.cultureDNA.decisionMaking || 'N/A'}</p>
                  </div>
                  <div className="p-4 bg-success-50 rounded-lg border border-success-100">
                    <p className="text-sm text-success-600 font-medium mb-1">Risk Tolerance</p>
                    <p className="font-bold text-gray-900">{dna.cultureDNA.riskTolerance || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}

      {dna && dna.hiringPriorities && dna.hiringPriorities.length > 0 && (
        <Card className="mb-8">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <div className="p-2 bg-gradient-to-br from-success-500 to-primary-500 rounded-lg mr-3">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            Hiring Priorities
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {dna.hiringPriorities.map((priority, i) => (
              <Card key={i} className="border-l-4 border-primary-500" hover>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-5 w-5 text-primary-600" />
                    <p className="font-bold text-lg text-gray-900">{priority.role}</p>
                  </div>
                  <Badge variant={priority.urgency === 'high' ? 'danger' : 'warning'}>
                    {priority.urgency}
                  </Badge>
                </div>
                <p className="text-gray-600">{priority.reason}</p>
              </Card>
            ))}
          </div>
        </Card>
      )}

      {dna && dna.risks && dna.risks.length > 0 && (
        <Card className="bg-danger-50 border-l-4 border-danger-500">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <div className="p-2 bg-danger-100 rounded-lg mr-3">
              <AlertTriangle className="h-6 w-6 text-danger-600" />
            </div>
            Risk Indicators
          </h3>
          <div className="flex flex-wrap gap-3">
            {dna.risks.map((risk, i) => (
              <Badge key={i} variant="danger" size="lg">
                {String(risk).replace('_', ' ')}
              </Badge>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}

