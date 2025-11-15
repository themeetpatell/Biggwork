import { TrendingUp, TrendingDown } from 'lucide-react'

export default function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendValue, 
  color = 'primary',
  loading = false 
}) {
  const colors = {
    primary: 'from-primary-500 to-primary-600',
    secondary: 'from-secondary-500 to-secondary-600',
    success: 'from-success-500 to-success-600',
    warning: 'from-warning-500 to-warning-600',
    danger: 'from-danger-500 to-danger-600',
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-soft p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-soft p-6 hover:shadow-medium transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        {Icon && (
          <div className={`p-3 rounded-lg bg-gradient-to-br ${colors[color]}`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
        )}
      </div>
      <div className="flex items-end justify-between">
        <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
        {trend && trendValue && (
          <div className={`flex items-center text-sm font-medium ${
            trend === 'up' ? 'text-success-600' : 'text-danger-600'
          }`}>
            {trend === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
            {trendValue}
          </div>
        )}
      </div>
    </div>
  )
}

