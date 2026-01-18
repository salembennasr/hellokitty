import { useState, useEffect, useMemo } from 'react'
import { seedItems } from '../data/seedItems'

// In production, this would use Amplify DataStore or API
export function useItems(filters = {}) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Simulate API call
    const fetchItems = async () => {
      setLoading(true)
      try {
        // In production: const items = await DataStore.query(Item)
        await new Promise(resolve => setTimeout(resolve, 300))
        setItems(seedItems)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [])

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      if (filters.category && filters.category !== 'ALL' && item.category !== filters.category) {
        return false
      }
      if (filters.rarity && filters.rarity !== 'ALL' && item.rarity !== filters.rarity) {
        return false
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesName = item.name.toLowerCase().includes(searchLower)
        const matchesNameDE = item.nameDE?.toLowerCase().includes(searchLower)
        const matchesTags = item.tags?.some(tag => tag.toLowerCase().includes(searchLower))
        if (!matchesName && !matchesNameDE && !matchesTags) {
          return false
        }
      }
      return true
    })
  }, [items, filters])

  return {
    items: filteredItems,
    allItems: items,
    loading,
    error,
  }
}

export function useItem(id) {
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true)
      try {
        // In production: const item = await DataStore.query(Item, id)
        await new Promise(resolve => setTimeout(resolve, 200))
        const found = seedItems.find(i => i.id === id)
        setItem(found || null)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchItem()
    }
  }, [id])

  return { item, loading, error }
}

export default useItems
