import { Link, useLocation } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  MessageSquare, 
  UserCheck, 
  BarChart3,
  Dna,
  TrendingDown,
  Network as NetworkIcon,
  TrendingUp,
  Rocket,
  Target,
  Sparkles,
  Menu,
  X,
  Bell,
  Settings,
  User,
  GitBranch,
  Activity,
  Heart,
  LogOut,
  UserCircle,
  ChevronDown,
  Check,
  Clock,
  AlertCircle
} from 'lucide-react'
import Badge from './Badge'

export default function Layout({ children }) {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  
  const notificationRef = useRef(null)
  const profileRef = useRef(null)
  const settingsRef = useRef(null)
  
  const navGroups = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
      single: true
    },
    {
      label: 'Talent',
      icon: Users,
      items: [
        { path: '/roles', label: 'Roles & Gaps', icon: Briefcase },
        { path: '/candidates', label: 'Candidates', icon: Users },
        { path: '/interviews', label: 'Interviews', icon: MessageSquare },
        { path: '/talent-market', label: 'Market Intelligence', icon: TrendingUp },
      ]
    },
    {
      label: 'People',
      icon: UserCheck,
      items: [
        { path: '/onboarding', label: 'Onboarding', icon: UserCheck },
        { path: '/builder-mode', label: 'Builder Mode', icon: Rocket },
        { path: '/performance', label: 'Performance', icon: Target },
      ]
    },
    {
      label: 'Culture',
      icon: Heart,
      items: [
        { path: '/culture-pulse', label: 'Culture Pulse', icon: Activity },
        { path: '/culture-retention', label: 'Retention', icon: Heart },
        { path: '/team-fit-map', label: 'Team Fit Map', icon: GitBranch },
      ]
    },
    {
      label: 'Insights',
      icon: BarChart3,
      items: [
        { path: '/analytics', label: 'Analytics', icon: BarChart3 },
        { path: '/exit-intelligence', label: 'Exit Intelligence', icon: TrendingDown },
        { path: '/alumni-network', label: 'Alumni Network', icon: NetworkIcon },
      ]
    },
    {
      label: 'AI Co-pilot',
      path: '/ai-copilot',
      icon: Sparkles,
      single: true
    },
  ]

  const [openDropdown, setOpenDropdown] = useState(null)

  // Mock notifications
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'New candidate matched',
      message: 'Sarah Chen - 95% fit score for Senior Engineer role',
      time: '5m ago',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Interview reminder',
      message: 'Interview with Mike Johnson in 30 minutes',
      time: '25m ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'Onboarding checkpoint',
      message: 'Emma Wilson completed 30-day checkpoint',
      time: '2h ago',
      read: true
    },
    {
      id: 4,
      type: 'danger',
      title: 'Retention alert',
      message: 'High risk employee detected - immediate action needed',
      time: '3h ago',
      read: false
    }
  ]

  const unreadCount = notifications.filter(n => !n.read).length

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false)
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setSettingsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'success': return <Check className="h-4 w-4 text-success-600" />
      case 'warning': return <Clock className="h-4 w-4 text-warning-600" />
      case 'danger': return <AlertCircle className="h-4 w-4 text-danger-600" />
      default: return <Bell className="h-4 w-4 text-primary-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Fixed Navbar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link to="/" className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg">
                  <Dna className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent hidden sm:block">
                  PeopleOS
                </span>
              </Link>
            </div>

            {/* Desktop Navigation - Grouped */}
            <div className="hidden lg:flex flex-1 items-center justify-center px-4">
              <div className="flex space-x-1">
                {navGroups.map((group, idx) => {
                  const Icon = group.icon
                  
                  // Single item (no dropdown)
                  if (group.single) {
                    const isActive = location.pathname === group.path
                    return (
                      <Link
                        key={group.path}
                        to={group.path}
                        className={`inline-flex items-center px-3 py-2 text-sm font-medium whitespace-nowrap rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-primary-50 text-primary-700 shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {group.label}
                      </Link>
                    )
                  }
                  
                  // Dropdown group
                  const isGroupActive = group.items.some(item => location.pathname === item.path)
                  const isOpen = openDropdown === idx
                  
                  return (
                    <div key={idx} className="relative">
                      <button
                        onClick={() => setOpenDropdown(isOpen ? null : idx)}
                        onMouseEnter={() => setOpenDropdown(idx)}
                        className={`inline-flex items-center px-3 py-2 text-sm font-medium whitespace-nowrap rounded-lg transition-all duration-200 ${
                          isGroupActive
                            ? 'bg-primary-50 text-primary-700 shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {group.label}
                        <ChevronDown className={`h-3 w-3 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {isOpen && (
                        <div 
                          className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-fade-in"
                          onMouseLeave={() => setOpenDropdown(null)}
                        >
                          {group.items.map((item) => {
                            const ItemIcon = item.icon
                            const isActive = location.pathname === item.path
                            return (
                              <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setOpenDropdown(null)}
                                className={`flex items-center px-4 py-2 text-sm transition-colors ${
                                  isActive
                                    ? 'bg-primary-50 text-primary-700 font-medium'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                <ItemIcon className="h-4 w-4 mr-3" />
                                {item.label}
                              </Link>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Notifications Dropdown */}
              <div className="relative" ref={notificationRef}>
                <button 
                  onClick={() => {
                    setNotificationOpen(!notificationOpen)
                    setProfileOpen(false)
                    setSettingsOpen(false)
                  }}
                  className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 h-4 w-4 bg-danger-500 text-white text-xs flex items-center justify-center rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {notificationOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-fade-in">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <h3 className="font-bold text-gray-900">Notifications</h3>
                      <p className="text-xs text-gray-500">{unreadCount} unread</p>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notif) => (
                        <button
                          key={notif.id}
                          className={`w-full px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-100 ${
                            !notif.read ? 'bg-primary-50' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-1">
                              {getNotificationIcon(notif.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">{notif.title}</p>
                              <p className="text-xs text-gray-600 mt-1">{notif.message}</p>
                              <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                            </div>
                            {!notif.read && (
                              <div className="h-2 w-2 bg-primary-500 rounded-full flex-shrink-0 mt-2"></div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-200">
                      <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Settings Dropdown */}
              <div className="relative" ref={settingsRef}>
                <button 
                  onClick={() => {
                    setSettingsOpen(!settingsOpen)
                    setNotificationOpen(false)
                    setProfileOpen(false)
                  }}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Settings className="h-5 w-5" />
                </button>

                {settingsOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-fade-in">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <h3 className="font-bold text-gray-900">Settings</h3>
                    </div>
                    <Link
                      to="/account-settings"
                      onClick={() => setSettingsOpen(false)}
                      className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      <UserCircle className="h-4 w-4 text-gray-600" />
                      Account Settings
                    </Link>
                    <Link
                      to="/notification-preferences"
                      onClick={() => setSettingsOpen(false)}
                      className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      <Bell className="h-4 w-4 text-gray-600" />
                      Notification Preferences
                    </Link>
                    <Link
                      to="/company-settings"
                      onClick={() => setSettingsOpen(false)}
                      className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      <Settings className="h-4 w-4 text-gray-600" />
                      Company Settings
                    </Link>
                    <Link
                      to="/team-management"
                      onClick={() => setSettingsOpen(false)}
                      className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      <Users className="h-4 w-4 text-gray-600" />
                      Team Management
                    </Link>
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button 
                  onClick={() => {
                    setProfileOpen(!profileOpen)
                    setNotificationOpen(false)
                    setSettingsOpen(false)
                  }}
                  className="flex items-center gap-2 p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <User className="h-5 w-5" />
                  <ChevronDown className="h-4 w-4 hidden sm:block" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-fade-in">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="font-bold text-gray-900">Sarah Chen</p>
                      <p className="text-sm text-gray-500">sarah@company.com</p>
                      <Badge variant="primary" size="sm" className="mt-2">Admin</Badge>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      <UserCircle className="h-4 w-4 text-gray-600" />
                      View Profile
                    </Link>
                    <Link
                      to="/my-settings"
                      onClick={() => setProfileOpen(false)}
                      className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      <Settings className="h-4 w-4 text-gray-600" />
                      My Settings
                    </Link>
                    <div className="border-t border-gray-200 mt-2 pt-2">
                      <button className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors flex items-center gap-2 text-danger-600">
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white shadow-lg animate-slide-down max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="px-2 py-3 space-y-3">
              {navGroups.map((group, idx) => {
                const Icon = group.icon
                
                // Single item
                if (group.single) {
                  const isActive = location.pathname === group.path
                  return (
                    <Link
                      key={group.path}
                      to={group.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                        isActive
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      {group.label}
                    </Link>
                  )
                }
                
                // Group with items
                return (
                  <div key={idx}>
                    <div className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {group.label}
                    </div>
                    <div className="space-y-1 mt-1">
                      {group.items.map((item) => {
                        const ItemIcon = item.icon
                        const isActive = location.pathname === item.path
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                              isActive
                                ? 'bg-primary-50 text-primary-700'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                          >
                            <ItemIcon className="h-4 w-4 mr-3" />
                            {item.label}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content - Add top padding to account for fixed navbar */}
      <main className="pt-16 animate-fade-in">{children}</main>
    </div>
  )
}
