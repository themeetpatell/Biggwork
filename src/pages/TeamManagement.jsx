import { useState } from 'react'
import { Users, UserPlus, Mail, Shield, MoreVertical, Search, Filter, Crown, Star } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
import Input from '../components/Input'
import Modal from '../components/Modal'

export default function TeamManagement() {
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('member')
  const [searchQuery, setSearchQuery] = useState('')

  const [team] = useState([
    {
      id: 1,
      name: 'Sarah Chen',
      email: 'sarah@company.com',
      role: 'admin',
      department: 'People Ops',
      status: 'active',
      joinedDate: '2022-01-15',
      lastActive: '2 mins ago',
      avatar: 'SC'
    },
    {
      id: 2,
      name: 'Mike Johnson',
      email: 'mike@company.com',
      role: 'manager',
      department: 'Engineering',
      status: 'active',
      joinedDate: '2022-03-20',
      lastActive: '1 hour ago',
      avatar: 'MJ'
    },
    {
      id: 3,
      name: 'Emma Wilson',
      email: 'emma@company.com',
      role: 'member',
      department: 'Design',
      status: 'active',
      joinedDate: '2022-06-10',
      lastActive: '3 hours ago',
      avatar: 'EW'
    },
    {
      id: 4,
      name: 'Alex Turner',
      email: 'alex@company.com',
      role: 'member',
      department: 'Marketing',
      status: 'invited',
      joinedDate: null,
      lastActive: null,
      avatar: 'AT'
    },
    {
      id: 5,
      name: 'Lisa Brown',
      email: 'lisa@company.com',
      role: 'manager',
      department: 'Sales',
      status: 'active',
      joinedDate: '2021-11-05',
      lastActive: '1 day ago',
      avatar: 'LB'
    },
  ])

  const roles = [
    { value: 'admin', label: 'Admin', description: 'Full access to all features', color: 'danger' },
    { value: 'manager', label: 'Manager', description: 'Manage team and view analytics', color: 'warning' },
    { value: 'member', label: 'Member', description: 'Basic access to core features', color: 'primary' },
  ]

  const handleInvite = () => {
    if (!inviteEmail) return
    alert(`Invitation sent to ${inviteEmail} as ${inviteRole}`)
    setShowInviteModal(false)
    setInviteEmail('')
    setInviteRole('member')
  }

  const filteredTeam = team.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.department.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getRoleBadge = (role) => {
    const roleConfig = roles.find(r => r.value === role)
    return <Badge variant={roleConfig?.color || 'gray'}>{roleConfig?.label || role}</Badge>
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { label: 'Active', variant: 'success' },
      invited: { label: 'Invited', variant: 'warning' },
      inactive: { label: 'Inactive', variant: 'gray' },
    }
    const config = statusConfig[status] || statusConfig.inactive
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-3">
            Team Management
          </h1>
          <p className="text-gray-600 text-lg">Manage team members, roles, and permissions</p>
        </div>
        <Button variant="primary" icon={UserPlus} onClick={() => setShowInviteModal(true)}>
          Invite Team Member
        </Button>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card className="text-center">
          <Users className="h-8 w-8 text-primary-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{team.filter(m => m.status === 'active').length}</p>
          <p className="text-sm text-gray-600">Active Members</p>
        </Card>
        <Card className="text-center">
          <Crown className="h-8 w-8 text-danger-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{team.filter(m => m.role === 'admin').length}</p>
          <p className="text-sm text-gray-600">Admins</p>
        </Card>
        <Card className="text-center">
          <Star className="h-8 w-8 text-warning-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{team.filter(m => m.role === 'manager').length}</p>
          <p className="text-sm text-gray-600">Managers</p>
        </Card>
        <Card className="text-center">
          <Mail className="h-8 w-8 text-secondary-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{team.filter(m => m.status === 'invited').length}</p>
          <p className="text-sm text-gray-600">Pending Invites</p>
        </Card>
      </div>

      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search by name, email, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={Search}
            />
          </div>
          <Button variant="outline" icon={Filter}>
            Filters
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-bold text-gray-900">Member</th>
                <th className="text-left py-3 px-4 font-bold text-gray-900">Department</th>
                <th className="text-left py-3 px-4 font-bold text-gray-900">Role</th>
                <th className="text-left py-3 px-4 font-bold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-bold text-gray-900">Last Active</th>
                <th className="text-right py-3 px-4 font-bold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeam.map((member) => (
                <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-bold">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 flex items-center gap-2">
                          {member.name}
                          {member.role === 'admin' && <Crown className="h-4 w-4 text-warning-600" />}
                        </p>
                        <p className="text-sm text-gray-600">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-gray-900">{member.department}</p>
                  </td>
                  <td className="py-4 px-4">
                    {getRoleBadge(member.role)}
                  </td>
                  <td className="py-4 px-4">
                    {getStatusBadge(member.status)}
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-600">
                      {member.lastActive || 'Never'}
                    </p>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="h-5 w-5 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Shield className="h-5 w-5 mr-2 text-primary-600" />
          Role Permissions
        </h2>
        <div className="space-y-4">
          {roles.map((role) => (
            <div key={role.value} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {role.value === 'admin' && <Crown className="h-5 w-5 text-danger-600 mt-1" />}
                  {role.value === 'manager' && <Star className="h-5 w-5 text-warning-600 mt-1" />}
                  {role.value === 'member' && <Users className="h-5 w-5 text-primary-600 mt-1" />}
                  <div>
                    <p className="font-bold text-gray-900">{role.label}</p>
                    <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                  </div>
                </div>
                <Badge variant={role.color}>
                  {team.filter(m => m.role === role.value).length} members
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Invite Modal */}
      <Modal isOpen={showInviteModal} onClose={() => setShowInviteModal(false)} title="Invite Team Member">
        <div className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="colleague@company.com"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            icon={Mail}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label} - {role.description}
                </option>
              ))}
            </select>
          </div>

          <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
            <p className="text-sm text-primary-800">
              An invitation email will be sent to this address. They'll need to accept the invitation to join your team.
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowInviteModal(false)} className="flex-1">
              Cancel
            </Button>
            <Button variant="primary" onClick={handleInvite} className="flex-1">
              Send Invitation
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

