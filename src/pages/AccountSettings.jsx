import { useState } from 'react'
import { User, Mail, Phone, MapPin, Calendar, Camera, Save, Shield } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import Input from '../components/Input'
import Badge from '../components/Badge'

export default function AccountSettings() {
  const [formData, setFormData] = useState({
    firstName: 'Sarah',
    lastName: 'Chen',
    email: 'sarah@company.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    jobTitle: 'VP of People Operations',
    department: 'Human Resources',
    startDate: '2022-01-15',
    bio: 'Passionate about building high-performing teams and creating exceptional workplace cultures.',
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleSave = () => {
    alert('Profile updated successfully!')
  }

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    alert('Password changed successfully!')
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-3">
          Account Settings
        </h1>
        <p className="text-gray-600 text-lg">Manage your personal information and account preferences</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Picture */}
        <Card className="md:col-span-1">
          <h2 className="text-xl font-bold mb-6">Profile Picture</h2>
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="h-32 w-32 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                SC
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <Camera className="h-4 w-4 text-gray-600" />
              </button>
            </div>
            <p className="text-sm text-gray-600 text-center mb-4">
              JPG, GIF or PNG. Max size of 800K
            </p>
            <Button variant="outline" size="sm">
              Upload Photo
            </Button>
          </div>
        </Card>

        {/* Profile Info */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center">
                <User className="h-5 w-5 mr-2 text-primary-600" />
                Personal Information
              </h2>
              <Badge variant="primary">Admin</Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <Input
                label="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
              <Input
                label="Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
              <Input
                label="Email"
                type="email"
                icon={Mail}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <Input
                label="Phone"
                type="tel"
                icon={Phone}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <Input
                label="Location"
                icon={MapPin}
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
              <Input
                label="Job Title"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
              />
              <Input
                label="Department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
              <Input
                label="Start Date"
                type="date"
                icon={Calendar}
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <Button variant="primary" icon={Save} onClick={handleSave}>
              Save Changes
            </Button>
          </Card>

          <Card>
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-warning-600" />
              Change Password
            </h2>

            <div className="space-y-4 mb-6">
              <Input
                label="Current Password"
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              />
              <Input
                label="New Password"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              />
              <Input
                label="Confirm New Password"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              />
            </div>

            <Button variant="warning" onClick={handlePasswordChange}>
              Update Password
            </Button>
          </Card>

          <Card className="bg-danger-50 border-danger-200">
            <h2 className="text-xl font-bold text-danger-900 mb-4">Danger Zone</h2>
            <p className="text-sm text-danger-700 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button variant="danger">
              Delete Account
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}

