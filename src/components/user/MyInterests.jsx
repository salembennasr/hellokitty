import { Link } from 'react-router-dom'
import { mockTrades, seedItems } from '../../data/seedItems'

function MyInterests() {
  // Mock interests data
  const myInterests = [
    {
      id: 'interest-1',
      trade: mockTrades[1],
      status: 'PENDING',
      message: 'Ich habe das Cinnamoroll Sofa und Bett!',
      createdAt: '2026-01-17T15:00:00Z',
    },
    {
      id: 'interest-2',
      trade: mockTrades[2],
      status: 'ACCEPTED',
      message: 'Kann dir die Materialien geben!',
      createdAt: '2026-01-16T12:00:00Z',
      accessCode: 'KITTY123',
    },
  ]

  const statusStyles = {
    PENDING: 'bg-yellow-100 text-yellow-700',
    ACCEPTED: 'bg-green-100 text-green-600',
    DECLINED: 'bg-red-100 text-red-600',
  }

  const statusLabels = {
    PENDING: 'Ausstehend',
    ACCEPTED: 'Akzeptiert',
    DECLINED: 'Abgelehnt',
  }

  if (myInterests.length === 0) {
    return (
      <div className="bg-white rounded-hk-xl p-8 shadow-hk text-center">
        <span className="text-6xl mb-4 block">💝</span>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Keine Anfragen
        </h3>
        <p className="text-gray-500 mb-6">
          Du hast noch kein Interesse an Angeboten bekundet.
        </p>
        <Link to="/browse" className="text-hk-pink-500 font-semibold hover:text-hk-pink-600">
          Angebote durchsuchen →
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {myInterests.map(interest => (
        <div key={interest.id} className="bg-white rounded-hk-xl p-6 shadow-hk">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className={`text-xs px-2 py-1 rounded-full ${statusStyles[interest.status]}`}>
                {statusLabels[interest.status]}
              </span>
              <p className="text-sm text-gray-400 mt-1">
                {new Date(interest.createdAt).toLocaleDateString('de-DE')}
              </p>
            </div>
            <Link to={`/trade/${interest.trade.id}`} className="text-hk-pink-500 text-sm font-semibold hover:text-hk-pink-600">
              Angebot ansehen →
            </Link>
          </div>

          <div className="bg-hk-pink-50 rounded-hk-lg p-4 mb-4">
            <p className="text-sm text-gray-500 mb-1">Angebot von:</p>
            <p className="font-semibold text-gray-800">{interest.trade.ownerName}</p>
          </div>

          {interest.message && (
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Deine Nachricht:</p>
              <p className="text-gray-700 italic">"{interest.message}"</p>
            </div>
          )}

          {/* Access Code (only shown when accepted) */}
          {interest.status === 'ACCEPTED' && interest.accessCode && (
            <div className="bg-green-50 rounded-hk-lg p-4 border border-green-200">
              <p className="text-sm text-green-700 mb-2 font-semibold">
                🎉 Zugangscode erhalten!
              </p>
              <div className="flex items-center justify-between">
                <p className="font-mono text-lg tracking-widest text-green-600">
                  {interest.accessCode}
                </p>
                <button
                  onClick={() => navigator.clipboard.writeText(interest.accessCode)}
                  className="p-2 bg-white rounded-hk hover:bg-green-100 transition-colors"
                  title="Kopieren"
                >
                  📋
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default MyInterests
