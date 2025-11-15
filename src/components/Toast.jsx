import { useEffect } from 'react'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'

export default function Toast({ message, type = 'info', onClose, duration = 3000 }) {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const types = {
    success: {
      icon: CheckCircle,
      className: 'bg-success-50 border-success-200 text-success-800',
      iconColor: 'text-success-600',
    },
    error: {
      icon: XCircle,
      className: 'bg-danger-50 border-danger-200 text-danger-800',
      iconColor: 'text-danger-600',
    },
    warning: {
      icon: AlertCircle,
      className: 'bg-warning-50 border-warning-200 text-warning-800',
      iconColor: 'text-warning-600',
    },
    info: {
      icon: Info,
      className: 'bg-primary-50 border-primary-200 text-primary-800',
      iconColor: 'text-primary-600',
    },
  }

  const Icon = types[type].icon

  return (
    <div className={`fixed bottom-4 right-4 z-50 animate-slide-up`}>
      <div className={`flex items-start gap-3 p-4 rounded-lg border shadow-medium max-w-md ${types[type].className}`}>
        <Icon className={`h-5 w-5 flex-shrink-0 ${types[type].iconColor}`} />
        <p className="flex-1 text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

