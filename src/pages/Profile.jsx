import { useState } from 'react'
import { 
  User, Mail, Phone, MapPin, Calendar, Briefcase, Award, 
  TrendingUp, Target, Zap, Heart, Star, Edit, Activity
} from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
import ProgressBar from '../components/ProgressBar'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const navigate = useNavigate()
  
  const profileData = {
    name: 'Sarah Chen',
    email: 'sarah@company.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    jobTitle: 'VP of People Operations',
    department: 'Human Resources',
    startDate: '2022-01-15',
    role: 'Admin',
    bio: 'Passionate about building high-performing teams and creating exceptional workplace cultures. Focused on data-driven talent strategies and continuous improvement.',
  }

  const stats = [
    { label: 'Active Candidates', value: '24', icon: User, color: 'primary' },
    { label: 'Interviews Scheduled', value: '12', icon: Calendar, color: 'secondary' },
    { label: 'Team Members', value: '47', icon: Award, color: 'success' },
    { label: 'Retention Rate', value: '94%', icon: Heart, color: 'warning' },
  ]

  const achievements = [
    {
      title: 'Builder Champion',
      description: 'Completed all Builder Mode modules',
      icon: Zap,
      color: 'warning',
      earned: '2024-01-15'
    },
    {
      title: 'Hiring Expert',
      description: 'Successfully hired 50+ candidates',
      icon: Target,
      color: 'success',
      earned: '2023-11-20'
    },
    {
      title: 'Culture Leader',
      description: 'Maintained 90%+ culture alignment',
      icon: Star,
      color: 'primary',
      earned: '2023-09-10'
    },
    {
      title: 'Retention Hero',
      description: 'Zero regrettable attrition this year',
      icon: Heart,
      color: 'danger',
      earned: '2024-02-01'
    },
  ]

  const recentActivity = [
    {
      action: 'Reviewed candidate',
      target: 'Mike Johnson - Senior Engineer',
      time: '2 hours ago',
      type: 'candidate'
    },
    {
      action: 'Scheduled interview',
      target: 'Emma Wilson - Product Manager',
      time: '5 hours ago',
      type: 'interview'
    },
    {
      action: 'Updated onboarding plan',
      target: 'New hire orientation - Week 1',
      time: '1 day ago',
      type: 'onboarding'
    },
    {
      action: 'Analyzed retention risk',
      target: 'Engineering team - Q1 review',
      time: '2 days ago',
      type: 'retention'
    },
  ]

  const skills = [
    { name: 'Talent Acquisition', level: 95 },
    { name: 'Performance Management', level: 90 },
    { name: 'Culture Development', level: 88 },
    { name: 'Data Analytics', level: 85 },
    { name: 'Leadership', level: 92 },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <div className="text-center">
              <div className="h-32 w-32 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
                SC
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{profileData.name}</h1>
              <p className="text-gray-600 mb-3">{profileData.jobTitle}</p>
              <Badge variant="primary" size="lg">{profileData.role}</Badge>
              
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3 text-left">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{profileData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{profileData.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{profileData.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Briefcase className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{profileData.department}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Joined {new Date(profileData.startDate).toLocaleDateString()}</span>
                </div>
              </div>

              <Button 
                variant="primary" 
                icon={Edit} 
                className="w-full mt-6"
                onClick={() => navigate('/account-settings')}
              >
                Edit Profile
              </Button>
            </div>
          </Card>

          <Card>
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-primary-600" />
              Key Skills
            </h3>
            <div className="space-y-4">
              {skills.map((skill, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                    <span className="text-sm font-bold text-primary-600">{skill.level}%</span>
                  </div>
                  <ProgressBar progress={skill.level} color="primary" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column - Activity & Stats */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Profile Overview</h2>
              <p className="text-gray-600 mt-1">Your activity and achievements</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <Card key={idx} className="text-center">
                  <Icon className={`h-6 w-6 mx-auto mb-2 text-${stat.color}-600`} />
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
                </Card>
              )
            })}
          </div>

          {/* Bio */}
          <Card>
            <h3 className="font-bold text-gray-900 mb-3 flex items-center">
              <User className="h-5 w-5 mr-2 text-secondary-600" />
              About
            </h3>
            <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
          </Card>

          {/* Achievements */}
          <Card>
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <Award className="h-5 w-5 mr-2 text-warning-600" />
              Achievements
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {achievements.map((achievement, idx) => {
                const Icon = achievement.icon
                return (
                  <div 
                    key={idx} 
                    className={`p-4 rounded-lg border-2 bg-gradient-to-br from-${achievement.color}-50 to-white border-${achievement.color}-200`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 bg-${achievement.color}-100 rounded-lg`}>
                        <Icon className={`h-5 w-5 text-${achievement.color}-600`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1">{achievement.title}</h4>
                        <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
                        <p className="text-xs text-gray-500">Earned {new Date(achievement.earned).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card>
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-primary-600" />
              Recent Activity
            </h3>
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-white rounded-lg border border-gray-200">
                    {activity.type === 'candidate' && <User className="h-4 w-4 text-primary-600" />}
                    {activity.type === 'interview' && <Calendar className="h-4 w-4 text-secondary-600" />}
                    {activity.type === 'onboarding' && <Zap className="h-4 w-4 text-success-600" />}
                    {activity.type === 'retention' && <Heart className="h-4 w-4 text-danger-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.action}</span>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{activity.target}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

