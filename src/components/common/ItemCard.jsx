import { useState } from 'react'

function ItemCard({ item, onClick, selected = false, showQuantity = false, quantity = 1 }) {
  const [imageError, setImageError] = useState(false)

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

  const categoryIcons = {
    FURNITURE: '🪑',
    MATERIAL: '✨',
    CLOTHING: '👗',
    FOOD: '🍰',
    EVENT: '🎃',
    RECIPE: '📜',
  }

  return (
    <div
      onClick={onClick}
      className={`
        card-cute cursor-pointer transform transition-all duration-200 hover:scale-105 relative
        ${selected ? 'ring-2 ring-hk-pink-400 border-hk-pink-400' : ''}
      `}
    >
      {/* Image */}
      <div className="aspect-square bg-gradient-to-br from-hk-pink-50 to-hk-purple-100 rounded-hk-lg mb-3 flex items-center justify-center overflow-hidden">
        {item.imageUrl && !imageError ? (
          <img
            src={item.imageUrl}
            alt={item.nameDE || item.name}
            className="w-full h-full object-contain p-2"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <span className="text-4xl">{categoryIcons[item.category] || '📦'}</span>
        )}
      </div>

      {/* Info */}
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-800 text-sm truncate">
          {item.nameDE || item.name}
        </h3>

        <div className="flex items-center justify-between">
          <span className={rarityStyles[item.rarity]}>
            {rarityLabels[item.rarity]}
          </span>
          {showQuantity && quantity > 1 && (
            <span className="text-hk-pink-500 font-bold text-sm">x{quantity}</span>
          )}
        </div>

        {item.subcategory && (
          <p className="text-xs text-gray-400 capitalize">{item.subcategory.replace('-', ' ')}</p>
        )}
      </div>

      {/* Selected checkmark */}
      {selected && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-hk-pink-400 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </div>
  )
}

export default ItemCard
