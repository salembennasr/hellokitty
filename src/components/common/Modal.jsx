import { useEffect } from 'react'
import Button from './Button'

function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md'
}) {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={`
            relative bg-white rounded-hk-xl shadow-hk-lg w-full ${sizes[size]}
            transform transition-all animate-in fade-in slide-in-from-bottom-4 duration-200
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-hk-pink-100">
            <h2 className="text-xl font-bold text-hk-pink-500">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-hk-pink-50 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="flex justify-end space-x-3 p-6 border-t border-hk-pink-100 bg-hk-pink-50 rounded-b-hk-xl">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Modal
