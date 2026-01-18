import { useState } from 'react'
import Button from '../common/Button'

function Profile({ user, onSave }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    displayName: user?.displayName || 'KittyFan2025',
    accessCode: user?.accessCode || '',
    avatarStyle: user?.avatarStyle || 'kitty',
  })

  const avatarStyles = [
    { value: 'kitty', emoji: '🎀', label: 'Hello Kitty' },
    { value: 'melody', emoji: '🐰', label: 'My Melody' },
    { value: 'kuromi', emoji: '💀', label: 'Kuromi' },
    { value: 'cinnamoroll', emoji: '☁️', label: 'Cinnamoroll' },
    { value: 'pompom', emoji: '🐕', label: 'Pompompurin' },
  ]

  const handleSave = () => {
    onSave?.(formData)
    setIsEditing(false)
  }

  const currentAvatar = avatarStyles.find(a => a.value === formData.avatarStyle)

  return (
    <div className="bg-white rounded-hk-xl p-6 shadow-hk">
      {/* Avatar & Name */}
      <div className="flex items-center space-x-6 mb-8">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-hk-pink-200 to-hk-purple-200 rounded-full flex items-center justify-center">
            <span className="text-5xl">{currentAvatar?.emoji || '🎀'}</span>
          </div>
          {isEditing && (
            <div className="absolute -bottom-2 -right-2">
              <select
                value={formData.avatarStyle}
                onChange={(e) => setFormData(prev => ({ ...prev, avatarStyle: e.target.value }))}
                className="text-xl p-1 rounded-full bg-white border-2 border-hk-pink-200 cursor-pointer"
              >
                {avatarStyles.map(style => (
                  <option key={style.value} value={style.value}>
                    {style.emoji}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              value={formData.displayName}
              onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
              className="input-cute text-xl font-bold"
              maxLength={20}
            />
          ) : (
            <h2 className="text-2xl font-bold text-gray-800">{formData.displayName}</h2>
          )}
          <p className="text-gray-400 text-sm mt-1">Mitglied seit Januar 2026</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-hk-pink-50 rounded-hk-lg p-4 text-center">
          <p className="text-3xl font-bold text-hk-pink-500">12</p>
          <p className="text-sm text-gray-500">Angebote</p>
        </div>
        <div className="bg-hk-blue-100 rounded-hk-lg p-4 text-center">
          <p className="text-3xl font-bold text-hk-blue-300">8</p>
          <p className="text-sm text-gray-500">Trades</p>
        </div>
        <div className="bg-hk-yellow-100 rounded-hk-lg p-4 text-center">
          <p className="text-3xl font-bold text-yellow-600">⭐ 4.8</p>
          <p className="text-sm text-gray-500">Bewertung</p>
        </div>
      </div>

      {/* Access Code */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          🎮 HKIA Zugangscode
        </label>
        {isEditing ? (
          <input
            type="text"
            value={formData.accessCode}
            onChange={(e) => setFormData(prev => ({ ...prev, accessCode: e.target.value.toUpperCase() }))}
            placeholder="Dein Multiplayer-Code"
            className="input-cute font-mono tracking-widest"
            maxLength={12}
          />
        ) : (
          <div className="flex items-center">
            <div className="flex-1 bg-hk-pink-50 rounded-hk-lg p-4">
              {formData.accessCode ? (
                <p className="font-mono text-lg tracking-widest text-hk-pink-500">
                  {formData.accessCode}
                </p>
              ) : (
                <p className="text-gray-400 italic">Noch nicht hinterlegt</p>
              )}
            </div>
            {formData.accessCode && (
              <button
                onClick={() => navigator.clipboard.writeText(formData.accessCode)}
                className="ml-2 p-3 bg-hk-pink-50 rounded-hk hover:bg-hk-pink-100 transition-colors"
                title="Kopieren"
              >
                📋
              </button>
            )}
          </div>
        )}
        <p className="text-xs text-gray-400 mt-2">
          Dein Zugangscode wird nur mit akzeptierten Tauschpartnern geteilt.
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-3">
        {isEditing ? (
          <>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              Abbrechen
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Speichern
            </Button>
          </>
        ) : (
          <Button variant="secondary" onClick={() => setIsEditing(true)}>
            ✏️ Bearbeiten
          </Button>
        )}
      </div>
    </div>
  )
}

export default Profile
