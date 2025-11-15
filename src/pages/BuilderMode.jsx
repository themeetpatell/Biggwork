import { useState, useEffect } from 'react'
import { BuilderMode } from '../services/builderMode'
import { 
  Rocket, CheckCircle, PlayCircle, BookOpen, Video, FileText, Award,
  Trophy, Star, Zap, Target, TrendingUp, Users, Flame, Crown,
  Medal, Gift, Lock, ChevronRight, Calendar, BarChart3, Clock
} from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
import StatCard from '../components/StatCard'
import ProgressBar from '../components/ProgressBar'
import Tabs from '../components/Tabs'
import Modal from '../components/Modal'

export default function BuilderModePage() {
  const [builderService] = useState(() => new BuilderMode())
  const [modules, setModules] = useState([])
  const [overallProgress, setOverallProgress] = useState(null)
  const [builderScore, setBuilderScore] = useState(0)
  const [selectedModule, setSelectedModule] = useState(null)
  
  // Gamification state
  const [points, setPoints] = useState(2850)
  const [streak, setStreak] = useState(7)
  const [level, setLevel] = useState(5)
  const [selectedAchievement, setSelectedAchievement] = useState(null)

  // Achievements system
  const achievements = [
    { 
      id: 1, 
      title: 'First Steps', 
      description: 'Complete your first module', 
      icon: Rocket, 
      unlocked: true, 
      points: 100,
      unlockedDate: '2024-01-15'
    },
    { 
      id: 2, 
      title: 'Week Warrior', 
      description: '7-day learning streak', 
      icon: Flame, 
      unlocked: true, 
      points: 200,
      unlockedDate: '2024-01-20'
    },
    { 
      id: 3, 
      title: 'Knowledge Seeker', 
      description: 'Complete 5 modules', 
      icon: BookOpen, 
      unlocked: true, 
      points: 300,
      unlockedDate: '2024-01-25'
    },
    { 
      id: 4, 
      title: 'Builder Master', 
      description: 'Reach Builder Score 80+', 
      icon: Crown, 
      unlocked: false, 
      points: 500,
      progress: 75
    },
    { 
      id: 5, 
      title: 'Team Player', 
      description: 'Share knowledge with 3 teammates', 
      icon: Users, 
      unlocked: false, 
      points: 250,
      progress: 33
    },
    { 
      id: 6, 
      title: 'Perfect Score', 
      description: 'Get 100% on any assessment', 
      icon: Star, 
      unlocked: false, 
      points: 400,
      progress: 0
    },
  ]

  // Leaderboard data
  const leaderboard = [
    { rank: 1, name: 'Sarah Chen', score: 4250, level: 7, avatar: '🥇', trend: 'up' },
    { rank: 2, name: 'Mike Johnson', score: 3980, level: 6, avatar: '🥈', trend: 'same' },
    { rank: 3, name: 'Emma Wilson', score: 3750, level: 6, avatar: '🥉', trend: 'up' },
    { rank: 4, name: 'Alex Kumar', score: 3120, level: 5, avatar: '👤', trend: 'down' },
    { rank: 5, name: 'You', score: 2850, level: 5, avatar: '🚀', trend: 'up', isCurrentUser: true },
    { rank: 6, name: 'Lisa Park', score: 2640, level: 5, avatar: '👤', trend: 'up' },
    { rank: 7, name: 'David Lee', score: 2350, level: 4, avatar: '👤', trend: 'same' },
  ]

  // Skill pathways
  const skillPaths = [
    {
      id: 1,
      title: 'Entrepreneurial Mindset',
      description: 'Master the builder mentality',
      progress: 75,
      modules: 8,
      completed: 6,
      icon: Rocket,
      color: 'from-primary-500 to-primary-600'
    },
    {
      id: 2,
      title: 'Product Thinking',
      description: 'Build products users love',
      progress: 60,
      modules: 6,
      completed: 4,
      icon: Target,
      color: 'from-secondary-500 to-secondary-600'
    },
    {
      id: 3,
      title: 'Team Leadership',
      description: 'Lead and inspire teams',
      progress: 40,
      modules: 5,
      completed: 2,
      icon: Users,
      color: 'from-success-500 to-success-600'
    },
    {
      id: 4,
      title: 'Growth Hacking',
      description: 'Scale with creativity',
      progress: 25,
      modules: 7,
      completed: 2,
      icon: TrendingUp,
      color: 'from-warning-500 to-warning-600'
    },
  ]

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    setModules(builderService.getModules())
    setOverallProgress(builderService.getOverallProgress())
    setBuilderScore(builderService.getBuilderScore())
  }

  const handleStartModule = (moduleId) => {
    builderService.startModule(moduleId)
    setSelectedModule(builderService.getModule(moduleId))
    loadData()
  }

  const handleCompleteModule = (moduleId) => {
    builderService.completeModule(moduleId)
    loadData()
  }

  const getModuleIcon = (type) => {
    switch(type) {
      case 'video': return <Video className="h-5 w-5" />
      case 'interactive': return <PlayCircle className="h-5 w-5" />
      case 'reading': return <BookOpen className="h-5 w-5" />
      case 'assessment': return <FileText className="h-5 w-5" />
      default: return <FileText className="h-5 w-5" />
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-3 flex items-center">
            <Rocket className="h-10 w-10 mr-3 text-primary-600" />
            Builder Mode Platform
          </h1>
          <p className="text-gray-600 text-lg">Transform from employee to builder through gamified learning</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="primary" size="lg">
            <Trophy className="h-4 w-4 mr-1" />
            Level {level}
          </Badge>
          <Badge variant="warning" size="lg">
            <Star className="h-4 w-4 mr-1" />
            {points} Points
          </Badge>
          <Badge variant="danger" size="lg">
            <Flame className="h-4 w-4 mr-1" />
            {streak} Day Streak
          </Badge>
        </div>
      </div>

      {overallProgress && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard 
            title="Builder Score" 
            value={`${builderScore}/100`} 
            icon={Award} 
            color="primary"
            trend="up"
            trendValue="+12pts"
          />
          <StatCard 
            title="Modules Completed" 
            value={`${overallProgress.completed}/${overallProgress.total}`} 
            icon={CheckCircle} 
            color="success"
          />
          <StatCard 
            title="Total Points" 
            value={points} 
            icon={Star} 
            color="warning"
            trend="up"
            trendValue="+450"
          />
          <StatCard 
            title="Current Level" 
            value={level} 
            icon={Trophy} 
            color="secondary"
          />
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Target className="h-6 w-6 mr-2 text-primary-600" />
              Learning Pathways
            </h2>
            <div className="space-y-4">
              {skillPaths.map((path) => {
                const Icon = path.icon
                return (
                  <div key={path.id} className="p-5 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${path.color}`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-900 mb-1">{path.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{path.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{path.completed}/{path.modules} modules</span>
                            <Badge variant="primary" size="sm">{path.progress}% complete</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    <ProgressBar value={path.progress} color={path.progress >= 75 ? 'success' : path.progress >= 50 ? 'primary' : 'warning'} showLabel />
                  </div>
                )
              })}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <Trophy className="h-6 w-6 mr-2 text-warning-600" />
                Achievements
              </h2>
              <Badge variant="warning" size="lg">
                {achievements.filter(a => a.unlocked).length}/{achievements.length} Unlocked
              </Badge>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {achievements.map((achievement) => {
                const Icon = achievement.icon
                return (
                  <div 
                    key={achievement.id}
                    onClick={() => setSelectedAchievement(achievement)}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      achievement.unlocked 
                        ? 'bg-gradient-to-br from-warning-50 to-white border-warning-200 hover:shadow-md' 
                        : 'bg-gray-50 border-gray-200 opacity-60 hover:opacity-80'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${achievement.unlocked ? 'bg-warning-100' : 'bg-gray-200'}`}>
                        {achievement.unlocked ? (
                          <Icon className="h-5 w-5 text-warning-600" />
                        ) : (
                          <Lock className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">{achievement.title}</h3>
                        <p className="text-xs text-gray-600">{achievement.description}</p>
                      </div>
                      <Badge variant={achievement.unlocked ? 'warning' : 'gray'} size="sm">
                        +{achievement.points}
                      </Badge>
                    </div>
                    {!achievement.unlocked && achievement.progress !== undefined && (
                      <ProgressBar value={achievement.progress} color="warning" size="sm" />
                    )}
                    {achievement.unlocked && achievement.unlockedDate && (
                      <p className="text-xs text-gray-500 mt-2 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        Unlocked {achievement.unlockedDate}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </Card>
        </div>

        <div>
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center">
                <Crown className="h-5 w-5 mr-2 text-warning-600" />
                Leaderboard
              </h2>
              <Badge variant="secondary" size="sm">Weekly</Badge>
            </div>
            <div className="space-y-3">
              {leaderboard.map((user) => (
                <div 
                  key={user.rank}
                  className={`p-4 rounded-lg transition-all ${
                    user.isCurrentUser 
                      ? 'bg-gradient-to-r from-primary-50 to-secondary-50 border-2 border-primary-300' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-gray-400 w-6">#{user.rank}</span>
                      <span className="text-2xl">{user.avatar}</span>
                      <div>
                        <p className={`font-bold ${user.isCurrentUser ? 'text-primary-700' : 'text-gray-900'}`}>
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500">Level {user.level}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary-600">{user.score}</p>
                      <div className="flex items-center justify-end gap-1">
                        {user.trend === 'up' && <TrendingUp className="h-3 w-3 text-success-600" />}
                        {user.trend === 'down' && <TrendingUp className="h-3 w-3 text-danger-600 rotate-180" />}
                        <p className="text-xs text-gray-500">pts</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" size="sm">
              View Full Leaderboard
            </Button>
          </Card>

          <Card className="mt-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <Gift className="h-5 w-5 mr-2 text-success-600" />
              Next Rewards
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-success-50 rounded-lg border border-success-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-success-800">Level 6</p>
                  <p className="text-xs text-success-600">150 pts away</p>
                </div>
                <ProgressBar value={95} color="success" size="sm" />
              </div>
              <div className="p-3 bg-warning-50 rounded-lg border border-warning-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-warning-800">Builder Master Badge</p>
                  <p className="text-xs text-warning-600">5 pts away</p>
                </div>
                <ProgressBar value={75} color="warning" size="sm" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card className="mb-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <BookOpen className="h-6 w-6 mr-2 text-secondary-600" />
          Builder Training Modules
        </h2>
        <div className="space-y-4">
          {modules.map(module => (
            <div
              key={module.id}
              className="p-6 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-lg text-secondary-700">
                    {getModuleIcon(module.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{module.title}</h3>
                      {module.completed && (
                        <Badge variant="success" size="sm">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{module.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {module.duration}
                      </span>
                      <Badge variant="gray" size="sm" className="capitalize">{module.type}</Badge>
                      {!module.completed && module.progress > 0 && (
                        <Badge variant="primary" size="sm">{module.progress}% done</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  {module.completed ? (
                    <Badge variant="success" size="lg">
                      <Award className="h-4 w-4 mr-1" />
                      +{100} pts
                    </Badge>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      icon={PlayCircle}
                      onClick={() => handleStartModule(module.id)}
                    >
                      {module.progress > 0 ? 'Continue' : 'Start'}
                    </Button>
                  )}
                </div>
              </div>
              {module.progress > 0 && !module.completed && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCompleteModule(module.id)}
                    >
                      Mark Complete
                    </Button>
                  </div>
                  <ProgressBar value={module.progress} color="primary" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {selectedModule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold">{selectedModule.title}</h2>
                <p className="text-gray-600">{selectedModule.description}</p>
              </div>
              <button
                onClick={() => setSelectedModule(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              {selectedModule.content.videos && (
                <div>
                  <h3 className="font-semibold mb-2">Videos</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {selectedModule.content.videos.map((video, i) => (
                      <li key={i}>{video}</li>
                    ))}
                  </ul>
                </div>
              )}
              {selectedModule.content.exercises && (
                <div>
                  <h3 className="font-semibold mb-2">Exercises</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {selectedModule.content.exercises.map((exercise, i) => (
                      <li key={i}>{exercise}</li>
                    ))}
                  </ul>
                </div>
              )}
              {selectedModule.content.concepts && (
                <div>
                  <h3 className="font-semibold mb-2">Key Concepts</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {selectedModule.content.concepts.map((concept, i) => (
                      <li key={i}>{concept}</li>
                    ))}
                  </ul>
                </div>
              )}
              {selectedModule.content.readings && (
                <div>
                  <h3 className="font-semibold mb-2">Readings</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {selectedModule.content.readings.map((reading, i) => (
                      <li key={i}>{reading}</li>
                    ))}
                  </ul>
                </div>
              )}
              {selectedModule.content.assessments && (
                <div>
                  <h3 className="font-semibold mb-2">Assessments</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {selectedModule.content.assessments.map((assessment, i) => (
                      <li key={i}>{assessment}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  handleCompleteModule(selectedModule.id)
                  setSelectedModule(null)
                }}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Complete Module
              </button>
              <button
                onClick={() => setSelectedModule(null)}
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

