function CategoryFilter({ selected, onChange }) {
  const categories = [
    { value: 'ALL', label: 'Alle', icon: '🎀' },
    { value: 'FURNITURE', label: 'Möbel', icon: '🪑' },
    { value: 'MATERIAL', label: 'Material', icon: '✨' },
    { value: 'CLOTHING', label: 'Kleidung', icon: '👗' },
    { value: 'FOOD', label: 'Essen', icon: '🍰' },
    { value: 'EVENT', label: 'Event', icon: '🎃' },
    { value: 'RECIPE', label: 'Rezepte', icon: '📜' },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(cat => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={`
            px-4 py-2 rounded-full font-medium text-sm transition-all duration-200
            ${selected === cat.value
              ? 'bg-hk-pink-400 text-white shadow-hk'
              : 'bg-white text-gray-600 hover:bg-hk-pink-50 border border-hk-pink-100'
            }
          `}
        >
          <span className="mr-1">{cat.icon}</span>
          {cat.label}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
