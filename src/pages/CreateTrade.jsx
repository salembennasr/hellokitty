import CreateTradeForm from '../components/trades/CreateTradeForm'

function CreateTrade({ user }) {
  return (
    <div className="min-h-screen bg-hk-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🎀 Neues Tauschangebot
          </h1>
          <p className="text-gray-500">
            Erstelle ein Angebot und finde deinen Tauschpartner
          </p>
        </div>

        {/* Form */}
        <CreateTradeForm user={user} />
      </div>
    </div>
  )
}

export default CreateTrade
