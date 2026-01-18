import { useState, useEffect, useMemo } from 'react'
import { mockTrades } from '../data/seedItems'

// In production, this would use Amplify DataStore or API
export function useTrades(filters = {}) {
  const [trades, setTrades] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTrades = async () => {
      setLoading(true)
      try {
        // In production: const trades = await DataStore.query(Trade)
        await new Promise(resolve => setTimeout(resolve, 300))
        setTrades(mockTrades)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTrades()
  }, [])

  const filteredTrades = useMemo(() => {
    return trades.filter(trade => {
      if (filters.status && trade.status !== filters.status) {
        return false
      }
      if (filters.ownerId && trade.ownerId !== filters.ownerId) {
        return false
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesDescription = trade.description?.toLowerCase().includes(searchLower)
        const matchesOwner = trade.ownerName?.toLowerCase().includes(searchLower)
        if (!matchesDescription && !matchesOwner) {
          return false
        }
      }
      return true
    })
  }, [trades, filters])

  return {
    trades: filteredTrades,
    allTrades: trades,
    loading,
    error,
  }
}

export function useTrade(id) {
  const [trade, setTrade] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTrade = async () => {
      setLoading(true)
      try {
        // In production: const trade = await DataStore.query(Trade, id)
        await new Promise(resolve => setTimeout(resolve, 200))
        const found = mockTrades.find(t => t.id === id)
        setTrade(found || null)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchTrade()
    }
  }, [id])

  return { trade, loading, error }
}

export function useCreateTrade() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const createTrade = async (tradeData) => {
    setLoading(true)
    setError(null)
    try {
      // In production: const trade = await DataStore.save(new Trade(tradeData))
      await new Promise(resolve => setTimeout(resolve, 500))
      console.log('Creating trade:', tradeData)
      return { id: 'new-trade-id', ...tradeData }
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { createTrade, loading, error }
}

export default useTrades
