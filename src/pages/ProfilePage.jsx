import { useState, useContext } from 'react'
import { Authenticator } from '@aws-amplify/ui-react'
import { AppContext } from '../App'
import Profile from '../components/user/Profile'
import MyTrades from '../components/user/MyTrades'
import MyInterests from '../components/user/MyInterests'
import AccessCodeManager from '../components/user/AccessCodeManager'

function ProfilePage({ user, signOut }) {
  const [activeTab, setActiveTab] = useState('profile')
  const { devMode } = useContext(AppContext)

  const tabs = [
    { id: 'profile', label: '👤 Profil', icon: '👤' },
    { id: 'trades', label: '📦 Meine Angebote', icon: '📦' },
    { id: 'interests', label: '💝 Meine Anfragen', icon: '💝' },
  ]

  // Mock user data for dev mode
  const mockUser = {
    displayName: 'KittyFan2025',
    accessCode: 'KITTY123',
    avatarStyle: 'kitty',
  }

  const currentUser = devMode ? mockUser : user

  return (
    <div className="min-h-screen bg-hk-pink-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Mein Profil
          </h1>
          <p className="text-gray-500">
            Verwalte dein Profil und deine Tauschangebote
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all
                ${activeTab === tab.id
                  ? 'bg-hk-pink-400 text-white shadow-hk'
                  : 'bg-white text-gray-600 hover:bg-hk-pink-50'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'profile' && (
            <>
              <Profile user={currentUser} onSave={(data) => console.log('Save profile:', data)} />
              <AccessCodeManager
                initialCode={currentUser?.accessCode}
                onSave={(code) => console.log('Save code:', code)}
              />

              {/* Dev Mode Notice */}
              {devMode && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-hk-lg p-4">
                  <p className="text-sm text-yellow-700">
                    ⚠️ <strong>Entwicklungsmodus:</strong> Die Authentifizierung ist deaktiviert.
                    In Produktion wird hier der Amplify Authenticator verwendet.
                  </p>
                </div>
              )}

              {/* Sign Out (only when authenticated) */}
              {signOut && !devMode && (
                <div className="text-center pt-4">
                  <button
                    onClick={signOut}
                    className="text-gray-400 hover:text-gray-600 text-sm"
                  >
                    Abmelden
                  </button>
                </div>
              )}
            </>
          )}

          {activeTab === 'trades' && <MyTrades />}

          {activeTab === 'interests' && <MyInterests />}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
