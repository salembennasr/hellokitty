import { Link } from 'react-router-dom'
import { mockTrades } from '../../data/seedItems'
import Button from '../common/Button'

function MyTrades() {
  // In production, filter by current user
  const myTrades = mockTrades.slice(0, 2)

  const categoryIcons = {
    FURNITURE: '🪑',
    MATERIAL: '✨',
    CLOTHING: '👗',
    FOOD: '🍰',
    EVENT: '🎃',
    RECIPE: '📜',
  }

  if (myTrades.length === 0) {
    return (
      <div className="bg-white rounded-hk-xl p-8 shadow-hk text-center">
        <span className="text-6xl mb-4 block">📦</span>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Noch keine Angebote
        </h3>
        <p className="text-gray-500 mb-6">
          Erstelle dein erstes Tauschangebot!
        </p>
        <Link to="/create">
          <Button variant="cute">🎀 Angebot erstellen</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {myTrades.map(trade => (
        <div key={trade.id} className="bg-white rounded-hk-xl p-6 shadow-hk">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                trade.status === 'ACTIVE'
                  ? 'bg-green-100 text-green-600'
                  : 'bg-gray-100 text-gray-500'
              }`}>
                {trade.status === 'ACTIVE' ? 'Aktiv' : trade.status}
              </span>
              <p className="text-sm text-gray-400 mt-1">
                {new Date(trade.createdAt).toLocaleDateString('de-DE')}
              </p>
            </div>
            <div className="flex space-x-2">
              <Link to={`/trade/${trade.id}`}>
                <Button variant="secondary" size="sm">Ansehen</Button>
              </Link>
              <Button variant="ghost" size="sm">✏️</Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-hk-pink-500 mb-2">Biete:</p>
              <div className="space-y-1">
                {trade.offeringItems.slice(0, 2).map((item, idx) => (
                  <p key={idx} className="text-sm text-gray-600">
                    {categoryIcons[item.item.category]} {item.item.nameDE || item.item.name}
                  </p>
                ))}
                {trade.offeringItems.length > 2 && (
                  <p className="text-xs text-gray-400">+{trade.offeringItems.length - 2} mehr</p>
                )}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-hk-blue-300 mb-2">Suche:</p>
              <div className="space-y-1">
                {trade.seekingItems.slice(0, 2).map((item, idx) => (
                  <p key={idx} className="text-sm text-gray-600">
                    {categoryIcons[item.item.category]} {item.item.nameDE || item.item.name}
                  </p>
                ))}
                {trade.seekingItems.length > 2 && (
                  <p className="text-xs text-gray-400">+{trade.seekingItems.length - 2} mehr</p>
                )}
              </div>
            </div>
          </div>

          {/* Interests indicator */}
          <div className="mt-4 pt-4 border-t border-hk-pink-100">
            <p className="text-sm text-gray-500">
              💝 <span className="font-semibold text-hk-pink-500">3</span> Interessenten
            </p>
          </div>
        </div>
      ))}

      <Link to="/create" className="block">
        <div className="bg-hk-pink-50 border-2 border-dashed border-hk-pink-200 rounded-hk-xl p-6 text-center hover:bg-hk-pink-100 transition-colors cursor-pointer">
          <span className="text-3xl mb-2 block">➕</span>
          <p className="text-hk-pink-500 font-semibold">Neues Angebot erstellen</p>
        </div>
      </Link>
    </div>
  )
}

export default MyTrades
