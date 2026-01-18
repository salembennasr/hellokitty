import { Link } from 'react-router-dom'

// Kleine Item-Vorschau Komponente
function ItemPreview({ item, quantity }) {
  const categoryIcons = {
    FURNITURE: '🪑',
    MATERIAL: '✨',
    CLOTHING: '👗',
    FOOD: '🍰',
    EVENT: '🎃',
    RECIPE: '📜',
  }

  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-white rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.nameDE || item.name}
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
        ) : null}
        <span className={`text-sm ${item.imageUrl ? 'hidden' : 'flex'}`}>
          {categoryIcons[item.category] || '📦'}
        </span>
      </div>
      <span className="truncate text-gray-700 text-sm flex-1">
        {item.nameDE || item.name}
      </span>
      {quantity > 1 && (
        <span className="text-xs font-medium">x{quantity}</span>
      )}
    </div>
  )
}

function TradeCard({ trade }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return (
    <Link to={`/trade/${trade.id}`} className="block">
      <div className="card-cute hover:transform hover:scale-[1.02] transition-all duration-300">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-hk-pink-200 to-hk-purple-200 rounded-full flex items-center justify-center">
              <span className="text-lg">🎀</span>
            </div>
            <div>
              <p className="font-semibold text-gray-800">{trade.ownerName}</p>
              <p className="text-xs text-gray-400">{formatDate(trade.createdAt)}</p>
            </div>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${
            trade.status === 'ACTIVE'
              ? 'bg-green-100 text-green-600'
              : 'bg-gray-100 text-gray-500'
          }`}>
            {trade.status === 'ACTIVE' ? 'Aktiv' : trade.status}
          </span>
        </div>

        {/* Description */}
        {trade.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{trade.description}</p>
        )}

        {/* Items */}
        <div className="grid grid-cols-2 gap-4">
          {/* Offering */}
          <div className="bg-hk-pink-50 rounded-hk-lg p-3">
            <p className="text-xs font-semibold text-hk-pink-500 mb-2 flex items-center">
              <span className="mr-1">📦</span> Biete
            </p>
            <div className="space-y-2">
              {trade.offeringItems.slice(0, 3).map((tradeItem, idx) => (
                <ItemPreview
                  key={idx}
                  item={tradeItem.item}
                  quantity={tradeItem.quantity}
                />
              ))}
              {trade.offeringItems.length > 3 && (
                <p className="text-xs text-gray-400">+{trade.offeringItems.length - 3} mehr</p>
              )}
            </div>
          </div>

          {/* Seeking */}
          <div className="bg-hk-blue-100 rounded-hk-lg p-3">
            <p className="text-xs font-semibold text-hk-blue-300 mb-2 flex items-center">
              <span className="mr-1">🔍</span> Suche
            </p>
            <div className="space-y-2">
              {trade.seekingItems.slice(0, 3).map((tradeItem, idx) => (
                <ItemPreview
                  key={idx}
                  item={tradeItem.item}
                  quantity={tradeItem.quantity}
                />
              ))}
              {trade.seekingItems.length > 3 && (
                <p className="text-xs text-gray-400">+{trade.seekingItems.length - 3} mehr</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact preference */}
        <div className="mt-4 pt-3 border-t border-hk-pink-100 flex items-center justify-between">
          <span className="text-xs text-gray-400 flex items-center">
            {trade.contactPreference === 'DISCORD' ? (
              <>
                <span className="mr-1">💬</span> Discord
              </>
            ) : (
              <>
                <span className="mr-1">📱</span> In-App
              </>
            )}
          </span>
          <span className="text-hk-pink-400 text-sm font-medium">
            Details ansehen →
          </span>
        </div>
      </div>
    </Link>
  )
}

export default TradeCard
