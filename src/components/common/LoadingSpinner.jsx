function LoadingSpinner({ size = 'md', text = 'Laden...' }) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`${sizes[size]} relative`}>
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-hk-pink-100" />
        {/* Spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-hk-pink-400 animate-spin" />
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm">🎀</span>
        </div>
      </div>
      {text && (
        <p className="mt-4 text-hk-pink-400 font-medium animate-pulse">{text}</p>
      )}
    </div>
  )
}

export default LoadingSpinner
