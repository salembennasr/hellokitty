import { useState, useMemo } from 'react'
import { seedItems } from '../../data/seedItems'
import ItemGrid from './ItemGrid'
import CategoryFilter from './CategoryFilter'
import Modal from '../common/Modal'

function ItemDatabase() {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('ALL')
  const [rarityFilter, setRarityFilter] = useState('ALL')
  const [selectedItem, setSelectedItem] = useState(null)

  const filteredItems = useMemo(() => {
    return seedItems.filter(item => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.nameDE && item.nameDE.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))

      const matchesCategory = categoryFilter === 'ALL' || item.category === categoryFilter
      const matchesRarity = rarityFilter === 'ALL' || item.rarity === rarityFilter

      return matchesSearch && matchesCategory && matchesRarity
    })
  }, [searchQuery, categoryFilter, rarityFilter])

  const categoryIcons = {
    FURNITURE: '🪑',
    MATERIAL: '✨',
    CLOTHING: '👗',
    FOOD: '🍰',
    EVENT: '🎃',
    RECIPE: '📜',
  }

  const rarityStyles = {
    COMMON: 'badge-common',
    UNCOMMON: 'badge-uncommon',
    RARE: 'badge-rare',
    EVENT: 'badge-event',
  }

  const rarityLabels = {
    COMMON: 'Normal',
    UNCOMMON: 'Selten',
    RARE: 'Rar',
    EVENT: 'Event',
  }

  return (
    <div>
      {/* Search & Filters */}
      <div className="bg-white rounded-hk-xl p-6 shadow-hk mb-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Suche nach Items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-cute pl-10"
            />
            <svg className="w-5 h-5 text-hk-pink-300 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Rarity Filter */}
          <select
            value={rarityFilter}
            onChange={(e) => setRarityFilter(e.target.value)}
            className="select-cute lg:w-48"
          >
            <option value="ALL">Alle Seltenheiten</option>
            <option value="COMMON">Normal</option>
            <option value="UNCOMMON">Selten</option>
            <option value="RARE">Rar</option>
            <option value="EVENT">Event</option>
          </select>
        </div>

        {/* Category Pills */}
        <CategoryFilter
          selected={categoryFilter}
          onChange={setCategoryFilter}
        />
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-500">
          <span className="font-bold text-hk-pink-500">{filteredItems.length}</span> Items gefunden
        </p>
      </div>

      {/* Items Grid */}
      <ItemGrid
        items={filteredItems}
        onItemClick={setSelectedItem}
      />

      {/* Item Detail Modal */}
      <Modal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title={selectedItem?.nameDE || selectedItem?.name || 'Item Details'}
        size="md"
      >
        {selectedItem && (
          <div className="space-y-6">
            {/* Image */}
            <div className="aspect-square bg-gradient-to-br from-hk-pink-50 to-hk-purple-100 rounded-hk-xl flex items-center justify-center">
              <span className="text-8xl">{categoryIcons[selectedItem.category]}</span>
            </div>

            {/* Info */}
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {selectedItem.nameDE || selectedItem.name}
                </h3>
                {selectedItem.nameDE && (
                  <p className="text-sm text-gray-400">{selectedItem.name}</p>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <span className={rarityStyles[selectedItem.rarity]}>
                  {rarityLabels[selectedItem.rarity]}
                </span>
                <span className="bg-hk-pink-50 text-hk-pink-500 text-xs font-semibold px-2 py-1 rounded-full">
                  {categoryIcons[selectedItem.category]} {selectedItem.category}
                </span>
                {selectedItem.subcategory && (
                  <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded-full capitalize">
                    {selectedItem.subcategory.replace('-', ' ')}
                  </span>
                )}
              </div>

              {selectedItem.tags && selectedItem.tags.length > 0 && (
                <div>
                  <p className="text-xs text-gray-400 mb-2">Tags:</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedItem.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs text-hk-pink-400 bg-hk-pink-50 px-2 py-0.5 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default ItemDatabase
