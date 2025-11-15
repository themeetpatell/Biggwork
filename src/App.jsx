import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Roles from './pages/Roles'
import Candidates from './pages/Candidates'
import Interviews from './pages/Interviews'
import Onboarding from './pages/Onboarding'
import Analytics from './pages/Analytics'
import ExitIntelligence from './pages/ExitIntelligence'
import AlumniNetwork from './pages/AlumniNetwork'
import TalentMarketIntelligence from './pages/TalentMarketIntelligence'
import BuilderMode from './pages/BuilderMode'
import PerformanceOS from './pages/PerformanceOS'
import AICopilot from './pages/AICopilot'
import TeamFitMap from './pages/TeamFitMap'
import CulturePulse from './pages/CulturePulse'
import CultureRetention from './pages/CultureRetention'
import Profile from './pages/Profile'
import MySettings from './pages/MySettings'
import AccountSettings from './pages/AccountSettings'
import NotificationPreferences from './pages/NotificationPreferences'
import CompanySettings from './pages/CompanySettings'
import TeamManagement from './pages/TeamManagement'
import Layout from './components/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import ToastContainer from './components/ToastContainer'
import { useToast } from './hooks/useToast'

function App() {
  const { toasts, removeToast } = useToast()

  return (
    <ErrorBoundary>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/interviews" element={<Interviews />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/exit-intelligence" element={<ExitIntelligence />} />
          <Route path="/alumni-network" element={<AlumniNetwork />} />
          <Route path="/talent-market" element={<TalentMarketIntelligence />} />
          <Route path="/builder-mode" element={<BuilderMode />} />
          <Route path="/performance" element={<PerformanceOS />} />
          <Route path="/ai-copilot" element={<AICopilot />} />
          <Route path="/team-fit-map" element={<TeamFitMap />} />
          <Route path="/culture-pulse" element={<CulturePulse />} />
          <Route path="/culture-retention" element={<CultureRetention />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-settings" element={<MySettings />} />
          <Route path="/account-settings" element={<AccountSettings />} />
          <Route path="/notification-preferences" element={<NotificationPreferences />} />
          <Route path="/company-settings" element={<CompanySettings />} />
          <Route path="/team-management" element={<TeamManagement />} />
        </Routes>
        <ToastContainer toasts={toasts} onClose={removeToast} />
      </Layout>
    </ErrorBoundary>
  )
}

export default App

