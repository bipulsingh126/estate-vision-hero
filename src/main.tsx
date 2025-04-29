import React, { Component, ErrorInfo, ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@/styles/globals.css'
import 'leaflet/dist/leaflet.css'

// Custom ErrorBoundary component to handle React errors
class ErrorBoundary extends Component<{ children: ReactNode }> {
  state = { hasError: false, error: null as Error | null }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-4">
              The application encountered an error. Please try refreshing the page.
            </p>
            {this.state.error && (
              <div className="bg-gray-100 p-4 rounded mb-4 overflow-auto max-h-40">
                <p className="font-mono text-sm text-gray-800">{this.state.error.toString()}</p>
              </div>
            )}
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Suppress React 18 console warnings in development
const originalConsoleError = console.error
console.error = (...args) => {
  // Filter out specific warnings
  const suppressedWarnings = [
    'Warning: ReactDOM.render is no longer supported',
    'Warning: useLayoutEffect does nothing on the server',
    'Warning: renderSubtreeIntoContainer',
    'Warning: Cannot find menu item',
    'The requested module',
    'Cannot find menu item with id save-page',
    'Cannot find menu item with id translate-page'
  ]
  
  if (!suppressedWarnings.some(warning => args[0]?.includes?.(warning))) {
    originalConsoleError(...args)
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
