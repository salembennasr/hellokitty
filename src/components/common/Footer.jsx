import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-white border-t border-hk-pink-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🎀</span>
              <span className="font-bold text-lg text-gradient-pink">HKIA Tauschbörse</span>
            </div>
            <p className="text-gray-500 text-sm">
              Die Community-Plattform für Hello Kitty Island Adventure Spieler zum Tauschen von Items.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-hk-pink-500">Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/browse" className="text-gray-500 hover:text-hk-pink-500 text-sm transition-colors">
                Angebote durchsuchen
              </Link>
              <Link to="/items" className="text-gray-500 hover:text-hk-pink-500 text-sm transition-colors">
                Item-Datenbank
              </Link>
              <Link to="/create" className="text-gray-500 hover:text-hk-pink-500 text-sm transition-colors">
                Tausch erstellen
              </Link>
              <Link to="/about" className="text-gray-500 hover:text-hk-pink-500 text-sm transition-colors">
                Über uns
              </Link>
            </nav>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="font-semibold text-hk-pink-500">Community</h3>
            <div className="flex flex-col space-y-2">
              <a
                href="https://hellokittyislandadventure.wiki.gg/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-hk-pink-500 text-sm transition-colors"
              >
                📖 HKIA Wiki
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-hk-pink-500 text-sm transition-colors"
              >
                💬 Discord Community
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-hk-pink-100 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-xs">
            © 2026 HKIA Tauschbörse. Fan-Projekt - nicht offiziell mit Sanrio verbunden.
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-xs">Made with</span>
            <span className="text-hk-pink-400">💖</span>
            <span className="text-gray-400 text-xs">für die HKIA Community</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
