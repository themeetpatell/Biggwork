import { useState, useEffect } from 'react'
import { 
  MessageSquare, Calendar, Users, CheckCircle, Clock, TrendingUp, FileText,
  Plus, Eye, Video, Star, AlertCircle, ThumbsUp, ThumbsDown, Edit
} from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
import Modal from '../components/Modal'
import StatCard from '../components/StatCard'
import Tabs from '../components/Tabs'
import ProgressBar from '../components/ProgressBar'

export default function Interviews() {
  const [interviews, setInterviews] = useState([])
  const [selectedInterview, setSelectedInterview] = useState(null)
  const [showScheduleForm, setShowScheduleForm] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)

  useEffect(() => {
    loadInterviews()
  }, [])

  const loadInterviews = () => {
    const saved = localStorage.getItem('peopleos_interviews')
    if (saved) {
      setInterviews(JSON.parse(saved))
    } else {
      const defaultInterviews = [
        {
          id: '1',
          candidateId: '1',
          candidateName: 'John Doe',
          role: 'Head of Sales',
          stage: 'phone_screen',
          scheduledDate: new Date(Date.now() + 86400000).toISOString(),
          interviewers: ['Founder', 'CTO'],
          questions: [
            { 
              id: '1',
              type: 'culture', 
              question: 'How do you handle ambiguity and rapid change?', 
              purpose: 'Assess chaos tolerance and builder mindset',
              answer: '',
              score: null,
            },
            { 
              id: '2',
              type: 'stage', 
              question: 'Tell me about your experience at seed stage companies.', 
              purpose: 'Verify stage-fit experience',
              answer: '',
              score: null,
            },
            {
              id: '3',
              type: 'technical',
              question: 'How would you build sales from 0-1?',
              purpose: 'Assess practical experience and approach',
              answer: '',
              score: null,
            },
          ],
          feedback: [],
          status: 'scheduled',
        },
      ]
      setInterviews(defaultInterviews)
      localStorage.setItem('peopleos_interviews', JSON.stringify(defaultInterviews))
    }
  }

  const saveInterview = (interview) => {
    const updated = interviews.map(i => 
      i.id === interview.id ? interview : i
    )
    setInterviews(updated)
    localStorage.setItem('peopleos_interviews', JSON.stringify(updated))
  }

  const updateQuestionAnswer = (interviewId, questionId, answer) => {
    const interview = interviews.find(i => i.id === interviewId)
    if (!interview) return
    
    const updatedQuestions = interview.questions.map(q =>
      q.id === questionId ? { ...q, answer } : q
    )
    const updated = { ...interview, questions: updatedQuestions }
    saveInterview(updated)
  }

  const addFeedback = (interviewId, feedback) => {
    const interview = interviews.find(i => i.id === interviewId)
    if (!interview) return
    
    const newFeedback = {
      id: Date.now().toString(),
      interviewer: 'You',
      ...feedback,
      timestamp: new Date().toISOString(),
    }
    const updated = { ...interview, feedback: [...interview.feedback, newFeedback] }
    saveInterview(updated)
  }

  const calculateInterviewScore = (interview) => {
    const answeredQuestions = interview.questions.filter(q => q.answer && q.answer.trim() !== '')
    if (answeredQuestions.length === 0) return null
    
    const scores = answeredQuestions.map(q => q.score || 70)
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-3">
            Interview Intelligence
          </h1>
          <p className="text-gray-600 text-lg">AI-powered structured interviews with collaborative feedback</p>
        </div>
        <Button variant="primary" icon={Plus} onClick={() => setShowScheduleForm(!showScheduleForm)}>
          Schedule Interview
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Scheduled" 
          value={interviews.filter(i => i.status === 'scheduled').length} 
          icon={Calendar} 
          color="primary"
        />
        <StatCard 
          title="In Progress" 
          value={interviews.filter(i => i.status === 'in_progress').length} 
          icon={Video} 
          color="warning"
        />
        <StatCard 
          title="Completed" 
          value={interviews.filter(i => i.status === 'completed').length} 
          icon={CheckCircle} 
          color="success"
        />
        <StatCard 
          title="Avg Score" 
          value={interviews.length > 0 ? 
            Math.round(interviews.reduce((acc, i) => acc + (calculateInterviewScore(i) || 0), 0) / interviews.length) + '%' 
            : 'N/A'} 
          icon={Star} 
          color="secondary"
        />
      </div>

      <div className="space-y-6">
        {interviews.map((interview) => {
          const score = calculateInterviewScore(interview)
          return (
            <Card key={interview.id} hover className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 rounded-full -mr-20 -mt-20" />
              
              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{interview.candidateName}</h3>
                        <Badge variant={
                          interview.status === 'completed' ? 'success' :
                          interview.status === 'in_progress' ? 'warning' : 'primary'
                        }>
                          {interview.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-gray-600 font-medium mb-3">{interview.role}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-primary-600" />
                          {new Date(interview.scheduledDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users className="h-4 w-4 text-secondary-600" />
                          {interview.interviewers.join(', ')}
                        </span>
                        <Badge variant="gray" size="sm">
                          {interview.stage.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  {score && (
                    <div className="text-right">
                      <div className={`text-4xl font-bold ${
                        score >= 80 ? 'bg-gradient-to-r from-success-600 to-success-700' :
                        score >= 60 ? 'bg-gradient-to-r from-warning-600 to-warning-700' : 
                        'bg-gradient-to-r from-danger-600 to-danger-700'
                      } bg-clip-text text-transparent`}>
                        {score}%
                      </div>
                      <p className="text-sm text-gray-600">Interview Score</p>
                      <Badge 
                        variant={score >= 80 ? 'success' : score >= 60 ? 'warning' : 'danger'}
                        size="sm"
                      >
                        {score >= 80 ? 'Strong' : score >= 60 ? 'Good' : 'Weak'}
                      </Badge>
                    </div>
                  )}
                </div>

              <div className="bg-gray-50 rounded-xl p-5 mb-4">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                  <Star className="h-5 w-5 mr-2 text-primary-600" />
                  AI-Generated Interview Questions
                </h4>
                <div className="space-y-4">
                  {interview.questions.map((q, i) => (
                    <div key={q.id} className="bg-white rounded-lg p-4 border-l-4 border-primary-500 hover:shadow-md transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={
                              q.type === 'culture' ? 'secondary' :
                              q.type === 'stage' ? 'primary' : 'success'
                            } size="sm">
                              {q.type}
                            </Badge>
                            {q.score !== null && (
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-warning-500 fill-warning-500" />
                                <span className="text-sm font-bold text-gray-900">{q.score}/100</span>
                              </div>
                            )}
                          </div>
                          <p className="font-bold text-gray-900 mb-1">{q.question}</p>
                          <p className="text-sm text-gray-600 italic mb-3">
                            <AlertCircle className="h-3 w-3 inline mr-1" />
                            Purpose: {q.purpose}
                          </p>
                        </div>
                      </div>
                      <textarea
                        value={q.answer}
                        onChange={(e) => updateQuestionAnswer(interview.id, q.id, e.target.value)}
                        placeholder="Enter interview notes and candidate's answer..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm mb-3"
                        rows="3"
                      />
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          placeholder="Score (0-100)"
                          value={q.score || ''}
                          onChange={(e) => {
                            const updatedQuestions = interview.questions.map(question =>
                              question.id === q.id ? { ...question, score: parseInt(e.target.value) || null } : question
                            )
                            saveInterview({ ...interview, questions: updatedQuestions })
                          }}
                          className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm font-medium"
                        />
                        {q.score !== null && (
                          <ProgressBar value={q.score} max={100} color={
                            q.score >= 80 ? 'success' : q.score >= 60 ? 'warning' : 'danger'
                          } size="md" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-secondary-600" />
                  Collaborative Feedback
                </h4>
                <div className="space-y-3 mb-4">
                  {interview.feedback.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-4">No feedback yet</p>
                  ) : (
                    interview.feedback.map((fb, i) => (
                      <div key={i} className="bg-gradient-to-r from-gray-50 to-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-secondary-100 rounded-full">
                              <Users className="h-4 w-4 text-secondary-600" />
                            </div>
                            <span className="font-bold text-gray-900">{fb.interviewer}</span>
                          </div>
                          <span className="text-xs text-gray-500">{new Date(fb.timestamp).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{fb.comments}</p>
                        {fb.recommendation && (
                          <Badge variant={
                            fb.recommendation === 'hire' ? 'success' :
                            fb.recommendation === 'consider' ? 'warning' : 'danger'
                          } size="sm">
                            {fb.recommendation === 'hire' ? <ThumbsUp className="h-3 w-3 mr-1 inline" /> : 
                             fb.recommendation === 'consider' ? <AlertCircle className="h-3 w-3 mr-1 inline" /> :
                             <ThumbsDown className="h-3 w-3 mr-1 inline" />}
                            {fb.recommendation}
                          </Badge>
                        )}
                      </div>
                    ))
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  icon={Plus}
                  onClick={() => {
                    const comments = prompt('Enter your feedback:')
                    if (comments) {
                      addFeedback(interview.id, {
                        comments,
                        recommendation: 'consider',
                      })
                    }
                  }}
                >
                  Add Feedback
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-gray-700">Status:</label>
                  <select
                    value={interview.status}
                    onChange={(e) => {
                      saveInterview({ ...interview, status: e.target.value })
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 font-medium"
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={Eye}
                  onClick={() => {
                    setSelectedInterview(interview)
                    setShowDetailModal(true)
                  }}
                >
                  View Full Details
                </Button>
              </div>
              </div>
            </Card>
          )
        })}
      </div>

      {interviews.length === 0 && (
        <Card className="text-center py-16">
          <div className="flex justify-center mb-6">
            <div className="p-6 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full">
              <MessageSquare className="h-16 w-16 text-primary-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No Interviews Scheduled</h3>
          <p className="text-gray-600 mb-6">Start scheduling interviews with your candidates</p>
          <Button variant="primary" icon={Plus} onClick={() => setShowScheduleForm(true)}>
            Schedule First Interview
          </Button>
        </Card>
      )}
    </div>
  )
}
