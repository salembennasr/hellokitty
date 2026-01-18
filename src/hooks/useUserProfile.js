import { useState, useEffect } from 'react'

// In production, this would use Amplify Auth and DataStore
export function useUserProfile() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true)
      try {
        // In production: Get from Cognito + DataStore
        await new Promise(resolve => setTimeout(resolve, 300))

        // Mock profile for dev mode
        setProfile({
          userId: 'mock-user-id',
          displayName: 'KittyFan2025',
          avatarStyle: 'kitty',
          reputation: 48,
          accessCode: 'KITTY123',
          completedTrades: 12,
          createdAt: '2026-01-01T00:00:00Z',
        })
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const updateProfile = async (updates) => {
    try {
      // In production: await DataStore.save(UserProfile.copyOf(profile, updated => {...}))
      await new Promise(resolve => setTimeout(resolve, 300))
      setProfile(prev => ({ ...prev, ...updates }))
      return true
    } catch (err) {
      setError(err)
      return false
    }
  }

  const updateAccessCode = async (code) => {
    return updateProfile({ accessCode: code })
  }

  return {
    profile,
    loading,
    error,
    updateProfile,
    updateAccessCode,
  }
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In production: const user = await Auth.currentAuthenticatedUser()
        await new Promise(resolve => setTimeout(resolve, 200))

        // Dev mode - simulate authenticated user
        setIsAuthenticated(true)
        setUser({
          username: 'mock-user',
          attributes: {
            email: 'kitty@example.com',
            preferred_username: 'KittyFan2025',
          },
        })
      } catch {
        setIsAuthenticated(false)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  return {
    isAuthenticated,
    user,
    loading,
  }
}

export default useUserProfile
