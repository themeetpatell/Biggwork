export default function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action, 
  actionLabel 
}) {
  return (
    <div className="text-center py-12">
      {Icon && (
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-gray-100 rounded-full">
            <Icon className="h-12 w-12 text-gray-400" />
          </div>
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      {action && actionLabel && (
        <button
          onClick={action}
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

