import { useState } from 'react'
import ItemDatabase from '../components/items/ItemDatabase'
import SuggestItemForm from '../components/items/SuggestItemForm'
import Modal from '../components/common/Modal'
import Button from '../components/common/Button'

function ItemsPage() {
  const [showSuggestModal, setShowSuggestModal] = useState(false)

  return (
    <div className="min-h-screen bg-hk-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              📦 Item-Datenbank
            </h1>
            <p className="text-gray-500">
              Alle Items aus Hello Kitty Island Adventure
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={() => setShowSuggestModal(true)}
            className="mt-4 sm:mt-0"
          >
            ➕ Item vorschlagen
          </Button>
        </div>

        {/* Item Database */}
        <ItemDatabase />

        {/* Suggest Item Modal */}
        <Modal
          isOpen={showSuggestModal}
          onClose={() => setShowSuggestModal(false)}
          title="✨ Item vorschlagen"
        >
          <SuggestItemForm
            onSubmit={() => setShowSuggestModal(false)}
            onCancel={() => setShowSuggestModal(false)}
          />
        </Modal>
      </div>
    </div>
  )
}

export default ItemsPage
