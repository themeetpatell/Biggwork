export default function Input({
  label,
  error,
  helper,
  icon: Icon,
  className = '',
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2 border border-gray-300 rounded-lg 
            focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
            transition-colors duration-200
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${error ? 'border-danger-500 focus:ring-danger-500' : ''}
            ${className}`}
          {...props}
        />
      </div>
      {helper && !error && (
        <p className="mt-1 text-sm text-gray-500">{helper}</p>
      )}
      {error && (
        <p className="mt-1 text-sm text-danger-600">{error}</p>
      )}
    </div>
  )
}

