import { useState } from 'react'
import { 
  Settings, Bell, Eye, Globe, Moon, Zap, Save, Shield,
  Monitor, Smartphone, Mail, MessageSquare
} from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'

export default function MySettings() {
  const [settings, setSettings] = useState({
    appearance: {
      theme: 'light',
      compactMode: false,
      animations: true,
    },
    notifications: {
      email: true,
      push: true,
      sound: false,
    },
    privacy: {
      profileVisibility: 'team',
      activityStatus: true,
      emailVisibility: 'team',
    },
    language: 'en',
    timezone: 'America/Los_Angeles',
  })

  const handleSave = () => {
    alert('Settings saved successfully!')
  }

  const toggleSetting = (category, key) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [key]: !settings[category][key]
      }
    })
  }

  const updateSetting = (category, key, value) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [key]: value
      }
    })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-3">
          My Settings
        </h1>
        <p className="text-gray-600 text-lg">Customize your personal BiggWork experience</p>
      </div>

      <div className="space-y-6">
        {/* Appearance */}
        <Card>
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <Monitor className="h-5 w-5 mr-2 text-primary-600" />
            Appearance
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => updateSetting('appearance', 'theme', 'light')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    settings.appearance.theme === 'light'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Monitor className="h-6 w-6 mx-auto mb-2 text-gray-700" />
                  <p className="text-sm font-medium">Light</p>
                </button>
                <button
                  onClick={() => updateSetting('appearance', 'theme', 'dark')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    settings.appearance.theme === 'dark'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Moon className="h-6 w-6 mx-auto mb-2 text-gray-700" />
                  <p className="text-sm font-medium">Dark</p>
                </button>
                <button
                  onClick={() => updateSetting('appearance', 'theme', 'auto')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    settings.appearance.theme === 'auto'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Zap className="h-6 w-6 mx-auto mb-2 text-gray-700" />
                  <p className="text-sm font-medium">Auto</p>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">Compact Mode</p>
                <p className="text-sm text-gray-600">Reduce spacing and padding</p>
              </div>
              <button
                onClick={() => toggleSetting('appearance', 'compactMode')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.appearance.compactMode ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.appearance.compactMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">Animations</p>
                <p className="text-sm text-gray-600">Enable smooth transitions</p>
              </div>
              <button
                onClick={() => toggleSetting('appearance', 'animations')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.appearance.animations ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.appearance.animations ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </Card>

        {/* Quick Notifications */}
        <Card>
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <Bell className="h-5 w-5 mr-2 text-warning-600" />
            Quick Notifications
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-secondary-600" />
                <div>
                  <p className="font-medium text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-600">Receive updates via email</p>
                </div>
              </div>
              <button
                onClick={() => toggleSetting('notifications', 'email')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications.email ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications.email ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-success-600" />
                <div>
                  <p className="font-medium text-gray-900">Push Notifications</p>
                  <p className="text-sm text-gray-600">Browser notifications</p>
                </div>
              </div>
              <button
                onClick={() => toggleSetting('notifications', 'push')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications.push ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications.push ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-primary-600" />
                <div>
                  <p className="font-medium text-gray-900">Sound Alerts</p>
                  <p className="text-sm text-gray-600">Play sound for notifications</p>
                </div>
              </div>
              <button
                onClick={() => toggleSetting('notifications', 'sound')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications.sound ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications.sound ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="pt-3 border-t border-gray-200">
              <Button variant="outline" size="sm">
                Configure Advanced Notifications
              </Button>
            </div>
          </div>
        </Card>

        {/* Privacy */}
        <Card>
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-danger-600" />
            Privacy
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Visibility
              </label>
              <select
                value={settings.privacy.profileVisibility}
                onChange={(e) => updateSetting('privacy', 'profileVisibility', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="public">Public - Everyone can see</option>
                <option value="team">Team Only - Only team members</option>
                <option value="private">Private - Only me</option>
              </select>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Eye className="h-5 w-5 text-primary-600" />
                <div>
                  <p className="font-medium text-gray-900">Show Activity Status</p>
                  <p className="text-sm text-gray-600">Let others see when you're online</p>
                </div>
              </div>
              <button
                onClick={() => toggleSetting('privacy', 'activityStatus')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.privacy.activityStatus ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.privacy.activityStatus ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Visibility
              </label>
              <select
                value={settings.privacy.emailVisibility}
                onChange={(e) => updateSetting('privacy', 'emailVisibility', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="public">Everyone</option>
                <option value="team">Team Only</option>
                <option value="private">Hidden</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Localization */}
        <Card>
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <Globe className="h-5 w-5 mr-2 text-success-600" />
            Localization
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                value={settings.language}
                onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="ja">日本語</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timezone
              </label>
              <select
                value={settings.timezone}
                onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="Europe/London">London (GMT)</option>
                <option value="Europe/Paris">Paris (CET)</option>
                <option value="Asia/Tokyo">Tokyo (JST)</option>
              </select>
            </div>
          </div>
        </Card>

        <div className="flex justify-end gap-3">
          <Button variant="outline">Reset to Defaults</Button>
          <Button variant="primary" icon={Save} onClick={handleSave}>
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  )
}

