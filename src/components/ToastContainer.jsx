import Toast from './Toast'

export default function ToastContainer({ toasts, onClose }) {
  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => onClose(toast.id)}
        />
      ))}
    </div>
  )
}

