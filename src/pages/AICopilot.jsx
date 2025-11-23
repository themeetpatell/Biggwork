import { useState, useEffect, useRef } from 'react'
import { AICopilot } from '../services/aiCopilot'
import { 
  Bot, Send, Sparkles, Loader, Zap, Users, Briefcase, 
  FileText, DollarSign, MessageSquare, TrendingUp, Target,
  Clock, Award, Plus, X, ChevronRight
} from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'

export default function AICopilotPage() {
  const [copilot] = useState(() => new AICopilot())
  const [question, setQuestion] = useState('')
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(false)
  const [context, setContext] = useState(null)
  const messagesEndRef = useRef(null)

  // Quick Actions
  const quickActions = [
    {
      icon: FileText,
      label: 'Generate Job Description',
      prompt: 'Help me create a job description for a Senior Engineer at a Series A startup',
      color: 'primary'
    },
    {
      icon: Users,
      label: 'Review Candidate',
      prompt: 'Should I hire a candidate with 5 years experience, strong tech skills but limited startup experience?',
      color: 'secondary'
    },
    {
      icon: MessageSquare,
      label: 'Interview Questions',
      prompt: 'Generate interview questions for a product manager role focused on builder mindset',
      color: 'success'
    },
    {
      icon: DollarSign,
      label: 'Compensation Advice',
      prompt: 'What compensation should I offer for a Senior Engineer in San Francisco at Series A stage?',
      color: 'warning'
    },
    {
      icon: TrendingUp,
      label: 'Market Analysis',
      prompt: 'What are the current hiring trends for engineering roles in the startup ecosystem?',
      color: 'danger'
    },
    {
      icon: Target,
      label: 'Hiring Strategy',
      prompt: 'Review my hiring process and suggest improvements for reducing time-to-hire',
      color: 'primary'
    }
  ]

  // Recent Activity for Context
  const recentActivity = [
    {  type: 'candidate', title: 'Mike Johnson viewed', time: '10 mins ago', icon: Users },
    { type: 'role', title: 'Senior Engineer role created', time: '1 hour ago', icon: Briefcase },
    { type: 'interview', title: 'Interview with Sarah Chen', time: '2 hours ago', icon: MessageSquare }
  ]

  useEffect(() => {
    loadHistory()
    loadContext()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [conversations])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const loadHistory = () => {
    setConversations(copilot.getConversationHistory())
  }

  const loadContext = () => {
    // Load context from localStorage
    const companyData = localStorage.getItem('biggwork_company')
    const candidates = localStorage.getItem('biggwork_candidates')
    
    if (companyData) {
      const company = JSON.parse(companyData)
      setContext({
        companyName: company.name,
        stage: company.stage,
        teamSize: company.teamSize,
        candidateCount: candidates ? JSON.parse(candidates).length : 0
      })
    }
  }

  const handleAsk = async (customPrompt = null) => {
    const userQuestion = customPrompt || question.trim()
    if (!userQuestion || loading) return

    setQuestion('')
    setLoading(true)

    const userMessage = {
      type: 'user',
      content: userQuestion,
      timestamp: new Date().toISOString()
    }

    setConversations(prev => [...prev, userMessage])

    try {
      const response = await copilot.ask(userQuestion, context)
      const aiMessage = {
        type: 'assistant',
        content: response.answer,
        suggestions: response.suggestions,
        timestamp: new Date().toISOString()
      }
      setConversations(prev => [...prev, aiMessage])
    } catch (error) {
      const errorMessage = {
        type: 'error',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString()
      }
      setConversations(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleAsk()
    }
  }

  const clearChat = () => {
    setConversations([])
    copilot.clearHistory()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-3">
            AI Co-pilot
          </h1>
          <p className="text-gray-600 text-lg">Your intelligent assistant for talent decisions</p>
        </div>
        {conversations.length > 0 && (
          <Button variant="outline" icon={X} onClick={clearChat}>
            Clear Chat
          </Button>
        )}
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Sidebar - Context & Quick Actions */}
        <div className="md:col-span-1 space-y-6">
          {/* Context Card */}
          {context && (
            <Card>
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-primary-600" />
                Current Context
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-500">Company</p>
                  <p className="font-medium text-gray-900">{context.companyName}</p>
                </div>
                <div>
                  <p className="text-gray-500">Stage</p>
                  <Badge variant="primary" size="sm" className="capitalize">
                    {context.stage.replace('_', ' ')}
                  </Badge>
                </div>
                <div>
                  <p className="text-gray-500">Team Size</p>
                  <p className="font-medium text-gray-900">{context.teamSize} people</p>
                </div>
                <div>
                  <p className="text-gray-500">Active Candidates</p>
                  <p className="font-medium text-gray-900">{context.candidateCount}</p>
                </div>
              </div>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <Zap className="h-5 w-5 mr-2 text-warning-600" />
              Quick Actions
            </h3>
            <div className="space-y-2">
              {quickActions.map((action, idx) => {
                const Icon = action.icon
                return (
                  <button
                    key={idx}
                    onClick={() => handleAsk(action.prompt)}
                    disabled={loading}
                    className={`w-full p-3 text-left rounded-lg border-2 border-${action.color}-200 bg-${action.color}-50 hover:bg-${action.color}-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={`h-4 w-4 text-${action.color}-600`} />
                      <span className="text-sm font-medium text-gray-900">{action.label}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card>
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-secondary-600" />
              Recent Activity
            </h3>
            <div className="space-y-3">
              {recentActivity.map((activity, idx) => {
                const Icon = activity.icon
                return (
                  <div key={idx} className="flex items-start gap-2 text-sm">
                    <Icon className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="md:col-span-3">
          <Card className="h-[calc(100vh-16rem)] flex flex-col">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {conversations.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="p-6 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full mb-6">
                    <Bot className="h-16 w-16 text-primary-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome to AI Co-pilot!</h3>
                  <p className="text-gray-600 mb-6 max-w-md">
                    I'm here to help you make better talent decisions. Ask me anything about hiring, candidates, compensation, or team building.
                  </p>
                  <div className="grid grid-cols-2 gap-3 max-w-lg">
                    <button
                      onClick={() => handleAsk(quickActions[0].prompt)}
                      className="p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
                    >
                      <p className="text-sm font-medium text-gray-900 mb-1">Generate JD</p>
                      <p className="text-xs text-gray-600">Create job descriptions</p>
                    </button>
                    <button
                      onClick={() => handleAsk(quickActions[1].prompt)}
                      className="p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
                    >
                      <p className="text-sm font-medium text-gray-900 mb-1">Review Candidate</p>
                      <p className="text-xs text-gray-600">Get hiring advice</p>
                    </button>
                    <button
                      onClick={() => handleAsk(quickActions[2].prompt)}
                      className="p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
                    >
                      <p className="text-sm font-medium text-gray-900 mb-1">Interview Questions</p>
                      <p className="text-xs text-gray-600">Prepare for interviews</p>
                    </button>
                    <button
                      onClick={() => handleAsk(quickActions[3].prompt)}
                      className="p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
                    >
                      <p className="text-sm font-medium text-gray-900 mb-1">Compensation</p>
                      <p className="text-xs text-gray-600">Get salary guidance</p>
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {conversations.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex gap-4 ${
                        msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}
                    >
                      <div
                        className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                          msg.type === 'user'
                            ? 'bg-gradient-to-br from-primary-500 to-secondary-500'
                            : msg.type === 'error'
                            ? 'bg-danger-100'
                            : 'bg-gradient-to-br from-primary-100 to-secondary-100'
                        }`}
                      >
                        {msg.type === 'user' ? (
                          <span className="text-white font-bold">You</span>
                        ) : (
                          <Bot className={`h-5 w-5 ${msg.type === 'error' ? 'text-danger-600' : 'text-primary-600'}`} />
                        )}
                      </div>
                      <div
                        className={`flex-1 max-w-3xl ${
                          msg.type === 'user' ? 'flex flex-col items-end' : ''
                        }`}
                      >
                        <div
                          className={`p-4 rounded-lg ${
                            msg.type === 'user'
                              ? 'bg-gradient-to-br from-primary-500 to-secondary-500 text-white'
                              : msg.type === 'error'
                              ? 'bg-danger-50 border border-danger-200 text-danger-900'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                        </div>
                        {msg.suggestions && msg.suggestions.length > 0 && (
                          <div className="mt-3 space-y-2">
                            <p className="text-sm text-gray-600 font-medium">Suggested follow-ups:</p>
                            {msg.suggestions.map((suggestion, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleAsk(suggestion)}
                                disabled={loading}
                                className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 disabled:opacity-50"
                              >
                                <ChevronRight className="h-4 w-4" />
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-secondary-100">
                        <Loader className="h-5 w-5 text-primary-600 animate-spin" />
                      </div>
                      <div className="flex-1">
                        <div className="p-4 bg-gray-100 rounded-lg">
                          <p className="text-gray-600">Thinking...</p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex gap-3">
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about hiring, candidates, or team building..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  rows="2"
                  disabled={loading}
                />
                <Button
                  variant="primary"
                  icon={Send}
                  onClick={() => handleAsk()}
                  disabled={!question.trim() || loading}
                  className="self-end"
                >
                  Send
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
