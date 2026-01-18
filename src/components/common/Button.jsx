function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ...props
}) {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    cute: 'btn-cute',
    ghost: 'text-hk-pink-500 hover:bg-hk-pink-50 font-semibold py-2 px-4 rounded-hk transition-all duration-200',
    danger: 'bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-hk-lg transition-all duration-200',
  }

  const sizes = {
    sm: 'text-sm py-1.5 px-4',
    md: 'py-2 px-6',
    lg: 'text-lg py-3 px-8',
  }

  return (
    <button
      type={type}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
        inline-flex items-center justify-center
      `}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  )
}

export default Button
