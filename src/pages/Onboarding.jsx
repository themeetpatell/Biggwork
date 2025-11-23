import { useState, useEffect } from 'react'
import { OnboardingEngine } from '../services/onboardingEngine'
import { DNAScanner } from '../services/dnaScanner'
import { UserCheck, CheckCircle, Clock, TrendingUp, FileText, Target, Calendar } from 'lucide-react'

export default function Onboarding() {
  const [onboardingPlans, setOnboardingPlans] = useState([])
  const [companyDNA, setCompanyDNA] = useState(null)
  const [selectedPlan, setSelectedPlan] = useState(null)

  useEffect(() => {
    loadData()
    loadOnboardingPlans()
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

  const loadOnboardingPlans = () => {
    const saved = localStorage.getItem('biggwork_onboarding')
    if (saved) {
      setOnboardingPlans(JSON.parse(saved))
    } else {
      const engine = new OnboardingEngine()
      const defaultPlan = engine.generateOnboardingPlan(
        { name: 'John Doe', email: 'john@example.com' },
        { stage: 'seed', cultureDNA: { values: ['speed', 'ownership'] } },
        'Head of Sales'
      )
      const plans = [{
        id: '1',
        ...defaultPlan,
        progress: 0,
        checkpoints: defaultPlan.checkpoints.map(cp => ({
          ...cp,
          completed: false,
          alignmentScore: null,
        })),
      }]
      setOnboardingPlans(plans)
      localStorage.setItem('biggwork_onboarding', JSON.stringify(plans))
    }
  }

  const updateTask = (planId, taskType, taskId, completed) => {
    const updated = onboardingPlans.map(plan => {
      if (plan.id !== planId) return plan
      
      if (taskType === 'preBoarding') {
        const tasks = plan.preBoarding.tasks.map(t =>
          t.id === taskId ? { ...t, completed } : t
        )
        return { ...plan, preBoarding: { ...plan.preBoarding, tasks } }
      }
      if (taskType === 'week1') {
        const tasks = plan.week1.tasks.map(t =>
          t.id === taskId ? { ...t, completed } : t
        )
        return { ...plan, week1: { ...plan.week1, tasks } }
      }
      return plan
    })
    
    const engine = new OnboardingEngine()
    const recalculated = updated.map(plan => ({
      ...plan,
      progress: engine.calculateProgress(plan),
    }))
    
    setOnboardingPlans(recalculated)
    localStorage.setItem('biggwork_onboarding', JSON.stringify(recalculated))
  }

  const completeCheckpoint = (planId, checkpointDay) => {
    const updated = onboardingPlans.map(plan => {
      if (plan.id !== planId) return plan
      
      const checkpoints = plan.checkpoints.map(cp =>
        cp.day === checkpointDay ? { ...cp, completed: true, alignmentScore: 85 } : cp
      )
      return { ...plan, checkpoints }
    })
    
    setOnboardingPlans(updated)
    localStorage.setItem('biggwork_onboarding', JSON.stringify(updated))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Onboarding Intelligence</h1>
        <p className="text-gray-600">Structured onboarding with progress tracking and alignment checkpoints</p>
      </div>

      <div className="space-y-6">
        {onboardingPlans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold flex items-center">
                  <UserCheck className="h-5 w-5 mr-2 text-indigo-600" />
                  {plan.hire.name} - {plan.role}
                </h3>
                <p className="text-gray-600 mt-1">{plan.hire.email}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-indigo-600">{plan.progress}%</div>
                <p className="text-xs text-gray-500">Progress</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Pre-Boarding (Before Day 1)
                </h4>
                <div className="space-y-2">
                  {plan.preBoarding.tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">{task.title}</span>
                      <button
                        onClick={() => updateTask(plan.id, 'preBoarding', task.id, !task.completed)}
                        className={task.completed ? 'text-green-600' : 'text-gray-400'}
                      >
                        {task.completed ? <CheckCircle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <Target className="h-4 w-4 mr-2" />
                  Day 1 Agenda
                </h4>
                <div className="space-y-2">
                  {plan.day1.agenda.map((item, i) => (
                    <div key={i} className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium w-24">{item.time}</span>
                      <span className="text-sm flex-1">{item.activity}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        item.type === 'culture' ? 'bg-purple-100 text-purple-700' :
                        item.type === 'role' ? 'bg-green-100 text-green-700' :
                        item.type === 'team' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {item.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Week 1 Foundation</h4>
                <div className="space-y-2">
                  {plan.week1.tasks.map((task, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="text-sm font-medium">Day {task.day}:</span>
                        <span className="text-sm ml-2">{task.task}</span>
                      </div>
                      <button
                        onClick={() => updateTask(plan.id, 'week1', task.id || i, !task.completed)}
                        className={task.completed ? 'text-green-600' : 'text-gray-400'}
                      >
                        {task.completed ? <CheckCircle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  30/60/90 Day Checkpoints
                </h4>
                <div className="space-y-3">
                  {plan.checkpoints.map((checkpoint, i) => (
                    <div key={i} className="border-l-4 border-indigo-500 pl-4 py-3">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium">Day {checkpoint.day} Checkpoint</p>
                          <p className="text-sm text-gray-600">{checkpoint.focus}</p>
                        </div>
                        {checkpoint.completed ? (
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600">
                              {checkpoint.alignmentScore}%
                            </div>
                            <p className="text-xs text-gray-500">Alignment Score</p>
                          </div>
                        ) : (
                          <button
                            onClick={() => completeCheckpoint(plan.id, checkpoint.day)}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700"
                          >
                            Complete Checkpoint
                          </button>
                        )}
                      </div>
                      {checkpoint.questions && (
                        <div className="mt-2 space-y-1">
                          {checkpoint.questions.map((q, qi) => (
                            <p key={qi} className="text-xs text-gray-600">• {q}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Learning Modules
                </h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {plan.modules.map((module, i) => (
                    <div key={i} className="p-3 bg-indigo-50 rounded-lg">
                      <p className="font-medium text-sm">{module.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{module.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {onboardingPlans.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No onboarding plans yet.</p>
        </div>
      )}
    </div>
  )
}
