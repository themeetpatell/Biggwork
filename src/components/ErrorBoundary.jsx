import { Component } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Button from './Button'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    this.setState({ error, errorInfo })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
    window.location.reload()
  }

  handleGoHome = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
              <div className="p-4 bg-danger-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <AlertTriangle className="h-10 w-10 text-danger-600" />
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                Oops! Something went wrong
              </h1>
              
              <p className="text-lg text-gray-600 mb-6">
                Don't worry, this is just a minor hiccup. We've logged the error and our team will look into it.
              </p>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mb-6 p-4 bg-gray-100 rounded-lg text-left overflow-auto max-h-64">
                  <p className="text-sm font-bold text-gray-900 mb-2">Error Details:</p>
                  <pre className="text-xs text-danger-600 whitespace-pre-wrap">
                    {this.state.error.toString()}
                  </pre>
                  {this.state.errorInfo && (
                    <pre className="text-xs text-gray-600 mt-2 whitespace-pre-wrap">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              )}

              <div className="flex gap-4 justify-center">
                <Button
                  variant="primary"
                  icon={RefreshCw}
                  onClick={this.handleReset}
                >
                  Reload Page
                </Button>
                <Button
                  variant="outline"
                  icon={Home}
                  onClick={this.handleGoHome}
                >
                  Go to Homepage
                </Button>
              </div>

              <p className="text-sm text-gray-500 mt-6">
                If this problem persists, please contact support at{' '}
                <a href="mailto:support@biggwork.com" className="text-primary-600 hover:underline">
                  support@biggwork.com
                </a>
              </p>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

