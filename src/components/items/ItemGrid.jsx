import ItemCard from '../common/ItemCard'

function ItemGrid({ items, onItemClick }) {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12">
        <span className="text-6xl mb-4 block">📦</span>
        <p className="text-gray-500 text-lg">Keine Items gefunden</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {items.map(item => (
        <ItemCard
          key={item.id}
          item={item}
          onClick={() => onItemClick?.(item)}
        />
      ))}
    </div>
  )
}

export default ItemGrid
