import { useState, useEffect } from 'react'
import { PerformanceOS } from '../services/performanceOS'
import { Target, TrendingUp, Users, CheckCircle, MessageSquare, BarChart3 } from 'lucide-react'

export default function PerformanceOSPage() {
  const [perfService] = useState(() => new PerformanceOS())
  const [employees, setEmployees] = useState([])
  const [analytics, setAnalytics] = useState(null)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [performanceData, setPerformanceData] = useState(null)
  const [showGoalForm, setShowGoalForm] = useState(false)
  const [goalData, setGoalData] = useState({ title: '', description: '', targetDate: '' })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    setEmployees(perfService.getEmployees())
    setAnalytics(perfService.getPerformanceAnalytics())
  }

  const handleSelectEmployee = (employeeId) => {
    setSelectedEmployee(employeeId)
    setPerformanceData(perfService.getEmployeePerformance(employeeId))
  }

  const handleAddGoal = () => {
    if (!selectedEmployee || !goalData.title) return
    
    perfService.addGoal(selectedEmployee, goalData)
    setShowGoalForm(false)
    setGoalData({ title: '', description: '', targetDate: '' })
    loadData()
    if (selectedEmployee) {
      setPerformanceData(perfService.getEmployeePerformance(selectedEmployee))
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">PerformanceOS Integration</h1>
        <p className="text-gray-600">Track performance, goals, and feedback in one place</p>
      </div>

      {analytics && (
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-sm text-gray-500 mb-1">Total Employees</p>
            <p className="text-3xl font-bold">{analytics.totalEmployees}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-sm text-gray-500 mb-1">Review Coverage</p>
            <p className="text-3xl font-bold text-indigo-600">{analytics.reviewCoverage.toFixed(0)}%</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-sm text-gray-500 mb-1">Avg Performance</p>
            <p className="text-3xl font-bold">{analytics.avgPerformanceScore}/10</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-sm text-gray-500 mb-1">Goal Completion</p>
            <p className="text-3xl font-bold text-green-600">{analytics.goalCompletionRate.toFixed(0)}%</p>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-indigo-600" />
              Employees
            </h2>
            {employees.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No employees added yet</p>
                <p className="text-sm text-gray-400">Employees will be synced from onboarding</p>
              </div>
            ) : (
              <div className="space-y-2">
                {employees.map(emp => (
                  <div
                    key={emp.id}
                    onClick={() => handleSelectEmployee(emp.id)}
                    className={`p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition ${
                      selectedEmployee === emp.id ? 'bg-indigo-50 border-2 border-indigo-500' : 'border border-gray-200'
                    }`}
                  >
                    <p className="font-medium">{emp.name}</p>
                    <p className="text-sm text-gray-500">{emp.role}</p>
                    {emp.performanceScore !== null && (
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs text-gray-500">Performance:</span>
                        <span className={`text-sm font-semibold ${
                          emp.performanceScore >= 8 ? 'text-green-600' :
                          emp.performanceScore >= 6 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {emp.performanceScore}/10
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {performanceData && (
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{performanceData.employee.name}</h2>
                  <p className="text-gray-600">{performanceData.employee.role}</p>
                </div>
                {performanceData.performanceScore !== null && (
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Performance Score</p>
                    <p className={`text-3xl font-bold ${
                      performanceData.performanceScore >= 8 ? 'text-green-600' :
                      performanceData.performanceScore >= 6 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {performanceData.performanceScore}/10
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold flex items-center">
                  <Target className="h-5 w-5 mr-2 text-indigo-600" />
                  Goals ({performanceData.goals.length})
                </h3>
                <button
                  onClick={() => setShowGoalForm(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm"
                >
                  Add Goal
                </button>
              </div>
              {performanceData.goals.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No goals set yet</p>
              ) : (
                <div className="space-y-4">
                  {performanceData.goals.map(goal => (
                    <div key={goal.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{goal.title}</p>
                          <p className="text-sm text-gray-600">{goal.description}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${
                          goal.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {goal.status}
                        </span>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Progress</span>
                          <span>{goal.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{ width: `${goal.progress}%` }}
                          />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Target: {new Date(goal.targetDate).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-indigo-600" />
                Recent Feedback ({performanceData.feedback.length})
              </h3>
              {performanceData.feedback.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No feedback yet</p>
              ) : (
                <div className="space-y-3">
                  {performanceData.feedback.slice(0, 5).map(fb => (
                    <div key={fb.id} className="border-l-4 border-indigo-500 pl-4 py-2">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-medium text-sm">{fb.from}</p>
                        <span className="text-xs text-gray-500">
                          {new Date(fb.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{fb.content}</p>
                      <span className="text-xs text-gray-500 capitalize">{fb.category}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-indigo-600" />
                Performance Reviews ({performanceData.reviews.length})
              </h3>
              {performanceData.reviews.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No reviews yet</p>
              ) : (
                <div className="space-y-4">
                  {performanceData.reviews.map(review => (
                    <div key={review.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-medium">{review.type} Review</p>
                          <p className="text-sm text-gray-500">{review.period}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-indigo-600">{review.overallScore}/10</p>
                        </div>
                      </div>
                      {review.strengths.length > 0 && (
                        <div className="mb-2">
                          <p className="text-sm font-medium text-gray-700 mb-1">Strengths</p>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {review.strengths.map((s, i) => (
                              <li key={i}>{s}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <p className="text-xs text-gray-500">
                        Reviewed by {review.reviewedBy} on {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {showGoalForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Add Goal</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Goal Title</label>
                <input
                  type="text"
                  value={goalData.title}
                  onChange={(e) => setGoalData({ ...goalData, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g., Launch new feature"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={goalData.description}
                  onChange={(e) => setGoalData({ ...goalData, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Target Date</label>
                <input
                  type="date"
                  value={goalData.targetDate}
                  onChange={(e) => setGoalData({ ...goalData, targetDate: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddGoal}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Add Goal
              </button>
              <button
                onClick={() => setShowGoalForm(false)}
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

