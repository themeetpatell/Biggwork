import { useState } from 'react'

export default function Tabs({ tabs, defaultTab = 0 }) {
  const [activeTab, setActiveTab] = useState(defaultTab)

  return (
    <div className="w-full">
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab, index) => {
            const Icon = tab.icon
            return (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center transition-colors
                  ${activeTab === index
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {Icon && <Icon className="h-5 w-5 mr-2" />}
                {tab.label}
                {tab.badge && (
                  <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                    activeTab === index ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </div>
      <div className="animate-fade-in">
        {tabs[activeTab]?.content}
      </div>
    </div>
  )
}

