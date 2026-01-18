import { Link } from 'react-router-dom'
import Button from '../components/common/Button'

function AboutPage() {
  return (
    <div className="min-h-screen bg-hk-pink-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-hk-pink-100 to-hk-purple-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-6xl mb-4 block animate-float">🎀</span>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Über die HKIA Tauschbörse
          </h1>
          <p className="text-xl text-gray-600">
            Eine Community-Plattform von Spielern, für Spieler
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-hk-xl p-8 shadow-hk mb-8">
            <h2 className="text-2xl font-bold text-hk-pink-500 mb-4">
              Was ist die HKIA Tauschbörse?
            </h2>
            <p className="text-gray-600 mb-4">
              Die HKIA Tauschbörse ist eine Fan-Plattform für Hello Kitty Island Adventure Spieler.
              Hier kannst du Items mit anderen Spielern tauschen, um dein Traumzimmer zu gestalten
              oder seltene Gegenstände zu finden.
            </p>
            <p className="text-gray-600">
              Wir sind nicht offiziell mit Sanrio oder den Entwicklern von Hello Kitty Island Adventure verbunden.
              Diese Plattform wurde aus Liebe zum Spiel von der Community erstellt.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-hk-xl p-6 shadow-hk">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">🔒</span> Sicherheit
              </h3>
              <p className="text-gray-600">
                Dein Zugangscode wird nur mit Tauschpartnern geteilt, die du akzeptiert hast.
                Wir empfehlen, deinen Code nach dem Tausch zu ändern.
              </p>
            </div>

            <div className="bg-white rounded-hk-xl p-6 shadow-hk">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">🤝</span> Community
              </h3>
              <p className="text-gray-600">
                Respektiere andere Spieler und halte dich an Absprachen.
                Melde unfaire oder verdächtige Aktivitäten.
              </p>
            </div>

            <div className="bg-white rounded-hk-xl p-6 shadow-hk">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">📦</span> Item-Datenbank
              </h3>
              <p className="text-gray-600">
                Unsere Item-Datenbank wird ständig erweitert.
                Du kannst fehlende Items vorschlagen und zur Datenbank beitragen.
              </p>
            </div>

            <div className="bg-white rounded-hk-xl p-6 shadow-hk">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">🆓</span> Kostenlos
              </h3>
              <p className="text-gray-600">
                Die Plattform ist und bleibt komplett kostenlos.
                Wir verdienen kein Geld mit dieser Community.
              </p>
            </div>
          </div>

          <div className="bg-hk-pink-100 rounded-hk-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Hilfreiche Links
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://hellokittyislandadventure.wiki.gg/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white px-6 py-3 rounded-hk-lg shadow-sm hover:shadow-hk transition-shadow"
              >
                📖 HKIA Wiki
              </a>
              <a
                href="#"
                className="bg-white px-6 py-3 rounded-hk-lg shadow-sm hover:shadow-hk transition-shadow"
              >
                💬 Discord Community
              </a>
              <a
                href="#"
                className="bg-white px-6 py-3 rounded-hk-lg shadow-sm hover:shadow-hk transition-shadow"
              >
                📱 App Store
              </a>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-500 mb-6">
              Bereit zum Tauschen?
            </p>
            <Link to="/browse">
              <Button variant="cute" size="lg">
                🎀 Jetzt loslegen
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
