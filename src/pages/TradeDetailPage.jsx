import { useParams, Link } from 'react-router-dom'
import { mockTrades } from '../data/seedItems'
import TradeDetail from '../components/trades/TradeDetail'
import Button from '../components/common/Button'

function TradeDetailPage() {
  const { id } = useParams()

  // In production, this would fetch from Amplify API
  const trade = mockTrades.find(t => t.id === id)

  if (!trade) {
    return (
      <div className="min-h-screen bg-hk-pink-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-8xl mb-4 block">🔍</span>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Angebot nicht gefunden
          </h1>
          <p className="text-gray-500 mb-8">
            Dieses Tauschangebot existiert nicht oder wurde gelöscht.
          </p>
          <Link to="/browse">
            <Button variant="primary">Zurück zu allen Angeboten</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-hk-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/browse" className="text-hk-pink-500 hover:text-hk-pink-600 text-sm">
            ← Zurück zu allen Angeboten
          </Link>
        </div>

        {/* Trade Detail */}
        <TradeDetail trade={trade} currentUserId="mock-user" />
      </div>
    </div>
  )
}

export default TradeDetailPage
