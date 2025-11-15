import { X } from 'lucide-react'
import { useEffect } from 'react'

export default function Sidebar({ isOpen, onClose, title, children, width = 'default' }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const widths = {
    default: 'w-full md:w-2/3 lg:w-1/2',
    large: 'w-full md:w-3/4 lg:w-2/3',
    full: 'w-full',
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity backdrop-blur-sm" 
        onClick={onClose}
      />
      
      <div className={`absolute right-0 top-0 h-full ${widths[width]} bg-white shadow-strong overflow-y-auto animate-slide-right`}>
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

