import { useState, useEffect } from 'react'
import { ExitIntelligence } from '../services/exitIntelligence'
import { AlertTriangle, TrendingDown, Users, FileText, BarChart3, MessageSquare } from 'lucide-react'

export default function ExitIntelligencePage() {
  const [exitService] = useState(() => new ExitIntelligence())
  const [employees, setEmployees] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [exitRisk, setExitRisk] = useState(null)
  const [exitHistory, setExitHistory] = useState([])
  const [analytics, setAnalytics] = useState(null)
  const [showExitPlan, setShowExitPlan] = useState(false)
  const [showInterview, setShowInterview] = useState(false)
  const [interviewData, setInterviewData] = useState({
    overallExperience: 5,
    cultureFit: 5,
    managementFeedback: '',
    whatWorked: '',
    whatDidntWork: '',
    suggestions: '',
    wouldRecommend: false,
    exitReason: ''
  })

  useEffect(() => {
    loadEmployees()
    loadExitHistory()
    loadAnalytics()
  }, [])

  const loadEmployees = () => {
    const saved = localStorage.getItem('biggwork_employees')
    const employeesData = saved ? JSON.parse(saved) : [
      { id: '1', name: 'John Doe', role: 'Senior Engineer', tenure: 8, alignmentScore: 75, engagementScore: 70 },
      { id: '2', name: 'Jane Smith', role: 'Product Manager', tenure: 3, alignmentScore: 45, engagementScore: 40, roleMismatch: true },
      { id: '3', name: 'Bob Johnson', role: 'Designer', tenure: 12, alignmentScore: 85, engagementScore: 80 }
    ]
    setEmployees(employeesData)
  }

  const loadExitHistory = () => {
    setExitHistory(exitService.getExitHistory())
  }

  const loadAnalytics = () => {
    setAnalytics(exitService.getExitAnalytics())
  }

  const analyzeExitRisk = (employee) => {
    const companyDNA = JSON.parse(localStorage.getItem('biggwork_company') || '{}')
    const risk = exitService.predictExitRisk(employee, companyDNA)
    setExitRisk(risk)
    setSelectedEmployee(employee)
  }

  const handleCreateExitPlan = () => {
    if (!selectedEmployee) return
    const exitPlan = exitService.createExitPlan(selectedEmployee, exitRisk?.riskFactors[0]?.type || 'voluntary')
    setShowExitPlan(false)
    loadExitHistory()
    loadAnalytics()
  }

  const handleConductInterview = (exitId) => {
    exitService.conductExitInterview(exitId, interviewData)
    setShowInterview(false)
    setInterviewData({
      overallExperience: 5,
      cultureFit: 5,
      managementFeedback: '',
      whatWorked: '',
      whatDidntWork: '',
      suggestions: '',
      wouldRecommend: false,
      exitReason: ''
    })
    loadExitHistory()
    loadAnalytics()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Exit Intelligence</h1>
        <p className="text-gray-600">Predict exit risks and manage employee departures professionally</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingDown className="h-5 w-5 mr-2 text-red-600" />
            Exit Risk Analysis
          </h2>
          <div className="space-y-4">
            {employees.map(employee => (
              <div key={employee.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">{employee.name}</p>
                    <p className="text-sm text-gray-500">{employee.role}</p>
                  </div>
                  <button
                    onClick={() => analyzeExitRisk(employee)}
                    className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
                  >
                    Analyze Risk
                  </button>
                </div>
                <div className="flex gap-4 text-sm text-gray-600">
                  <span>Tenure: {employee.tenure} months</span>
                  <span>Alignment: {employee.alignmentScore}%</span>
                  <span>Engagement: {employee.engagementScore}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {exitRisk && selectedEmployee && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Risk Assessment: {selectedEmployee.name}</h2>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Risk Score</span>
                <span className={`font-bold text-lg ${
                  exitRisk.riskLevel === 'high' ? 'text-red-600' :
                  exitRisk.riskLevel === 'medium' ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {exitRisk.riskScore}/100
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    exitRisk.riskLevel === 'high' ? 'bg-red-600' :
                    exitRisk.riskLevel === 'medium' ? 'bg-yellow-600' : 'bg-green-600'
                  }`}
                  style={{ width: `${exitRisk.riskScore}%` }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Predicted Exit Window: {exitRisk.predictedExitWindow}
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Risk Factors</h3>
              <div className="space-y-2">
                {exitRisk.riskFactors.map((factor, i) => (
                  <div key={i} className="flex items-start p-2 bg-red-50 rounded">
                    <AlertTriangle className="h-4 w-4 text-red-600 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-900">{factor.message}</p>
                      <p className="text-xs text-red-700">Severity: {factor.severity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Recommendations</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                {exitRisk.recommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setShowExitPlan(true)}
              className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Create Exit Plan
            </button>
          </div>
        )}
      </div>

      {analytics && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-indigo-600" />
            Exit Analytics
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">Total Exits</p>
              <p className="text-2xl font-bold">{analytics.totalExits}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Interview Completion</p>
              <p className="text-2xl font-bold">{analytics.interviewCompletionRate.toFixed(0)}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg Satisfaction</p>
              <p className="text-2xl font-bold">{analytics.avgSatisfaction}/10</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Positive Exits</p>
              <p className="text-2xl font-bold text-green-600">{analytics.positiveExits}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FileText className="h-5 w-5 mr-2 text-indigo-600" />
          Exit History
        </h2>
        <div className="space-y-4">
          {exitHistory.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No exit plans created yet</p>
          ) : (
            exitHistory.map(exit => (
              <div key={exit.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-medium">{exit.employeeName}</p>
                    <p className="text-sm text-gray-500">
                      Exit Date: {new Date(exit.exitDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    exit.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {exit.status}
                  </span>
                </div>
                <div className="mb-3">
                  <p className="text-sm font-medium mb-2">Exit Checklist</p>
                  <div className="space-y-1">
                    {exit.checklist.map((item, i) => (
                      <div key={i} className="flex items-center text-sm">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          disabled
                          className="mr-2"
                        />
                        <span className={item.completed ? 'text-gray-500 line-through' : ''}>
                          {item.task}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {!exit.feedback && (
                  <button
                    onClick={() => {
                      setSelectedEmployee({ id: exit.employeeId, name: exit.employeeName })
                      setShowInterview(true)
                    }}
                    className="flex items-center px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Conduct Exit Interview
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {showInterview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Exit Interview: {selectedEmployee?.name}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Overall Experience (1-10)</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={interviewData.overallExperience}
                  onChange={(e) => setInterviewData({ ...interviewData, overallExperience: parseInt(e.target.value) })}
                  className="w-full"
                />
                <p className="text-sm text-gray-500">{interviewData.overallExperience}/10</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Culture Fit (1-10)</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={interviewData.cultureFit}
                  onChange={(e) => setInterviewData({ ...interviewData, cultureFit: parseInt(e.target.value) })}
                  className="w-full"
                />
                <p className="text-sm text-gray-500">{interviewData.cultureFit}/10</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Exit Reason</label>
                <input
                  type="text"
                  value={interviewData.exitReason}
                  onChange={(e) => setInterviewData({ ...interviewData, exitReason: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g., Career growth, Better opportunity, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">What Worked Well</label>
                <textarea
                  value={interviewData.whatWorked}
                  onChange={(e) => setInterviewData({ ...interviewData, whatWorked: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">What Didn't Work</label>
                <textarea
                  value={interviewData.whatDidntWork}
                  onChange={(e) => setInterviewData({ ...interviewData, whatDidntWork: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Suggestions for Improvement</label>
                <textarea
                  value={interviewData.suggestions}
                  onChange={(e) => setInterviewData({ ...interviewData, suggestions: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows="3"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={interviewData.wouldRecommend}
                  onChange={(e) => setInterviewData({ ...interviewData, wouldRecommend: e.target.checked })}
                  className="mr-2"
                />
                <label className="text-sm">Would recommend company to others</label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  const exit = exitHistory.find(e => e.employeeId === selectedEmployee?.id)
                  if (exit) handleConductInterview(exit.id)
                }}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Submit Interview
              </button>
              <button
                onClick={() => setShowInterview(false)}
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

