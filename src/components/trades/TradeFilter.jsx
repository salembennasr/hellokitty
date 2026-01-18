import { useState } from 'react'

function TradeFilter({ onFilterChange, initialFilters = {} }) {
  const [filters, setFilters] = useState({
    search: '',
    category: 'ALL',
    rarity: 'ALL',
    status: 'ACTIVE',
    ...initialFilters
  })

  const handleChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const categories = [
    { value: 'ALL', label: 'Alle Kategorien' },
    { value: 'FURNITURE', label: '🪑 Möbel' },
    { value: 'MATERIAL', label: '✨ Materialien' },
    { value: 'CLOTHING', label: '👗 Kleidung' },
    { value: 'FOOD', label: '🍰 Essen' },
    { value: 'EVENT', label: '🎃 Event' },
    { value: 'RECIPE', label: '📜 Rezepte' },
  ]

  const rarities = [
    { value: 'ALL', label: 'Alle Seltenheiten' },
    { value: 'COMMON', label: 'Normal' },
    { value: 'UNCOMMON', label: 'Selten' },
    { value: 'RARE', label: 'Rar' },
    { value: 'EVENT', label: 'Event' },
  ]

  return (
    <div className="bg-white rounded-hk-xl p-6 shadow-hk mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Suche nach Items, Beschreibung..."
              value={filters.search}
              onChange={(e) => handleChange('search', e.target.value)}
              className="input-cute pl-10"
            />
            <svg className="w-5 h-5 text-hk-pink-300 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Category Filter */}
        <div className="md:w-48">
          <select
            value={filters.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="select-cute"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        {/* Rarity Filter */}
        <div className="md:w-48">
          <select
            value={filters.rarity}
            onChange={(e) => handleChange('rarity', e.target.value)}
            className="select-cute"
          >
            {rarities.map(r => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Active filters indicator */}
      {(filters.search || filters.category !== 'ALL' || filters.rarity !== 'ALL') && (
        <div className="mt-4 pt-4 border-t border-hk-pink-100 flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <span className="inline-flex items-center bg-hk-pink-50 text-hk-pink-500 text-sm px-3 py-1 rounded-full">
                Suche: {filters.search}
                <button
                  onClick={() => handleChange('search', '')}
                  className="ml-2 hover:text-hk-pink-700"
                >
                  ×
                </button>
              </span>
            )}
            {filters.category !== 'ALL' && (
              <span className="inline-flex items-center bg-hk-pink-50 text-hk-pink-500 text-sm px-3 py-1 rounded-full">
                {categories.find(c => c.value === filters.category)?.label}
                <button
                  onClick={() => handleChange('category', 'ALL')}
                  className="ml-2 hover:text-hk-pink-700"
                >
                  ×
                </button>
              </span>
            )}
            {filters.rarity !== 'ALL' && (
              <span className="inline-flex items-center bg-hk-pink-50 text-hk-pink-500 text-sm px-3 py-1 rounded-full">
                {rarities.find(r => r.value === filters.rarity)?.label}
                <button
                  onClick={() => handleChange('rarity', 'ALL')}
                  className="ml-2 hover:text-hk-pink-700"
                >
                  ×
                </button>
              </span>
            )}
          </div>
          <button
            onClick={() => {
              const resetFilters = { search: '', category: 'ALL', rarity: 'ALL', status: 'ACTIVE' }
              setFilters(resetFilters)
              onFilterChange?.(resetFilters)
            }}
            className="text-sm text-hk-pink-400 hover:text-hk-pink-600"
          >
            Alle Filter zurücksetzen
          </button>
        </div>
      )}
    </div>
  )
}

export default TradeFilter
