import { useState } from 'react'
import Button from '../common/Button'

function SuggestItemForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    nameDE: '',
    category: 'FURNITURE',
    subcategory: '',
    description: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const categories = [
    { value: 'FURNITURE', label: '🪑 Möbel' },
    { value: 'MATERIAL', label: '✨ Material' },
    { value: 'CLOTHING', label: '👗 Kleidung' },
    { value: 'FOOD', label: '🍰 Essen' },
    { value: 'EVENT', label: '🎃 Event' },
    { value: 'RECIPE', label: '📜 Rezepte' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In production, this would call Amplify API
    console.log('Submitting item suggestion:', formData)
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setSubmitted(true)
    onSubmit?.(formData)
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <span className="text-6xl mb-4 block">✨</span>
        <h3 className="text-xl font-bold text-hk-pink-500 mb-2">
          Vielen Dank!
        </h3>
        <p className="text-gray-500">
          Dein Item-Vorschlag wurde eingereicht und wird geprüft.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Item Name (Englisch) *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="z.B. Hello Kitty Lamp"
          className="input-cute"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Item Name (Deutsch)
        </label>
        <input
          type="text"
          value={formData.nameDE}
          onChange={(e) => setFormData(prev => ({ ...prev, nameDE: e.target.value }))}
          placeholder="z.B. Hello Kitty Lampe"
          className="input-cute"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Kategorie *
        </label>
        <select
          value={formData.category}
          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
          className="select-cute"
          required
        >
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Unterkategorie / Set
        </label>
        <input
          type="text"
          value={formData.subcategory}
          onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
          placeholder="z.B. hello-kitty, cinnamoroll, halloween"
          className="input-cute"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Beschreibung (optional)
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Zusätzliche Informationen zum Item..."
          className="input-cute min-h-[80px] resize-none"
          maxLength={300}
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Abbrechen
        </Button>
        <Button type="submit" variant="primary" loading={isSubmitting}>
          Vorschlagen
        </Button>
      </div>
    </form>
  )
}

export default SuggestItemForm
