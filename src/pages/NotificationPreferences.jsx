import { useState } from 'react'
import { Bell, Mail, MessageSquare, Smartphone, Check, X } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'

export default function NotificationPreferences() {
  const [preferences, setPreferences] = useState({
    email: {
      newCandidates: true,
      interviewReminders: true,
      onboardingUpdates: true,
      retentionAlerts: true,
      weeklyDigest: true,
      monthlyReport: false,
    },
    push: {
      newCandidates: true,
      interviewReminders: true,
      onboardingUpdates: false,
      retentionAlerts: true,
      weeklyDigest: false,
      monthlyReport: false,
    },
    inApp: {
      newCandidates: true,
      interviewReminders: true,
      onboardingUpdates: true,
      retentionAlerts: true,
      weeklyDigest: true,
      monthlyReport: true,
    },
  })

  const notificationTypes = [
    {
      id: 'newCandidates',
      label: 'New Candidates',
      description: 'When a new candidate is added to the pipeline',
      icon: '👤'
    },
    {
      id: 'interviewReminders',
      label: 'Interview Reminders',
      description: 'Reminders before scheduled interviews',
      icon: '📅'
    },
    {
      id: 'onboardingUpdates',
      label: 'Onboarding Updates',
      description: 'Progress updates on new hire onboarding',
      icon: '🚀'
    },
    {
      id: 'retentionAlerts',
      label: 'Retention Alerts',
      description: 'High-priority retention risk notifications',
      icon: '⚠️'
    },
    {
      id: 'weeklyDigest',
      label: 'Weekly Digest',
      description: 'Summary of weekly activities and metrics',
      icon: '📊'
    },
    {
      id: 'monthlyReport',
      label: 'Monthly Report',
      description: 'Comprehensive monthly performance report',
      icon: '📈'
    },
  ]

  const togglePreference = (channel, type) => {
    setPreferences({
      ...preferences,
      [channel]: {
        ...preferences[channel],
        [type]: !preferences[channel][type]
      }
    })
  }

  const handleSave = () => {
    alert('Notification preferences saved!')
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-3">
          Notification Preferences
        </h1>
        <p className="text-gray-600 text-lg">Choose how you want to be notified about important updates</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card className="text-center">
          <Bell className="h-8 w-8 text-primary-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">
            {Object.values(preferences.inApp).filter(Boolean).length}
          </p>
          <p className="text-sm text-gray-600">In-App Active</p>
        </Card>
        <Card className="text-center">
          <Mail className="h-8 w-8 text-secondary-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">
            {Object.values(preferences.email).filter(Boolean).length}
          </p>
          <p className="text-sm text-gray-600">Email Active</p>
        </Card>
        <Card className="text-center">
          <Smartphone className="h-8 w-8 text-success-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">
            {Object.values(preferences.push).filter(Boolean).length}
          </p>
          <p className="text-sm text-gray-600">Push Active</p>
        </Card>
        <Card className="text-center">
          <MessageSquare className="h-8 w-8 text-warning-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">
            {notificationTypes.length}
          </p>
          <p className="text-sm text-gray-600">Total Types</p>
        </Card>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 font-bold text-gray-900">Notification Type</th>
                <th className="text-center py-4 px-4 font-bold text-gray-900">
                  <div className="flex flex-col items-center">
                    <Bell className="h-5 w-5 text-primary-600 mb-1" />
                    <span>In-App</span>
                  </div>
                </th>
                <th className="text-center py-4 px-4 font-bold text-gray-900">
                  <div className="flex flex-col items-center">
                    <Mail className="h-5 w-5 text-secondary-600 mb-1" />
                    <span>Email</span>
                  </div>
                </th>
                <th className="text-center py-4 px-4 font-bold text-gray-900">
                  <div className="flex flex-col items-center">
                    <Smartphone className="h-5 w-5 text-success-600 mb-1" />
                    <span>Push</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {notificationTypes.map((type) => (
                <tr key={type.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{type.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900">{type.label}</p>
                        <p className="text-sm text-gray-600">{type.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-center py-4 px-4">
                    <button
                      onClick={() => togglePreference('inApp', type.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        preferences.inApp[type.id]
                          ? 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                          : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                      }`}
                    >
                      {preferences.inApp[type.id] ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <X className="h-5 w-5" />
                      )}
                    </button>
                  </td>
                  <td className="text-center py-4 px-4">
                    <button
                      onClick={() => togglePreference('email', type.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        preferences.email[type.id]
                          ? 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                          : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                      }`}
                    >
                      {preferences.email[type.id] ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <X className="h-5 w-5" />
                      )}
                    </button>
                  </td>
                  <td className="text-center py-4 px-4">
                    <button
                      onClick={() => togglePreference('push', type.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        preferences.push[type.id]
                          ? 'bg-success-100 text-success-700 hover:bg-success-200'
                          : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                      }`}
                    >
                      {preferences.push[type.id] ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <X className="h-5 w-5" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-between pt-6 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <Badge variant="success">
              {Object.values(preferences.inApp).filter(Boolean).length + 
               Object.values(preferences.email).filter(Boolean).length + 
               Object.values(preferences.push).filter(Boolean).length} active
            </Badge>
            <Badge variant="gray">
              {notificationTypes.length * 3 - 
               (Object.values(preferences.inApp).filter(Boolean).length + 
                Object.values(preferences.email).filter(Boolean).length + 
                Object.values(preferences.push).filter(Boolean).length)} disabled
            </Badge>
          </div>
          <Button variant="primary" onClick={handleSave}>
            Save Preferences
          </Button>
        </div>
      </Card>

      <Card className="mt-6 bg-primary-50 border-primary-200">
        <div className="flex items-start gap-3">
          <Bell className="h-5 w-5 text-primary-600 mt-0.5" />
          <div>
            <p className="font-bold text-primary-900 mb-1">Notification Tips</p>
            <ul className="text-sm text-primary-700 space-y-1">
              <li>• In-App notifications appear in the notification dropdown</li>
              <li>• Email notifications are sent to your registered email address</li>
              <li>• Push notifications require browser permission</li>
              <li>• Critical alerts (like retention risks) are always sent</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}

