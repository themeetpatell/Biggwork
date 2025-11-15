import { useState, useEffect } from 'react'
import { RoleIntelligence } from '../services/roleIntelligence'
import { GapAnalysis } from '../services/gapAnalysis'
import { DNAScanner } from '../services/dnaScanner'
import { 
  Briefcase, Plus, FileText, AlertTriangle, TrendingUp, Target, Sparkles, 
  CheckCircle, XCircle, DollarSign, Calendar, Eye, Users, Clock, Award,
  Edit, Copy, Archive, Share2, BarChart3, Zap, Globe, TrendingDown
} from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
import Modal from '../components/Modal'
import Input from '../components/Input'
import Sidebar from '../components/Sidebar'
import Tabs from '../components/Tabs'
import ProgressBar from '../components/ProgressBar'

export default function Roles() {
  const [dna, setDna] = useState(null)
  const [roles, setRoles] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [showGapAnalysis, setShowGapAnalysis] = useState(false)
  const [gapAnalysis, setGapAnalysis] = useState(null)
  const [formData, setFormData] = useState({ title: '', department: '', priority: 'medium' })
  const [currentTeam, setCurrentTeam] = useState([])
  const [selectedRole, setSelectedRole] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    loadDNA()
    loadRoles()
    loadTeam()
  }, [])

  const loadDNA = async () => {
    const saved = localStorage.getItem('peopleos_company')
    if (saved) {
      const companyData = JSON.parse(saved)
      const scanner = new DNAScanner()
      const result = await scanner.scanCompany(companyData)
      setDna(result)
    }
  }

  const loadRoles = () => {
    const saved = localStorage.getItem('peopleos_roles')
    if (saved) {
      setRoles(JSON.parse(saved))
    }
  }

  const loadTeam = () => {
    const saved = localStorage.getItem('peopleos_team')
    if (saved) {
      setCurrentTeam(JSON.parse(saved))
    } else {
      const defaultTeam = [
        { name: 'Founder', role: 'Founder', skills: ['strategy', 'vision'], load: 0.9, critical: true },
        { name: 'CTO', role: 'CTO', skills: ['engineering', 'architecture'], load: 0.8, critical: true },
      ]
      setCurrentTeam(defaultTeam)
      localStorage.setItem('peopleos_team', JSON.stringify(defaultTeam))
    }
  }

  const analyzeGaps = () => {
    if (!dna) return
    
    const analyzer = new GapAnalysis()
    const growthRequirements = { skills: ['sales', 'marketing', 'product', 'operations'] }
    const gaps = analyzer.analyzeGaps(dna, currentTeam, growthRequirements)
    setGapAnalysis(gaps)
    setShowGapAnalysis(true)
  }

  const generateRole = () => {
    if (!dna || !formData.title) return
    
    const intelligence = new RoleIntelligence()
    const roleData = intelligence.generateRole(dna, formData.title, formData.department)
    const jd = intelligence.generateJD(roleData, dna)
    
    const newRole = {
      id: Date.now().toString(),
      ...roleData,
      jdText: jd,
      status: 'active',
      priority: formData.priority,
      createdAt: new Date().toISOString(),
      budget: calculateBudget(dna.stage),
    }
    
    const updated = [...roles, newRole]
    setRoles(updated)
    localStorage.setItem('peopleos_roles', JSON.stringify(updated))
    setShowForm(false)
    setFormData({ title: '', department: '', priority: 'medium' })
  }

  const calculateBudget = (stage) => {
    const budgets = {
      pre_seed: { min: 60, max: 120, equity: '0.5-1.5%' },
      seed: { min: 100, max: 180, equity: '0.3-1%' },
      series_a: { min: 150, max: 250, equity: '0.2-0.5%' },
      series_b: { min: 200, max: 350, equity: '0.1-0.3%' },
    }
    return budgets[stage] || budgets.seed
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-3">
            Intelligent Role Definition
          </h1>
          <p className="text-gray-600 text-lg">AI-powered role creation based on company DNA and gap analysis</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" icon={Target} onClick={analyzeGaps}>
            Analyze Gaps
          </Button>
          <Button variant="primary" icon={Plus} onClick={() => setShowForm(!showForm)}>
            Generate Role
          </Button>
        </div>
      </div>

      {showGapAnalysis && gapAnalysis && (
        <div className="mb-8 bg-gradient-to-br from-warning-50 via-white to-orange-50 rounded-2xl shadow-medium border border-warning-200 overflow-hidden animate-slide-up">
          <div className="bg-gradient-to-r from-warning-500 to-orange-500 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Gap Analysis Results</h3>
                  <p className="text-warning-100 text-sm">Critical insights for team growth</p>
                </div>
              </div>
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                <span className="text-white font-bold text-sm uppercase">{gapAnalysis.urgency} urgency</span>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
          {gapAnalysis.roleGaps.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Briefcase className="h-5 w-5 text-primary-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">Role Gaps</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                {gapAnalysis.roleGaps.map((gap, i) => (
                    <div key={i} className="group relative bg-white rounded-xl p-5 shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 hover:border-primary-300">
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary-500 to-secondary-500 rounded-l-xl"></div>
                      <div className="ml-3">
                        <div className="flex items-start justify-between mb-3">
                          <h5 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{gap.role}</h5>
                          <Badge variant={gap.priority === 'high' ? 'danger' : 'warning'} size="sm">
                            {gap.priority}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">{gap.reason}</p>
                      </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {gapAnalysis.skillGaps.length > 0 && (
              <div className="bg-gradient-to-br from-secondary-50 to-white rounded-xl p-5 border border-secondary-200">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-secondary-100 rounded-lg">
                    <Target className="h-5 w-5 text-secondary-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">Skill Gaps</h4>
                </div>
              <div className="flex flex-wrap gap-2">
                {gapAnalysis.skillGaps.map((gap, i) => (
                    <span key={i} className="px-4 py-2 bg-white text-secondary-700 rounded-full text-sm font-medium shadow-sm border border-secondary-200 hover:shadow-md transition-all">
                    {gap.skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {gapAnalysis.bottlenecks.length > 0 && (
            <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-danger-100 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-danger-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">Critical Bottlenecks</h4>
                </div>
                <div className="space-y-3">
                  {gapAnalysis.bottlenecks.map((bottleneck, i) => (
                    <div key={i} className="bg-gradient-to-r from-danger-50 to-orange-50 rounded-xl p-5 border-l-4 border-danger-500 shadow-sm hover:shadow-md transition-all">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-danger-100 rounded-lg flex-shrink-0">
                          <AlertTriangle className="h-5 w-5 text-danger-600" />
                        </div>
                        <div>
                          <h5 className="font-bold text-danger-900 mb-2 text-lg capitalize">{bottleneck.type.replace('_', ' ')}</h5>
                          <p className="text-danger-700 leading-relaxed">{bottleneck.solution}</p>
                        </div>
                      </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          </div>
        </div>
      )}

      <Modal 
        isOpen={showForm} 
        onClose={() => setShowForm(false)}
        title="Generate New Role"
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
            <Button variant="primary" icon={Sparkles} onClick={generateRole}>
              Generate Role & JD
            </Button>
          </>
        }
      >
        <div className="space-y-6">
          <Input
            label="Role Title"
            placeholder="e.g., Head of Sales"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            icon={Briefcase}
          />
          <Input
            label="Department"
            placeholder="e.g., Sales"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 transition-colors"
            >
              <option value="high">🔴 High Priority</option>
              <option value="medium">🟡 Medium Priority</option>
              <option value="low">🟢 Low Priority</option>
            </select>
          </div>
        </div>
      </Modal>

      <div className="grid lg:grid-cols-2 gap-6">
        {roles.map((role) => (
          <div key={role.id} className="group relative bg-white rounded-2xl shadow-soft hover:shadow-strong transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary-300">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary-400/10 to-secondary-400/10 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500" />
            
            <div className="relative p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4 flex-1">
                  <div className="relative">
                    <div className="p-3 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                      <Briefcase className="h-6 w-6 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">{role.title}</h3>
                    <p className="text-gray-600 font-medium">{role.department}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant={
                    role.priority === 'high' ? 'danger' :
                    role.priority === 'medium' ? 'warning' : 'success'
                  } size="md">
                    {role.priority}
                  </Badge>
                  <span className="text-xs text-gray-500 font-medium">PRIORITY</span>
                </div>
              </div>

            {role.budget && (
              <div className="mb-6 relative overflow-hidden rounded-xl bg-gradient-to-br from-success-500 via-emerald-500 to-teal-500 p-[1px]">
                <div className="bg-white rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gradient-to-br from-success-500 to-emerald-500 rounded-lg">
                      <DollarSign className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-bold text-gray-600 uppercase tracking-wide">Compensation Package</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold bg-gradient-to-r from-success-600 to-emerald-600 bg-clip-text text-transparent">
                      ${role.budget.min}k
                    </span>
                    <span className="text-2xl font-bold text-gray-400">-</span>
                    <span className="text-4xl font-bold bg-gradient-to-r from-success-600 to-emerald-600 bg-clip-text text-transparent">
                      ${role.budget.max}k
                    </span>
                  </div>
                  <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-success-50 rounded-full">
                    <Award className="h-4 w-4 text-success-600" />
                    <span className="text-sm font-medium text-success-700">Equity: {role.budget.equity}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-success-50 to-emerald-50 rounded-xl p-4 border border-success-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-success-500 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <h4 className="font-bold text-success-900">Must Haves</h4>
                </div>
                <ul className="space-y-2">
                  {role.mustHaves?.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-success-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-danger-50 to-rose-50 rounded-xl p-4 border border-danger-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-danger-500 rounded-lg">
                    <XCircle className="h-4 w-4 text-white" />
                  </div>
                  <h4 className="font-bold text-danger-900">Red Flags</h4>
                </div>
                <ul className="space-y-2">
                  {role.redFlags?.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <XCircle className="h-4 w-4 text-danger-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {role.expectedOutcomes && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-bold text-lg text-gray-900">Expected Outcomes</h4>
                </div>
                <div className="space-y-3">
                  <div className="relative pl-6 pb-3 border-l-2 border-primary-300">
                    <div className="absolute left-0 top-0 w-4 h-4 bg-primary-500 rounded-full -translate-x-[9px] ring-4 ring-primary-100"></div>
                    <div className="bg-gradient-to-r from-primary-50 to-transparent rounded-lg p-4 border border-primary-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-primary-600" />
                        <span className="font-bold text-primary-700">30 Days</span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{role.expectedOutcomes['30_days']}</p>
                    </div>
                  </div>
                  <div className="relative pl-6 pb-3 border-l-2 border-secondary-300">
                    <div className="absolute left-0 top-0 w-4 h-4 bg-secondary-500 rounded-full -translate-x-[9px] ring-4 ring-secondary-100"></div>
                    <div className="bg-gradient-to-r from-secondary-50 to-transparent rounded-lg p-4 border border-secondary-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-secondary-600" />
                        <span className="font-bold text-secondary-700">60 Days</span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{role.expectedOutcomes['60_days']}</p>
                    </div>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-0 w-4 h-4 bg-success-500 rounded-full -translate-x-[9px] ring-4 ring-success-100"></div>
                    <div className="bg-gradient-to-r from-success-50 to-transparent rounded-lg p-4 border border-success-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-success-600" />
                        <span className="font-bold text-success-700">90 Days</span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{role.expectedOutcomes['90_days']}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <Button 
                variant="primary" 
                size="md" 
                icon={Eye}
                onClick={() => {
                  setSelectedRole(role)
                  setSidebarOpen(true)
                }}
                className="flex-1 mr-3"
              >
                View Full Details
              </Button>
              <div className="flex gap-2">
                <button className="p-3 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all border border-gray-200 hover:border-primary-300">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-3 text-gray-500 hover:text-secondary-600 hover:bg-secondary-50 rounded-xl transition-all border border-gray-200 hover:border-secondary-300">
                  <Copy className="h-4 w-4" />
                </button>
                <button className="p-3 text-gray-500 hover:text-success-600 hover:bg-success-50 rounded-xl transition-all border border-gray-200 hover:border-success-300">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            </div>
          </div>
        ))}
      </div>

      {roles.length === 0 && (
        <Card className="text-center py-16">
          <div className="flex justify-center mb-6">
            <div className="p-6 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full">
              <Briefcase className="h-16 w-16 text-primary-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No Roles Yet</h3>
          <p className="text-gray-600 mb-6">Start by analyzing gaps or generating your first role</p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" icon={Target} onClick={analyzeGaps}>
              Analyze Gaps
            </Button>
            <Button variant="primary" icon={Plus} onClick={() => setShowForm(true)}>
              Generate First Role
            </Button>
        </div>
        </Card>
      )}

      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        title={selectedRole?.title || 'Role Details'}
        width="large"
      >
        {selectedRole && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedRole.title}</h3>
                  <p className="text-gray-600">{selectedRole.department}</p>
                </div>
              </div>
              <Badge variant={
                selectedRole.priority === 'high' ? 'danger' :
                selectedRole.priority === 'medium' ? 'warning' : 'success'
              } size="lg">
                {selectedRole.priority} priority
              </Badge>
            </div>

            <Tabs
              defaultTab={0}
              tabs={[
                {
                  label: 'Overview',
                  icon: Eye,
                  content: (
                    <div className="space-y-6">
                      {selectedRole.budget && (
                        <Card className="bg-gradient-to-br from-success-50 to-primary-50 border border-success-200">
                          <div className="flex items-center gap-3 mb-3">
                            <DollarSign className="h-6 w-6 text-success-600" />
                            <div>
                              <p className="text-sm font-medium text-gray-700">Compensation Package</p>
                              <p className="text-3xl font-bold text-gray-900">${selectedRole.budget.min}k - ${selectedRole.budget.max}k</p>
                              <p className="text-sm text-gray-600 mt-1">Equity: {selectedRole.budget.equity}</p>
                            </div>
                          </div>
                        </Card>
                      )}

                      <div className="grid md:grid-cols-3 gap-4">
                        <Card className="text-center">
                          <Users className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                          <p className="text-2xl font-bold text-gray-900">12</p>
                          <p className="text-sm text-gray-600">Candidates</p>
                        </Card>
                        <Card className="text-center">
                          <Clock className="h-8 w-8 text-secondary-600 mx-auto mb-2" />
                          <p className="text-2xl font-bold text-gray-900">45</p>
                          <p className="text-sm text-gray-600">Days to Fill</p>
                        </Card>
                        <Card className="text-center">
                          <TrendingUp className="h-8 w-8 text-success-600 mx-auto mb-2" />
                          <p className="text-2xl font-bold text-gray-900">85%</p>
                          <p className="text-sm text-gray-600">Success Rate</p>
                        </Card>
                      </div>

                      <Card>
                        <h4 className="font-bold text-lg mb-4 flex items-center">
                          <BarChart3 className="h-5 w-5 mr-2 text-primary-600" />
                          Hiring Progress
                        </h4>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">Applications</span>
                              <span className="text-sm font-bold text-gray-900">12 / 50</span>
                            </div>
                            <ProgressBar value={24} max={100} color="primary" showLabel />
                          </div>
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">Screening</span>
                              <span className="text-sm font-bold text-gray-900">8 / 12</span>
                            </div>
                            <ProgressBar value={66} max={100} color="secondary" showLabel />
                          </div>
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">Interviews</span>
                              <span className="text-sm font-bold text-gray-900">5 / 8</span>
                            </div>
                            <ProgressBar value={62} max={100} color="success" showLabel />
                          </div>
                        </div>
                      </Card>

                      <Card>
                        <h4 className="font-bold text-lg mb-4 flex items-center">
                          <CheckCircle className="h-5 w-5 mr-2 text-success-600" />
                          Must Haves
                        </h4>
                        <ul className="space-y-3">
                          {selectedRole.mustHaves?.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 p-3 bg-success-50 rounded-lg border border-success-100">
                              <CheckCircle className="h-5 w-5 text-success-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>

                      <Card>
                        <h4 className="font-bold text-lg mb-4 flex items-center">
                          <XCircle className="h-5 w-5 mr-2 text-danger-600" />
                          Red Flags
                        </h4>
                        <ul className="space-y-3">
                          {selectedRole.redFlags?.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 p-3 bg-danger-50 rounded-lg border border-danger-100">
                              <XCircle className="h-5 w-5 text-danger-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>
                    </div>
                  )
                },
                {
                  label: 'Expected Outcomes',
                  icon: TrendingUp,
                  content: selectedRole.expectedOutcomes && (
                    <div className="space-y-4">
                      <Card className="bg-gradient-to-r from-primary-50 to-transparent border-l-4 border-primary-500">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-primary-100 rounded-lg">
                            <Calendar className="h-5 w-5 text-primary-600" />
                          </div>
                          <span className="text-xl font-bold text-primary-700">30 Days</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{selectedRole.expectedOutcomes['30_days']}</p>
                      </Card>
                      <Card className="bg-gradient-to-r from-secondary-50 to-transparent border-l-4 border-secondary-500">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-secondary-100 rounded-lg">
                            <Calendar className="h-5 w-5 text-secondary-600" />
                          </div>
                          <span className="text-xl font-bold text-secondary-700">60 Days</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{selectedRole.expectedOutcomes['60_days']}</p>
                      </Card>
                      <Card className="bg-gradient-to-r from-success-50 to-transparent border-l-4 border-success-500">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-success-100 rounded-lg">
                            <Calendar className="h-5 w-5 text-success-600" />
                          </div>
                          <span className="text-xl font-bold text-success-700">90 Days</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{selectedRole.expectedOutcomes['90_days']}</p>
                      </Card>

                      <Card className="bg-warning-50 border border-warning-200">
                        <div className="flex items-start gap-3">
                          <Zap className="h-5 w-5 text-warning-600 mt-1" />
                          <div>
                            <h5 className="font-bold text-warning-900 mb-2">Success Indicators</h5>
                            <ul className="space-y-2 text-sm text-warning-800">
                              <li>• Clear communication with team members</li>
                              <li>• Meeting weekly targets consistently</li>
                              <li>• Positive feedback from stakeholders</li>
                              <li>• Proactive problem-solving approach</li>
                            </ul>
                          </div>
                        </div>
                      </Card>
                    </div>
                  )
                },
                {
                  label: 'Job Description',
                  icon: FileText,
                  content: selectedRole.jdText && (
                    <div className="space-y-6">
                      <Card className="bg-gray-50 border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-lg">Full Job Description</h4>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" icon={Copy}>Copy</Button>
                            <Button variant="outline" size="sm" icon={Share2}>Share</Button>
                            <Button variant="outline" size="sm" icon={Globe}>Publish</Button>
                          </div>
                        </div>
                        <div className="prose max-w-none">
                          <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed font-sans bg-white p-4 rounded-lg border border-gray-200">
{selectedRole.jdText}
                          </pre>
                        </div>
                      </Card>

                      <Card>
                        <h4 className="font-bold text-lg mb-4 flex items-center">
                          <Award className="h-5 w-5 mr-2 text-primary-600" />
                          Required Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {['Sales Strategy', 'Team Leadership', 'B2B Sales', 'CRM Systems', 'Negotiation', 'Cold Calling', 'Pipeline Management', 'SaaS Experience'].map((skill, i) => (
                            <Badge key={i} variant="primary">{skill}</Badge>
                          ))}
                        </div>
                      </Card>

                      <Card>
                        <h4 className="font-bold text-lg mb-4 flex items-center">
                          <Users className="h-5 w-5 mr-2 text-secondary-600" />
                          Team Structure
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-gray-700">Reports to</span>
                            <span className="font-bold text-gray-900">CEO / Founder</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-gray-700">Direct Reports</span>
                            <span className="font-bold text-gray-900">0-2 initially</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-gray-700">Cross-functional</span>
                            <span className="font-bold text-gray-900">Product, Marketing</span>
                          </div>
                        </div>
                      </Card>
                    </div>
                  )
                },
                {
                  label: 'Analytics',
                  icon: BarChart3,
                  badge: 'New',
                  content: (
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <Card className="bg-primary-50 border border-primary-200">
                          <div className="flex items-center gap-3 mb-2">
                            <TrendingUp className="h-5 w-5 text-primary-600" />
                            <h5 className="font-bold text-primary-900">Application Rate</h5>
                          </div>
                          <p className="text-3xl font-bold text-primary-700">2.4 / day</p>
                          <p className="text-sm text-primary-600 mt-1">+12% from average</p>
                        </Card>
                        <Card className="bg-success-50 border border-success-200">
                          <div className="flex items-center gap-3 mb-2">
                            <CheckCircle className="h-5 w-5 text-success-600" />
                            <h5 className="font-bold text-success-900">Quality Score</h5>
                          </div>
                          <p className="text-3xl font-bold text-success-700">8.5 / 10</p>
                          <p className="text-sm text-success-600 mt-1">Above target</p>
                        </Card>
                      </div>

                      <Card>
                        <h4 className="font-bold text-lg mb-4">Candidate Sources</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-600">LinkedIn</span>
                              <span className="text-sm font-bold text-gray-900">45%</span>
                            </div>
                            <ProgressBar value={45} color="primary" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-600">Referrals</span>
                              <span className="text-sm font-bold text-gray-900">30%</span>
                            </div>
                            <ProgressBar value={30} color="success" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-600">Indeed</span>
                              <span className="text-sm font-bold text-gray-900">15%</span>
                            </div>
                            <ProgressBar value={15} color="secondary" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-600">Direct</span>
                              <span className="text-sm font-bold text-gray-900">10%</span>
                            </div>
                            <ProgressBar value={10} color="warning" />
                          </div>
                        </div>
                      </Card>

                      <Card className="bg-danger-50 border border-danger-200">
                        <div className="flex items-start gap-3">
                          <TrendingDown className="h-5 w-5 text-danger-600 mt-1" />
                          <div>
                            <h5 className="font-bold text-danger-900 mb-2">Improvement Areas</h5>
                            <ul className="space-y-2 text-sm text-danger-800">
                              <li>• Response time averaging 3.2 days (target: &lt;2 days)</li>
                              <li>• Interview-to-offer conversion at 18% (target: &gt;25%)</li>
                              <li>• Consider expanding candidate sourcing channels</li>
                            </ul>
                          </div>
                        </div>
                      </Card>
                    </div>
                  )
                }
              ]}
            />
          </div>
        )}
      </Sidebar>
    </div>
  )
}
