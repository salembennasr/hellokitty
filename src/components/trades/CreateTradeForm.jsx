import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../common/Button'
import ItemSelector from '../common/ItemSelector'

function CreateTradeForm({ user }) {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    offeringItems: [],
    seekingItems: [],
    description: '',
    contactPreference: 'IN_APP',
    discordUsername: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const totalSteps = 4

  const handleOfferingSelect = (item) => {
    setFormData(prev => ({
      ...prev,
      offeringItems: [...prev.offeringItems, { ...item, quantity: 1 }]
    }))
  }

  const handleOfferingRemove = (item) => {
    setFormData(prev => ({
      ...prev,
      offeringItems: prev.offeringItems.filter(i => i.id !== item.id)
    }))
  }

  const handleSeekingSelect = (item) => {
    setFormData(prev => ({
      ...prev,
      seekingItems: [...prev.seekingItems, { ...item, quantity: 1 }]
    }))
  }

  const handleSeekingRemove = (item) => {
    setFormData(prev => ({
      ...prev,
      seekingItems: prev.seekingItems.filter(i => i.id !== item.id)
    }))
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.offeringItems.length > 0
      case 2:
        return formData.seekingItems.length > 0
      case 3:
        return formData.contactPreference === 'IN_APP' ||
          (formData.contactPreference === 'DISCORD' && formData.discordUsername.trim())
      case 4:
        return true
      default:
        return false
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // In production, this would call Amplify API
    console.log('Creating trade:', formData)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    navigate('/browse')
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {[1, 2, 3, 4].map(s => (
            <div
              key={s}
              className={`flex items-center ${s < totalSteps ? 'flex-1' : ''}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  s <= step
                    ? 'bg-hk-pink-400 text-white'
                    : 'bg-hk-pink-100 text-hk-pink-300'
                }`}
              >
                {s < step ? '✓' : s}
              </div>
              {s < totalSteps && (
                <div
                  className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                    s < step ? 'bg-hk-pink-400' : 'bg-hk-pink-100'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Biete</span>
          <span>Suche</span>
          <span>Kontakt</span>
          <span>Fertig</span>
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-hk-xl p-6 shadow-hk">
        {/* Step 1: Offering Items */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-hk-pink-500 mb-2">
              📦 Was bietest du an?
            </h2>
            <p className="text-gray-500 mb-6">
              Wähle die Items aus, die du tauschen möchtest.
            </p>
            <ItemSelector
              selectedItems={formData.offeringItems}
              onSelectItem={handleOfferingSelect}
              onRemoveItem={handleOfferingRemove}
              maxItems={10}
            />
          </div>
        )}

        {/* Step 2: Seeking Items */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-hk-blue-300 mb-2">
              🔍 Was suchst du?
            </h2>
            <p className="text-gray-500 mb-6">
              Wähle die Items aus, die du gerne hättest.
            </p>
            <ItemSelector
              selectedItems={formData.seekingItems}
              onSelectItem={handleSeekingSelect}
              onRemoveItem={handleSeekingRemove}
              maxItems={10}
            />
          </div>
        )}

        {/* Step 3: Contact Preferences */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-hk-purple-300 mb-2">
              📱 Kontaktpräferenz
            </h2>
            <p className="text-gray-500 mb-6">
              Wie möchtest du kontaktiert werden?
            </p>

            <div className="space-y-4">
              <label className="flex items-center p-4 border-2 rounded-hk-lg cursor-pointer transition-all hover:border-hk-pink-300 has-[:checked]:border-hk-pink-400 has-[:checked]:bg-hk-pink-50">
                <input
                  type="radio"
                  name="contactPreference"
                  value="IN_APP"
                  checked={formData.contactPreference === 'IN_APP'}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactPreference: e.target.value }))}
                  className="mr-4 w-5 h-5 text-hk-pink-400"
                />
                <div>
                  <p className="font-semibold text-gray-800">📱 In-App Nachrichten</p>
                  <p className="text-sm text-gray-500">Nutze das interne Nachrichtensystem</p>
                </div>
              </label>

              <label className="flex items-center p-4 border-2 rounded-hk-lg cursor-pointer transition-all hover:border-hk-pink-300 has-[:checked]:border-hk-pink-400 has-[:checked]:bg-hk-pink-50">
                <input
                  type="radio"
                  name="contactPreference"
                  value="DISCORD"
                  checked={formData.contactPreference === 'DISCORD'}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactPreference: e.target.value }))}
                  className="mr-4 w-5 h-5 text-hk-pink-400"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">💬 Discord</p>
                  <p className="text-sm text-gray-500">Werde über Discord kontaktiert</p>
                </div>
              </label>

              {formData.contactPreference === 'DISCORD' && (
                <div className="ml-9 mt-2">
                  <input
                    type="text"
                    placeholder="Discord Username (z.B. KittyFan#1234)"
                    value={formData.discordUsername}
                    onChange={(e) => setFormData(prev => ({ ...prev, discordUsername: e.target.value }))}
                    className="input-cute"
                  />
                </div>
              )}
            </div>

            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Beschreibung (optional)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="z.B. Sammle Hello Kitty Möbel für mein Traumzimmer!"
                className="input-cute min-h-[100px] resize-none"
                maxLength={500}
              />
            </div>
          </div>
        )}

        {/* Step 4: Summary */}
        {step === 4 && (
          <div>
            <h2 className="text-2xl font-bold text-hk-pink-500 mb-2">
              ✨ Zusammenfassung
            </h2>
            <p className="text-gray-500 mb-6">
              Überprüfe dein Tauschangebot vor dem Erstellen.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {/* Offering */}
              <div className="bg-hk-pink-50 rounded-hk-lg p-4">
                <h3 className="font-bold text-hk-pink-500 mb-3">📦 Du bietest</h3>
                <div className="space-y-2">
                  {formData.offeringItems.map(item => (
                    <div key={item.id} className="text-sm text-gray-700">
                      • {item.nameDE || item.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Seeking */}
              <div className="bg-hk-blue-100 rounded-hk-lg p-4">
                <h3 className="font-bold text-hk-blue-300 mb-3">🔍 Du suchst</h3>
                <div className="space-y-2">
                  {formData.seekingItems.map(item => (
                    <div key={item.id} className="text-sm text-gray-700">
                      • {item.nameDE || item.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {formData.description && (
              <div className="bg-gray-50 rounded-hk-lg p-4 mb-4">
                <p className="text-sm text-gray-500 mb-1">Beschreibung:</p>
                <p className="text-gray-700">{formData.description}</p>
              </div>
            )}

            <div className="flex items-center text-sm text-gray-500">
              <span className="mr-2">Kontakt:</span>
              {formData.contactPreference === 'DISCORD' ? (
                <span>💬 Discord ({formData.discordUsername})</span>
              ) : (
                <span>📱 In-App Nachrichten</span>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-hk-pink-100">
          <Button
            variant="secondary"
            onClick={() => setStep(s => Math.max(1, s - 1))}
            disabled={step === 1}
          >
            ← Zurück
          </Button>

          {step < totalSteps ? (
            <Button
              variant="primary"
              onClick={() => setStep(s => s + 1)}
              disabled={!canProceed()}
            >
              Weiter →
            </Button>
          ) : (
            <Button
              variant="cute"
              onClick={handleSubmit}
              loading={isSubmitting}
            >
              🎀 Angebot erstellen
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CreateTradeForm
