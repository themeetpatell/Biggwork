import { useNavigate } from 'react-router-dom'
import { 
  Dna, Target, Rocket, Users, Briefcase, MessageSquare, 
  TrendingUp, Award, Zap, CheckCircle, ArrowRight, Sparkles,
  BarChart2, Network, GitBranch, Activity
} from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'

export default function Home() {
  const navigate = useNavigate()

  const features = [
    {
      icon: Dna,
      title: 'Company DNA Scanner',
      description: 'AI-powered analysis of your startup context, culture, and hiring needs',
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: Target,
      title: 'Talent Genome',
      description: 'Multi-dimensional candidate fit scoring with success probability',
      color: 'from-secondary-500 to-secondary-600'
    },
    {
      icon: Rocket,
      title: 'Role Intelligence',
      description: 'Stage-aware job definitions with must-haves and red flags',
      color: 'from-success-500 to-success-600'
    },
    {
      icon: MessageSquare,
      title: 'Interview Intelligence',
      description: 'AI-generated interview questions tailored to your culture',
      color: 'from-warning-500 to-warning-600'
    },
    {
      icon: Users,
      title: 'Onboarding Intelligence',
      description: 'Personalized onboarding with alignment checkpoints',
      color: 'from-danger-500 to-danger-600'
    },
    {
      icon: BarChart2,
      title: 'Predictive Analytics',
      description: 'Mis-hire alerts, retention risk, and success tracking',
      color: 'from-primary-500 to-secondary-500'
    },
    {
      icon: TrendingUp,
      title: 'Exit Intelligence',
      description: 'Structured offboarding and alumni network management',
      color: 'from-success-500 to-primary-500'
    },
    {
      icon: Network,
      title: 'Alumni Network',
      description: 'Maintain relationships for referrals and brand protection',
      color: 'from-secondary-500 to-danger-500'
    },
    {
      icon: GitBranch,
      title: 'Market Intelligence',
      description: 'Real-time talent market insights and competitive analysis',
      color: 'from-warning-500 to-success-500'
    },
    {
      icon: Sparkles,
      title: 'Builder Mode',
      description: 'Culture immersion and entrepreneurial mindset activation',
      color: 'from-danger-500 to-primary-500'
    },
    {
      icon: Activity,
      title: 'PerformanceOS',
      description: 'Continuous performance tracking aligned with company DNA',
      color: 'from-primary-500 to-warning-500'
    },
    {
      icon: Zap,
      title: 'AI Co-pilot',
      description: 'Intelligent assistant for all your talent decisions',
      color: 'from-secondary-500 to-success-500'
    }
  ]

  const stats = [
    { value: '50%', label: 'Reduction in Mis-hires' },
    { value: '60%', label: 'Faster Time to Hire' },
    { value: '80%', label: 'Success Rate' },
    { value: '10x', label: 'Better Fit Predictions' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/10" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl" />
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <Badge variant="primary" size="lg" className="mb-6">
                🚀 The Future of Talent Intelligence
              </Badge>
              <h1 className="text-6xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-success-600 bg-clip-text text-transparent">
                  BiggWork
                </span>
              </h1>
              <p className="text-3xl font-semibold text-gray-800 mb-4">
                Adaptive Talent Intelligence Platform
              </p>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Eliminate startup hiring failures through predictive, context-aware matching powered by AI
              </p>
              <div className="flex gap-4 justify-center">
                <Button 
                  variant="primary" 
                  size="lg" 
                  icon={Rocket} 
                  iconPosition="right"
                  onClick={() => navigate('/dashboard')}
                >
                  Get Started Free
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  icon={Activity}
                  onClick={() => navigate('/dashboard')}
                >
                  View Demo
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 animate-slide-up">
              {stats.map((stat, i) => (
                <Card key={i} className="text-center" hover>
                  <p className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </p>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </Card>
              ))}
            </div>

            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Complete Talent Intelligence Suite
                </h2>
                <p className="text-xl text-gray-600">
                  Everything you need to build and manage a world-class team
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, i) => {
                  const Icon = feature.icon
                  return (
                    <Card key={i} hover glow className="group">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </Card>
                  )
                })}
              </div>
            </div>

            <Card className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white text-center py-16">
              <Award className="h-16 w-16 mx-auto mb-6 animate-bounce-slow" />
              <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Hiring?</h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join leading startups using BiggWork to build exceptional teams with AI-powered intelligence
              </p>
              <Button 
                variant="secondary" 
                size="lg" 
                icon={ArrowRight} 
                iconPosition="right"
                onClick={() => navigate('/dashboard')}
              >
                Start Building Your Team
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

