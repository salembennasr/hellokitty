import { Link } from 'react-router-dom'
import { mockTrades } from '../data/seedItems'
import TradeCard from '../components/trades/TradeCard'
import Button from '../components/common/Button'

function Home() {
  // Get latest trades for preview
  const latestTrades = mockTrades.slice(0, 3)

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-hk-pink-100 via-hk-pink-50 to-hk-purple-100 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6 animate-float">
              <span className="text-8xl">🎀</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
              HKIA <span className="text-gradient-pink">Tauschbörse</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Die Community-Plattform für Hello Kitty Island Adventure Spieler.
              Tausche Items, finde neue Freunde und gestalte dein Traumzimmer!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/browse">
                <Button variant="cute" size="lg">
                  🔍 Angebote durchsuchen
                </Button>
              </Link>
              <Link to="/create">
                <Button variant="secondary" size="lg">
                  ➕ Tausch erstellen
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            So funktioniert's 💖
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-hk-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">📦</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">1. Angebot erstellen</h3>
              <p className="text-gray-500">
                Wähle Items die du anbieten und welche du suchen möchtest.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-hk-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">2. Match finden</h3>
              <p className="text-gray-500">
                Durchsuche Angebote anderer Spieler und bekunde dein Interesse.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-hk-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">3. Tauschen</h3>
              <p className="text-gray-500">
                Nach Akzeptanz wird euer Zugangscode geteilt - ab zum Tauschen!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Trades */}
      <section className="py-16 bg-hk-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Neueste Angebote ✨
            </h2>
            <Link to="/browse" className="text-hk-pink-500 font-semibold hover:text-hk-pink-600">
              Alle ansehen →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestTrades.map(trade => (
              <TradeCard key={trade.id} trade={trade} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Beliebte Kategorien 🌟
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: '🎀', name: 'Hello Kitty', color: 'from-red-100 to-red-200' },
              { icon: '☁️', name: 'Cinnamoroll', color: 'from-blue-100 to-blue-200' },
              { icon: '💀', name: 'Kuromi', color: 'from-purple-100 to-purple-200' },
              { icon: '🐰', name: 'My Melody', color: 'from-pink-100 to-pink-200' },
              { icon: '🐕', name: 'Pompompurin', color: 'from-yellow-100 to-yellow-200' },
              { icon: '🎃', name: 'Event Items', color: 'from-orange-100 to-orange-200' },
            ].map(cat => (
              <Link
                key={cat.name}
                to={`/browse?category=${cat.name.toLowerCase().replace(' ', '-')}`}
                className={`bg-gradient-to-br ${cat.color} rounded-hk-xl p-6 text-center hover:scale-105 transition-transform`}
              >
                <span className="text-4xl mb-2 block">{cat.icon}</span>
                <p className="font-semibold text-gray-700">{cat.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-hk-pink-400 to-hk-purple-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Bereit zum Tauschen?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Tritt unserer Community bei und finde deine Traum-Items!
          </p>
          <Link to="/profile">
            <Button variant="secondary" size="lg" className="bg-white text-hk-pink-500 border-0">
              🎀 Jetzt starten
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
