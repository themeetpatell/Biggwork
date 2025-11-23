import { useState, useEffect } from 'react'
import { CandidateEvaluation } from '../services/candidateEvaluation'
import { DNAScanner } from '../services/dnaScanner'
import { 
  Users, TrendingUp, AlertCircle, Plus, Filter, Search, BarChart3, 
  CheckCircle, XCircle, Clock, Mail, Phone, Linkedin, FileText,
  Award, Target, Zap, MessageSquare, Calendar, Download, Share2,
  ThumbsUp, ThumbsDown, Eye, Edit, MapPin, Briefcase
} from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
import Modal from '../components/Modal'
import Input from '../components/Input'
import Sidebar from '../components/Sidebar'
import Tabs from '../components/Tabs'
import ProgressBar from '../components/ProgressBar'
import StatCard from '../components/StatCard'

export default function Candidates() {
  const [candidates, setCandidates] = useState([])
  const [companyDNA, setCompanyDNA] = useState(null)
  const [currentTeam, setCurrentTeam] = useState([])
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    loadData()
    loadCandidates()
  }, [])

  const loadData = async () => {
    const saved = localStorage.getItem('biggwork_company')
    if (saved) {
      const companyData = JSON.parse(saved)
      const scanner = new DNAScanner()
      const result = await scanner.scanCompany(companyData)
      setCompanyDNA(result)
    }
  }

  const loadCandidates = () => {
    const saved = localStorage.getItem('biggwork_candidates')
    if (saved) {
      setCandidates(JSON.parse(saved))
    } else {
      const defaultCandidates = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1 (555) 123-4567',
          linkedin: 'linkedin.com/in/johndoe',
          location: 'San Francisco, CA',
          role: 'Head of Sales',
          status: 'evaluated',
          experience: [
            { stage: 'seed', role: 'Sales Lead', company: 'TechStartup', duration: '2 years', companySize: 20 },
            { stage: 'series_a', role: 'VP Sales', company: 'SaaS Co', duration: '3 years', companySize: 50 }
          ],
          skills: ['B2B Sales', 'SaaS', 'Team Leadership', 'Cold Calling', 'CRM'],
          values: ['speed', 'ownership', 'experimentation'],
          salaryExpectation: 150,
          fitScore: 78,
          evaluation: {
            scores: {
              overall: 78,
              stageFit: 95,
              cultureFit: 90,
              teamFit: 85,
              velocityFit: 90,
              growthFit: 50,
              builderMindset: 75,
              learningSpeed: 85
            },
            recommendation: 'hire',
            successProbability: 82,
            risks: []
          },
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '+1 (555) 987-6543',
          linkedin: 'linkedin.com/in/janesmith',
          location: 'New York, NY',
          role: 'Product Manager',
          status: 'applied',
          experience: [
            { stage: 'series_a', role: 'Product Manager', company: 'Growth Inc', duration: '3 years', companySize: 75 }
          ],
          skills: ['Product Strategy', 'User Research', 'Agile', 'Data Analysis'],
          values: ['experimentation', 'ownership', 'learning'],
          salaryExpectation: 180,
          fitScore: null,
          createdAt: new Date().toISOString(),
        },
      ]
      setCandidates(defaultCandidates)
      localStorage.setItem('biggwork_candidates', JSON.stringify(defaultCandidates))
    }
  }

  const evaluateCandidate = (candidate) => {
    if (!companyDNA) return
    
    const evaluator = new CandidateEvaluation()
    const evaluation = evaluator.evaluateCandidate(candidate, companyDNA, currentTeam, candidate.role)
    
    const updated = candidates.map(c => 
      c.id === candidate.id 
        ? { ...c, evaluation, fitScore: evaluation.scores.overall, status: 'evaluated' }
        : c
    )
    setCandidates(updated)
    localStorage.setItem('biggwork_candidates', JSON.stringify(updated))
  }

  const updateCandidateStatus = (candidateId, newStatus) => {
    const updated = candidates.map(c => 
      c.id === candidateId ? { ...c, status: newStatus } : c
    )
    setCandidates(updated)
    localStorage.setItem('biggwork_candidates', JSON.stringify(updated))
  }

  const filteredCandidates = candidates.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         c.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' || c.status === filter
    return matchesSearch && matchesFilter
  })

  const pipelineStats = {
    applied: candidates.filter(c => c.status === 'applied').length,
    evaluated: candidates.filter(c => c.status === 'evaluated').length,
    interview: candidates.filter(c => c.status === 'interview').length,
    offer: candidates.filter(c => c.status === 'offer').length,
    hired: candidates.filter(c => c.status === 'hired').length,
  }

  const getFitColor = (score) => {
    if (score >= 80) return 'success'
    if (score >= 60) return 'warning'
    return 'danger'
  }

  const getFitLabel = (score) => {
    if (score >= 80) return 'Excellent Fit'
    if (score >= 60) return 'Good Fit'
    return 'Poor Fit'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-3">
            Talent Pipeline
          </h1>
          <p className="text-gray-600 text-lg">Multi-dimensional candidate evaluation and ATS</p>
        </div>
        <Button variant="primary" icon={Plus} onClick={() => setShowAddForm(true)}>
          Add Candidate
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <StatCard title="Applied" value={pipelineStats.applied} icon={Users} color="primary" />
        <StatCard title="Evaluated" value={pipelineStats.evaluated} icon={BarChart3} color="secondary" />
        <StatCard title="Interview" value={pipelineStats.interview} icon={MessageSquare} color="warning" />
        <StatCard title="Offer" value={pipelineStats.offer} icon={CheckCircle} color="success" />
        <StatCard title="Hired" value={pipelineStats.hired} icon={Award} color="primary" />
      </div>

      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Status</option>
            <option value="applied">Applied</option>
            <option value="evaluated">Evaluated</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="hired">Hired</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </Card>

      <div className="space-y-4">
        {filteredCandidates.map((candidate) => (
          <Card key={candidate.id} hover className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 rounded-full -mr-16 -mt-16" />
            
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{candidate.name}</h3>
                      <Badge variant={
                        candidate.status === 'hired' ? 'success' :
                        candidate.status === 'offer' ? 'primary' :
                        candidate.status === 'interview' ? 'warning' :
                        candidate.status === 'evaluated' ? 'secondary' : 'gray'
                      }>
                        {candidate.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {candidate.email}
                      </span>
                      {candidate.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {candidate.phone}
                        </span>
                      )}
                      {candidate.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {candidate.location}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mt-1 flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      Role: <span className="font-medium text-gray-900">{candidate.role}</span>
                    </p>
                  </div>
                </div>

                {candidate.fitScore && (
                  <div className="text-right">
                    <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-1">
                      {candidate.fitScore}%
                    </div>
                    <p className="text-sm text-gray-600">Fit Score</p>
                    <Badge variant={getFitColor(candidate.fitScore)} size="sm">
                      {getFitLabel(candidate.fitScore)}
                    </Badge>
                  </div>
                )}
              </div>

              {candidate.evaluation && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  <div className="p-3 bg-primary-50 rounded-lg border border-primary-100">
                    <p className="text-xs text-primary-600 font-medium mb-1">Stage Fit</p>
                    <p className="text-2xl font-bold text-primary-700">{candidate.evaluation.scores.stageFit}%</p>
                  </div>
                  <div className="p-3 bg-secondary-50 rounded-lg border border-secondary-100">
                    <p className="text-xs text-secondary-600 font-medium mb-1">Culture Fit</p>
                    <p className="text-2xl font-bold text-secondary-700">{candidate.evaluation.scores.cultureFit}%</p>
                  </div>
                  <div className="p-3 bg-success-50 rounded-lg border border-success-100">
                    <p className="text-xs text-success-600 font-medium mb-1">Team Fit</p>
                    <p className="text-2xl font-bold text-success-700">{candidate.evaluation.scores.teamFit}%</p>
                  </div>
                  <div className="p-3 bg-warning-50 rounded-lg border border-warning-100">
                    <p className="text-xs text-warning-600 font-medium mb-1">Growth Fit</p>
                    <p className="text-2xl font-bold text-warning-700">{candidate.evaluation.scores.growthFit}%</p>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex gap-2">
                  {!candidate.evaluation && (
                    <Button 
                      variant="primary" 
                      size="sm" 
                      icon={BarChart3}
                      onClick={() => evaluateCandidate(candidate)}
                    >
                      Evaluate
                    </Button>
                  )}
                  {candidate.evaluation?.recommendation === 'hire' && candidate.status !== 'hired' && (
                    <Button 
                      variant="success" 
                      size="sm" 
                      icon={CheckCircle}
                      onClick={() => updateCandidateStatus(candidate.id, 'offer')}
                    >
                      Make Offer
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    icon={Eye}
                    onClick={() => {
                      setSelectedCandidate(candidate)
                      setSidebarOpen(true)
                    }}
                  >
                    View Details
                  </Button>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                    <MessageSquare className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                    <Calendar className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                    <Download className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-danger-600 hover:bg-danger-50 rounded-lg transition-colors">
                    <XCircle className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredCandidates.length === 0 && (
        <Card className="text-center py-16">
          <div className="flex justify-center mb-6">
            <div className="p-6 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full">
              <Users className="h-16 w-16 text-primary-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No Candidates Found</h3>
          <p className="text-gray-600 mb-6">Start by adding your first candidate to the pipeline</p>
          <Button variant="primary" icon={Plus} onClick={() => setShowAddForm(true)}>
            Add First Candidate
          </Button>
        </Card>
      )}

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        title={selectedCandidate?.name || 'Candidate Details'}
        width="large"
      >
        {selectedCandidate && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedCandidate.name}</h3>
                  <p className="text-gray-600">{selectedCandidate.role}</p>
                </div>
              </div>
              {selectedCandidate.fitScore && (
                <div className="text-right">
                  <div className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    {selectedCandidate.fitScore}%
                  </div>
                  <Badge variant={getFitColor(selectedCandidate.fitScore)} size="lg">
                    {getFitLabel(selectedCandidate.fitScore)}
                  </Badge>
                </div>
              )}
            </div>

            <Tabs
              defaultTab={0}
              tabs={[
                {
                  label: 'Overview',
                  icon: Eye,
                  content: (
                    <div className="space-y-6">
                      <Card>
                        <h4 className="font-bold text-lg mb-4">Contact Information</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-primary-600" />
                            <span className="text-gray-700">{selectedCandidate.email}</span>
                          </div>
                          {selectedCandidate.phone && (
                            <div className="flex items-center gap-3">
                              <Phone className="h-5 w-5 text-primary-600" />
                              <span className="text-gray-700">{selectedCandidate.phone}</span>
                            </div>
                          )}
                          {selectedCandidate.linkedin && (
                            <div className="flex items-center gap-3">
                              <Linkedin className="h-5 w-5 text-primary-600" />
                              <a href={`https://${selectedCandidate.linkedin}`} className="text-primary-600 hover:underline">
                                {selectedCandidate.linkedin}
                              </a>
                            </div>
                          )}
                          {selectedCandidate.location && (
                            <div className="flex items-center gap-3">
                              <MapPin className="h-5 w-5 text-primary-600" />
                              <span className="text-gray-700">{selectedCandidate.location}</span>
                            </div>
                          )}
                        </div>
                      </Card>

                      <Card>
                        <h4 className="font-bold text-lg mb-4 flex items-center">
                          <Award className="h-5 w-5 mr-2 text-primary-600" />
                          Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedCandidate.skills?.map((skill, i) => (
                            <Badge key={i} variant="primary">{skill}</Badge>
                          ))}
                        </div>
                      </Card>

                      <Card>
                        <h4 className="font-bold text-lg mb-4 flex items-center">
                          <Target className="h-5 w-5 mr-2 text-secondary-600" />
                          Core Values
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedCandidate.values?.map((value, i) => (
                            <Badge key={i} variant="secondary">{value}</Badge>
                          ))}
                        </div>
                      </Card>

                      <Card>
                        <h4 className="font-bold text-lg mb-4 flex items-center">
                          <Briefcase className="h-5 w-5 mr-2 text-success-600" />
                          Experience
                        </h4>
                        <div className="space-y-4">
                          {selectedCandidate.experience?.map((exp, i) => (
                            <div key={i} className="border-l-4 border-primary-500 pl-4">
                              <h5 className="font-bold text-gray-900">{exp.role}</h5>
                              <p className="text-gray-600">{exp.company} • {exp.duration}</p>
                              <div className="flex gap-2 mt-2">
                                <Badge variant="primary" size="sm">{exp.stage}</Badge>
                                <Badge variant="gray" size="sm">{exp.companySize} people</Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </div>
                  )
                },
                {
                  label: 'Evaluation',
                  icon: BarChart3,
                  content: selectedCandidate.evaluation && (
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        {Object.entries(selectedCandidate.evaluation.scores).filter(([key]) => key !== 'overall').map(([key, value]) => (
                          <Card key={key} className="bg-gradient-to-br from-gray-50 to-white">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h5>
                              <span className="text-2xl font-bold text-primary-600">{value}%</span>
                            </div>
                            <ProgressBar value={value} color={getFitColor(value)} />
                          </Card>
                        ))}
                      </div>

                      <Card className={`border-l-4 ${
                        selectedCandidate.evaluation.recommendation === 'hire' ? 'bg-success-50 border-success-500' :
                        selectedCandidate.evaluation.recommendation === 'consider' ? 'bg-warning-50 border-warning-500' :
                        'bg-danger-50 border-danger-500'
                      }`}>
                        <div className="flex items-start gap-3">
                          {selectedCandidate.evaluation.recommendation === 'hire' ? (
                            <CheckCircle className="h-6 w-6 text-success-600 mt-1" />
                          ) : selectedCandidate.evaluation.recommendation === 'consider' ? (
                            <AlertCircle className="h-6 w-6 text-warning-600 mt-1" />
                          ) : (
                            <XCircle className="h-6 w-6 text-danger-600 mt-1" />
                          )}
                          <div>
                            <h5 className="font-bold text-lg mb-2 capitalize">
                              Recommendation: {selectedCandidate.evaluation.recommendation}
                            </h5>
                            <p className="text-gray-700">
                              Success Probability: <span className="font-bold">{selectedCandidate.evaluation.successProbability}%</span>
                            </p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  )
                },
                {
                  label: 'Activity',
                  icon: Clock,
                  badge: 'New',
                  content: (
                    <div className="space-y-4">
                      <Card>
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-primary-100 rounded-lg">
                            <Clock className="h-5 w-5 text-primary-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Applied</p>
                            <p className="text-sm text-gray-600">2 days ago</p>
                          </div>
                        </div>
                      </Card>
                      {selectedCandidate.evaluation && (
                        <Card>
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-secondary-100 rounded-lg">
                              <BarChart3 className="h-5 w-5 text-secondary-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">Evaluated</p>
                              <p className="text-sm text-gray-600">1 day ago</p>
                            </div>
                          </div>
                        </Card>
                      )}
                    </div>
                  )
                }
              ]}
            />

            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <Button variant="success" icon={CheckCircle} className="flex-1">
                Move to Interview
              </Button>
              <Button variant="outline" icon={Share2}>
                Share
              </Button>
              <Button variant="ghost" icon={Download}>
                Download
              </Button>
            </div>
          </div>
        )}
      </Sidebar>
    </div>
  )
}
