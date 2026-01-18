import TradeCard from './TradeCard'
import LoadingSpinner from '../common/LoadingSpinner'

function TradeList({ trades, loading = false, emptyMessage = 'Keine Angebote gefunden' }) {
  if (loading) {
    return <LoadingSpinner text="Lade Angebote..." />
  }

  if (!trades || trades.length === 0) {
    return (
      <div className="text-center py-12">
        <span className="text-6xl mb-4 block">🔍</span>
        <p className="text-gray-500 text-lg">{emptyMessage}</p>
        <p className="text-gray-400 text-sm mt-2">
          Vielleicht möchtest du selbst ein Angebot erstellen?
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trades.map(trade => (
        <TradeCard key={trade.id} trade={trade} />
      ))}
    </div>
  )
}

export default TradeList
