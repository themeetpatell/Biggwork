export default function Card({ children, className = '', hover = false, glow = false }) {
  return (
    <div 
      className={`bg-white rounded-xl shadow-soft p-6 
        ${hover ? 'transition-all duration-300 hover:shadow-medium hover:-translate-y-1' : ''} 
        ${glow ? 'hover:shadow-glow' : ''}
        ${className}`}
    >
      {children}
    </div>
  )
}

