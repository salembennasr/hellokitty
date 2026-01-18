import { useState } from 'react'
import Button from '../common/Button'
import Modal from '../common/Modal'

// Item-Komponente mit Bild
function TradeItemRow({ tradeItem, variant = 'pink' }) {
  const [imageError, setImageError] = useState(false)
  const item = tradeItem.item

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

  const bgColor = variant === 'pink' ? 'bg-hk-pink-50' : 'bg-hk-blue-100'
  const quantityColor = variant === 'pink' ? 'text-hk-pink-500' : 'text-hk-blue-300'

  return (
    <div className={`flex items-center p-3 ${bgColor} rounded-hk-lg`}>
      <div className="w-14 h-14 bg-white rounded-hk flex items-center justify-center mr-3 overflow-hidden flex-shrink-0">
        {item.imageUrl && !imageError ? (
          <img
            src={item.imageUrl}
            alt={item.nameDE || item.name}
            className="w-full h-full object-contain p-1"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="text-2xl">{categoryIcons[item.category]}</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-800 truncate">
          {item.nameDE || item.name}
        </p>
        <div className="flex items-center space-x-2 mt-1">
          <span className={rarityStyles[item.rarity]}>
            {item.rarity}
          </span>
          <span className="text-xs text-gray-400 capitalize truncate">
            {item.subcategory?.replace('-', ' ')}
          </span>
        </div>
      </div>
      {tradeItem.quantity > 1 && (
        <span className={`${quantityColor} font-bold text-lg ml-2`}>
          x{tradeItem.quantity}
        </span>
      )}
    </div>
  )
}

function TradeDetail({ trade, currentUserId }) {
  const [showInterestModal, setShowInterestModal] = useState(false)
  const [interestMessage, setInterestMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const isOwner = trade.ownerId === currentUserId

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleSubmitInterest = () => {
    // In production, this would call the Amplify API
    console.log('Submitting interest:', { tradeId: trade.id, message: interestMessage })
    setSubmitted(true)
    setTimeout(() => {
      setShowInterestModal(false)
      setSubmitted(false)
      setInterestMessage('')
    }, 2000)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-hk-xl p-6 shadow-hk mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-hk-pink-200 to-hk-purple-200 rounded-full flex items-center justify-center">
              <span className="text-3xl">🎀</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{trade.ownerName}</h2>
              <p className="text-sm text-gray-400">Erstellt am {formatDate(trade.createdAt)}</p>
              <div className="flex items-center mt-1 space-x-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  trade.status === 'ACTIVE'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {trade.status === 'ACTIVE' ? 'Aktiv' : trade.status}
                </span>
                <span className="text-xs text-gray-400 flex items-center">
                  {trade.contactPreference === 'DISCORD' ? (
                    <>💬 {trade.discordUsername}</>
                  ) : (
                    <>📱 In-App Kontakt</>
                  )}
                </span>
              </div>
            </div>
          </div>

          {!isOwner && trade.status === 'ACTIVE' && (
            <Button variant="cute" onClick={() => setShowInterestModal(true)}>
              💝 Interesse bekunden
            </Button>
          )}
        </div>

        {trade.description && (
          <div className="bg-hk-pink-50 rounded-hk-lg p-4">
            <p className="text-gray-700">{trade.description}</p>
          </div>
        )}
      </div>

      {/* Items Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Offering */}
        <div className="bg-white rounded-hk-xl p-6 shadow-hk">
          <h3 className="text-lg font-bold text-hk-pink-500 mb-4 flex items-center">
            <span className="mr-2">📦</span> Bietet an
          </h3>
          <div className="space-y-3">
            {trade.offeringItems.map((tradeItem, idx) => (
              <TradeItemRow key={idx} tradeItem={tradeItem} variant="pink" />
            ))}
          </div>
        </div>

        {/* Seeking */}
        <div className="bg-white rounded-hk-xl p-6 shadow-hk">
          <h3 className="text-lg font-bold text-hk-blue-300 mb-4 flex items-center">
            <span className="mr-2">🔍</span> Sucht
          </h3>
          <div className="space-y-3">
            {trade.seekingItems.map((tradeItem, idx) => (
              <TradeItemRow key={idx} tradeItem={tradeItem} variant="blue" />
            ))}
          </div>
        </div>
      </div>

      {/* Interest Modal */}
      <Modal
        isOpen={showInterestModal}
        onClose={() => setShowInterestModal(false)}
        title="💝 Interesse bekunden"
        footer={
          !submitted && (
            <>
              <Button variant="secondary" onClick={() => setShowInterestModal(false)}>
                Abbrechen
              </Button>
              <Button variant="primary" onClick={handleSubmitInterest}>
                Anfrage senden
              </Button>
            </>
          )
        }
      >
        {submitted ? (
          <div className="text-center py-8">
            <span className="text-6xl mb-4 block animate-bounce-slow">💖</span>
            <h3 className="text-xl font-bold text-hk-pink-500 mb-2">
              Anfrage gesendet!
            </h3>
            <p className="text-gray-500">
              {trade.ownerName} wurde benachrichtigt.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600">
              Möchtest du {trade.ownerName} eine Tauschanfrage senden?
            </p>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nachricht (optional)
              </label>
              <textarea
                value={interestMessage}
                onChange={(e) => setInterestMessage(e.target.value)}
                placeholder="z.B. Ich habe die gesuchten Items! Wann hast du Zeit zum Tauschen?"
                className="input-cute min-h-[100px] resize-none"
                maxLength={500}
              />
              <p className="text-xs text-gray-400 mt-1 text-right">
                {interestMessage.length}/500
              </p>
            </div>
            <div className="bg-hk-yellow-100 rounded-hk-lg p-4">
              <p className="text-sm text-yellow-700">
                💡 <strong>Tipp:</strong> Nach Akzeptanz wird dein Zugangscode automatisch mit {trade.ownerName} geteilt.
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default TradeDetail
