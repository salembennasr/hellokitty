import { useState, useEffect, createContext } from 'react'
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
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  // Mock auth state for development
  const [devMode, setDevMode] = useState(true)

  const contextValue = {
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    devMode,
  }

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen flex flex-col bg-hk-pink-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/create" element={
              devMode ? <CreateTrade /> : (
                <Authenticator>
                  {({ signOut, user }) => <CreateTrade user={user} signOut={signOut} />}
                </Authenticator>
              )
            } />
            <Route path="/trade/:id" element={<TradeDetailPage />} />
            <Route path="/items" element={<ItemsPage />} />
            <Route path="/profile" element={
              devMode ? <ProfilePage /> : (
                <Authenticator>
                  {({ signOut, user }) => <ProfilePage user={user} signOut={signOut} />}
                </Authenticator>
              )
            } />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AppContext.Provider>
  )
}

export default App
