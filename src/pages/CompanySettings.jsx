import { useState } from 'react'
import { Building2, Users, MapPin, Globe, Calendar, DollarSign, Target, Save } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import Input from '../components/Input'
import Badge from '../components/Badge'

export default function CompanySettings() {
  const [companyData, setCompanyData] = useState({
    name: 'TechCorp Inc.',
    industry: 'Technology',
    size: '50-100',
    founded: '2020',
    website: 'https://techcorp.com',
    headquarters: 'San Francisco, CA',
    description: 'Building the future of workplace technology',
  })

  const [cultureData, setCultureData] = useState({
    stage: 'series_a',
    values: ['Innovation', 'Ownership', 'Velocity', 'Impact'],
    workModel: 'hybrid',
    benefitsOffered: ['Health Insurance', 'Equity', '401k', 'Remote Work', 'Learning Budget'],
  })

  const [compensationData, setCompensationData] = useState({
    currency: 'USD',
    payrollCycle: 'bi-weekly',
    fiscalYearStart: 'January',
    equityPool: '15%',
  })

  const stages = [
    { value: 'pre_seed', label: 'Pre-Seed' },
    { value: 'seed', label: 'Seed' },
    { value: 'series_a', label: 'Series A' },
    { value: 'series_b', label: 'Series B' },
    { value: 'series_c', label: 'Series C' },
    { value: 'growth', label: 'Growth' },
  ]

  const workModels = [
    { value: 'remote', label: 'Fully Remote' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'office', label: 'In-Office' },
  ]

  const handleSave = () => {
    alert('Company settings saved successfully!')
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-3">
          Company Settings
        </h1>
        <p className="text-gray-600 text-lg">Manage your company profile and organizational settings</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <Card className="text-center">
          <Building2 className="h-8 w-8 text-primary-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{companyData.size}</p>
          <p className="text-sm text-gray-600">Employees</p>
        </Card>
        <Card className="text-center">
          <Calendar className="h-8 w-8 text-secondary-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{new Date().getFullYear() - parseInt(companyData.founded)}</p>
          <p className="text-sm text-gray-600">Years Old</p>
        </Card>
        <Card className="text-center">
          <Target className="h-8 w-8 text-success-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900 capitalize">{cultureData.stage.replace('_', ' ')}</p>
          <p className="text-sm text-gray-600">Company Stage</p>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <Building2 className="h-5 w-5 mr-2 text-primary-600" />
            Company Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Company Name"
              value={companyData.name}
              onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
            />
            <Input
              label="Industry"
              value={companyData.industry}
              onChange={(e) => setCompanyData({ ...companyData, industry: e.target.value })}
            />
            <Input
              label="Company Size"
              value={companyData.size}
              onChange={(e) => setCompanyData({ ...companyData, size: e.target.value })}
            />
            <Input
              label="Founded Year"
              type="number"
              icon={Calendar}
              value={companyData.founded}
              onChange={(e) => setCompanyData({ ...companyData, founded: e.target.value })}
            />
            <Input
              label="Website"
              type="url"
              icon={Globe}
              value={companyData.website}
              onChange={(e) => setCompanyData({ ...companyData, website: e.target.value })}
            />
            <Input
              label="Headquarters"
              icon={MapPin}
              value={companyData.headquarters}
              onChange={(e) => setCompanyData({ ...companyData, headquarters: e.target.value })}
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Description</label>
            <textarea
              value={companyData.description}
              onChange={(e) => setCompanyData({ ...companyData, description: e.target.value })}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <Target className="h-5 w-5 mr-2 text-secondary-600" />
            Culture & Values
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Stage</label>
              <select
                value={cultureData.stage}
                onChange={(e) => setCultureData({ ...cultureData, stage: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {stages.map((stage) => (
                  <option key={stage.value} value={stage.value}>
                    {stage.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Work Model</label>
              <select
                value={cultureData.workModel}
                onChange={(e) => setCultureData({ ...cultureData, workModel: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {workModels.map((model) => (
                  <option key={model.value} value={model.value}>
                    {model.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Values</label>
            <div className="flex flex-wrap gap-2">
              {cultureData.values.map((value, idx) => (
                <Badge key={idx} variant="primary" size="lg">
                  {value}
                </Badge>
              ))}
              <Button variant="ghost" size="sm">+ Add Value</Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Benefits Offered</label>
            <div className="flex flex-wrap gap-2">
              {cultureData.benefitsOffered.map((benefit, idx) => (
                <Badge key={idx} variant="success" size="lg">
                  {benefit}
                </Badge>
              ))}
              <Button variant="ghost" size="sm">+ Add Benefit</Button>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-success-600" />
            Compensation Settings
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
              <select
                value={compensationData.currency}
                onChange={(e) => setCompensationData({ ...compensationData, currency: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="CAD">CAD - Canadian Dollar</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payroll Cycle</label>
              <select
                value={compensationData.payrollCycle}
                onChange={(e) => setCompensationData({ ...compensationData, payrollCycle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="weekly">Weekly</option>
                <option value="bi-weekly">Bi-Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="semi-monthly">Semi-Monthly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fiscal Year Start</label>
              <select
                value={compensationData.fiscalYearStart}
                onChange={(e) => setCompensationData({ ...compensationData, fiscalYearStart: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>

            <Input
              label="Equity Pool"
              value={compensationData.equityPool}
              onChange={(e) => setCompensationData({ ...compensationData, equityPool: e.target.value })}
              placeholder="e.g., 15%"
            />
          </div>
        </Card>

        <div className="flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button variant="primary" icon={Save} onClick={handleSave}>
            Save All Changes
          </Button>
        </div>
      </div>
    </div>
  )
}

