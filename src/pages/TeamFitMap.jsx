import { useState, useEffect } from 'react'
import { TeamFitMap } from '../services/teamFitMap'
import { Users, Network, TrendingUp, AlertTriangle, CheckCircle, Zap, Target } from 'lucide-react'
import Card from '../components/Card'
import StatCard from '../components/StatCard'
import Badge from '../components/Badge'
import { PieChartComponent, BarChartComponent } from '../components/Chart'

export default function TeamFitMapPage() {
  const [teamService] = useState(() => new TeamFitMap())
  const [composition, setComposition] = useState(null)
  const [teamMembers, setTeamMembers] = useState([])
  const [gaps, setGaps] = useState([])
  const [visualization, setVisualization] = useState(null)
  const [selectedMember, setSelectedMember] = useState(null)
  const [candidateSimulation, setCandidateSimulation] = useState(null)
  const [showSimulation, setShowSimulation] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    setComposition(teamService.analyzeTeamComposition())
    setTeamMembers(teamService.getTeamMembers())
    setGaps(teamService.identifySkillGaps())
    setVisualization(teamService.getTeamVisualizationData())
  }

  const simulateNewHire = () => {
    const testCandidate = {
      name: 'Test Candidate',
      role: 'Full Stack Engineer',
      department: 'Engineering',
      skills: ['React', 'Python', 'PostgreSQL', 'Security'],
      personality: 'analytical',
      workStyle: 'collaborative',
      velocity: 'high',
      cultureFit: 88
    }

    const analysis = teamService.analyzeNewHireFit(testCandidate)
    setCandidateSimulation({ candidate: testCandidate, analysis })
    setShowSimulation(true)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-3">
          Team Fit Map
        </h1>
        <p className="text-gray-600 text-lg">Organizational intelligence, team composition, and new hire impact analysis</p>
      </div>

      {composition && (
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Team Members"
            value={composition.totalMembers}
            icon={Users}
            color="primary"
          />
          <StatCard
            title="Avg Culture Fit"
            value={`${composition.avgCultureFit}%`}
            icon={CheckCircle}
            color="success"
          />
          <StatCard
            title="Skill Coverage"
            value={Object.keys(composition.skills).length}
            icon={Target}
            color="secondary"
          />
          <StatCard
            title="Avg Tenure"
            value={`${composition.avgTenure}mo`}
            icon={TrendingUp}
            color="warning"
          />
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Network className="h-5 w-5 mr-2 text-primary-600" />
            Team Composition
          </h2>
          {visualization && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Department Distribution</h3>
                <PieChartComponent
                  data={visualization.departments}
                  dataKey="value"
                  nameKey="name"
                  height={200}
                />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Work Style Balance</h3>
                <div className="space-y-2">
                  {visualization.workStyles.map((ws, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 capitalize">{ws.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-primary-600 to-secondary-600 h-2 rounded-full"
                            style={{ width: `${(ws.value / composition.totalMembers) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-gray-900 w-8">{ws.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Target className="h-5 w-5 mr-2 text-secondary-600" />
            Skill Coverage Map
          </h2>
          {visualization && (
            <BarChartComponent
              data={visualization.skills}
              dataKey="value"
              xAxisKey="name"
              height={300}
            />
          )}
        </Card>
      </div>

      <Card className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-warning-600" />
          Skill Gaps & Recommendations
        </h2>
        {gaps.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-success-600 mx-auto mb-3" />
            <p className="text-gray-600">No critical skill gaps identified</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {gaps.map((gap, i) => (
              <div
                key={i}
                className={`p-4 rounded-lg border-l-4 ${
                  gap.severity === 'high'
                    ? 'bg-danger-50 border-danger-500'
                    : 'bg-warning-50 border-warning-500'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-gray-900">{gap.skill}</h3>
                  <Badge variant={gap.severity === 'high' ? 'danger' : 'warning'}>
                    {gap.severity} priority
                  </Badge>
                </div>
                <p className="text-sm text-gray-700 mb-2">{gap.impact}</p>
                <p className="text-sm text-gray-600 font-medium">{gap.recommendation}</p>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <Users className="h-5 w-5 mr-2 text-indigo-600" />
            Team Members ({teamMembers.length})
          </h2>
          <button
            onClick={simulateNewHire}
            className="px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            <Zap className="h-4 w-4 inline mr-2" />
            Simulate New Hire
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className="p-5 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                  <Badge variant="primary" size="sm" className="mt-1">
                    {member.department}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Culture Fit</p>
                  <p className="text-2xl font-bold text-primary-600">{member.cultureFit}%</p>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {member.skills.slice(0, 4).map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                    {member.skills.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        +{member.skills.length - 4}
                      </span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500">Tenure: </span>
                    <span className="font-medium">{member.tenure}mo</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Style: </span>
                    <span className="font-medium capitalize">{member.workStyle}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Velocity: </span>
                    <span className="font-medium capitalize">{member.velocity}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {showSimulation && candidateSimulation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">New Hire Impact Analysis</h2>
                <p className="text-gray-600">{candidateSimulation.candidate.name} - {candidateSimulation.candidate.role}</p>
              </div>
              <button
                onClick={() => setShowSimulation(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="mb-6 p-6 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl border border-primary-200">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600 mb-2">Overall Team Fit Score</p>
                <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
                  {candidateSimulation.analysis.overallFitScore}%
                </p>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Badge
                  variant={
                    candidateSimulation.analysis.recommendation.verdict === 'strong_hire' ? 'success' :
                    candidateSimulation.analysis.recommendation.verdict === 'good_hire' ? 'primary' :
                    candidateSimulation.analysis.recommendation.verdict === 'consider' ? 'warning' : 'danger'
                  }
                  size="lg"
                >
                  {candidateSimulation.analysis.recommendation.verdict.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
              <p className="text-center text-gray-700 mt-3">
                {candidateSimulation.analysis.recommendation.message}
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-primary-50 rounded-lg">
                <p className="text-xs text-primary-600 font-medium mb-1">Skill Gap Coverage</p>
                <p className="text-3xl font-bold text-primary-700">{candidateSimulation.analysis.skillGapCoverage}%</p>
              </div>
              <div className="p-4 bg-secondary-50 rounded-lg">
                <p className="text-xs text-secondary-600 font-medium mb-1">Velocity Balance</p>
                <p className="text-3xl font-bold text-secondary-700">{candidateSimulation.analysis.velocityBalance}%</p>
              </div>
              <div className="p-4 bg-success-50 rounded-lg">
                <p className="text-xs text-success-600 font-medium mb-1">Culture Alignment</p>
                <p className="text-3xl font-bold text-success-700">{candidateSimulation.analysis.cultureAlignment}%</p>
              </div>
              <div className="p-4 bg-warning-50 rounded-lg">
                <p className="text-xs text-warning-600 font-medium mb-1">Diversity Impact</p>
                <p className="text-3xl font-bold text-warning-700">{candidateSimulation.analysis.teamDiversityImpact}%</p>
              </div>
            </div>

            {candidateSimulation.analysis.coveredGaps.length > 0 && (
              <div className="mb-6 p-4 bg-success-50 border border-success-200 rounded-lg">
                <h3 className="font-bold text-success-900 mb-2 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Critical Skills Covered
                </h3>
                <div className="flex flex-wrap gap-2">
                  {candidateSimulation.analysis.coveredGaps.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-success-100 text-success-700 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {candidateSimulation.analysis.synergies.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-3">Team Synergies</h3>
                <div className="space-y-2">
                  {candidateSimulation.analysis.synergies.map((synergy, i) => (
                    <div key={i} className="p-3 bg-primary-50 border border-primary-200 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{synergy.with}</p>
                          <p className="text-sm text-gray-600">{synergy.reason}</p>
                        </div>
                        <Badge variant="primary" size="sm">{synergy.strength}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {candidateSimulation.analysis.potentialConflicts.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-warning-600" />
                  Potential Friction Points
                </h3>
                <div className="space-y-2">
                  {candidateSimulation.analysis.potentialConflicts.map((conflict, i) => (
                    <div key={i} className="p-3 bg-warning-50 border border-warning-200 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{conflict.with}</p>
                          <p className="text-sm text-gray-600">{conflict.reason}</p>
                        </div>
                        <Badge variant="warning" size="sm">{conflict.severity}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="font-bold text-gray-900 mb-3">Team Impact Assessment</h3>
              <div className="space-y-2">
                {candidateSimulation.analysis.teamImpact.map((impact, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-lg border-l-4 ${
                      impact.type === 'positive' ? 'bg-success-50 border-success-500' :
                      impact.type === 'caution' ? 'bg-warning-50 border-warning-500' :
                      'bg-gray-50 border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-bold text-gray-900 mb-1">{impact.area}</p>
                        <p className="text-sm text-gray-700">{impact.description}</p>
                      </div>
                      <Badge
                        variant={
                          impact.type === 'positive' ? 'success' :
                          impact.type === 'caution' ? 'warning' : 'gray'
                        }
                        size="sm"
                      >
                        {impact.magnitude}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowSimulation(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

