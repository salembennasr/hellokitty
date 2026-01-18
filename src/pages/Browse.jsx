import { useState, useMemo } from 'react'
import { mockTrades } from '../data/seedItems'
import TradeList from '../components/trades/TradeList'
import TradeFilter from '../components/trades/TradeFilter'

function Browse() {
  const [filters, setFilters] = useState({
    search: '',
    category: 'ALL',
    rarity: 'ALL',
    status: 'ACTIVE',
  })

  const filteredTrades = useMemo(() => {
    return mockTrades.filter(trade => {
      // Status filter
      if (trade.status !== filters.status) return false

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesDescription = trade.description?.toLowerCase().includes(searchLower)
        const matchesOwner = trade.ownerName?.toLowerCase().includes(searchLower)
        const matchesOffering = trade.offeringItems.some(item =>
          item.item.name.toLowerCase().includes(searchLower) ||
          item.item.nameDE?.toLowerCase().includes(searchLower)
        )
        const matchesSeeking = trade.seekingItems.some(item =>
          item.item.name.toLowerCase().includes(searchLower) ||
          item.item.nameDE?.toLowerCase().includes(searchLower)
        )
        if (!matchesDescription && !matchesOwner && !matchesOffering && !matchesSeeking) {
          return false
        }
      }

      // Category filter
      if (filters.category !== 'ALL') {
        const hasCategory = [
          ...trade.offeringItems,
          ...trade.seekingItems
        ].some(item => item.item.category === filters.category)
        if (!hasCategory) return false
      }

      // Rarity filter
      if (filters.rarity !== 'ALL') {
        const hasRarity = [
          ...trade.offeringItems,
          ...trade.seekingItems
        ].some(item => item.item.rarity === filters.rarity)
        if (!hasRarity) return false
      }

      return true
    })
  }, [filters])

  return (
    <div className="min-h-screen bg-hk-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🔍 Angebote durchsuchen
          </h1>
          <p className="text-gray-500">
            Finde deinen perfekten Tauschpartner
          </p>
        </div>

        {/* Filter */}
        <TradeFilter
          onFilterChange={setFilters}
          initialFilters={filters}
        />

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-500">
            <span className="font-bold text-hk-pink-500">{filteredTrades.length}</span> Angebote gefunden
          </p>
        </div>

        {/* Trade List */}
        <TradeList
          trades={filteredTrades}
          emptyMessage="Keine passenden Angebote gefunden. Versuch andere Filter!"
        />
      </div>
    </div>
  )
}

export default Browse
