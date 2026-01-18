import { useState, useMemo } from 'react'
import ItemCard from './ItemCard'
import { seedItems } from '../../data/seedItems'

function ItemSelector({
  selectedItems = [],
  onSelectItem,
  onRemoveItem,
  multiple = true,
  maxItems = 10
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('ALL')

  const categories = [
    { value: 'ALL', label: 'Alle' },
    { value: 'FURNITURE', label: '🪑 Möbel' },
    { value: 'MATERIAL', label: '✨ Material' },
    { value: 'CLOTHING', label: '👗 Kleidung' },
    { value: 'FOOD', label: '🍰 Essen' },
    { value: 'EVENT', label: '🎃 Event' },
    { value: 'RECIPE', label: '📜 Rezepte' },
  ]

  const filteredItems = useMemo(() => {
    return seedItems.filter(item => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.nameDE && item.nameDE.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))

      const matchesCategory = categoryFilter === 'ALL' || item.category === categoryFilter

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, categoryFilter])

  const isSelected = (item) => selectedItems.some(selected => selected.id === item.id)

  const handleItemClick = (item) => {
    if (isSelected(item)) {
      onRemoveItem?.(item)
    } else if (!multiple || selectedItems.length < maxItems) {
      onSelectItem?.(item)
    }
  }

  return (
    <div className="space-y-4">
      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Item suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-cute pl-10"
          />
          <svg className="w-5 h-5 text-hk-pink-300 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="select-cute sm:w-48"
        >
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      </div>

      {/* Selected Items */}
      {selectedItems.length > 0 && (
        <div className="bg-hk-pink-50 rounded-hk-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-hk-pink-500">
              Ausgewählt ({selectedItems.length}/{maxItems})
            </span>
            <button
              onClick={() => selectedItems.forEach(item => onRemoveItem?.(item))}
              className="text-xs text-hk-pink-400 hover:text-hk-pink-600"
            >
              Alle entfernen
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedItems.map(item => (
              <span
                key={item.id}
                className="inline-flex items-center bg-white px-3 py-1 rounded-full text-sm border border-hk-pink-200"
              >
                {item.nameDE || item.name}
                <button
                  onClick={() => onRemoveItem?.(item)}
                  className="ml-2 text-hk-pink-400 hover:text-hk-pink-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Items Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-96 overflow-y-auto p-1">
        {filteredItems.map(item => (
          <ItemCard
            key={item.id}
            item={item}
            selected={isSelected(item)}
            onClick={() => handleItemClick(item)}
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-8">
          <span className="text-4xl mb-2 block">🔍</span>
          <p className="text-gray-500">Keine Items gefunden</p>
        </div>
      )}
    </div>
  )
}

export default ItemSelector
