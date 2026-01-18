import { createContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import Browse from './pages/Browse'
import CreateTrade from './pages/CreateTrade'
import TradeDetailPage from './pages/TradeDetailPage'
import ItemsPage from './pages/ItemsPage'
import ProfilePage from './pages/ProfilePage'
import AboutPage from './pages/AboutPage'

// Context für globalen State
export const AppContext = createContext(null)

function App() {
  return (
    <Authenticator hideSignUp>
      {({ signOut, user }) => (
        <AppContext.Provider value={{ user, signOut }}>
          <div className="min-h-screen flex flex-col bg-hk-pink-50">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/create" element={<CreateTrade />} />
                <Route path="/trade/:id" element={<TradeDetailPage />} />
                <Route path="/items" element={<ItemsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AppContext.Provider>
      )}
    </Authenticator>
  )
}

export default App
