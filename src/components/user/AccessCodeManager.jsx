import { useState } from 'react'
import Button from '../common/Button'

function AccessCodeManager({ initialCode = '', onSave }) {
  const [code, setCode] = useState(initialCode)
  const [isEditing, setIsEditing] = useState(!initialCode)
  const [showCode, setShowCode] = useState(false)

  const handleSave = () => {
    onSave?.(code)
    setIsEditing(false)
  }

  const formatCode = (value) => {
    // Remove non-alphanumeric characters and convert to uppercase
    return value.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 12)
  }

  return (
    <div className="bg-white rounded-hk-xl p-6 shadow-hk">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center">
          <span className="mr-2">🎮</span> Zugangscode
        </h3>
        {!isEditing && code && (
          <button
            onClick={() => setShowCode(!showCode)}
            className="text-sm text-hk-pink-500 hover:text-hk-pink-600"
          >
            {showCode ? '🙈 Verbergen' : '👁️ Anzeigen'}
          </button>
        )}
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Dein HKIA Multiplayer-Zugangscode wird automatisch mit akzeptierten Tauschpartnern geteilt.
      </p>

      {isEditing ? (
        <div className="space-y-4">
          <div>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(formatCode(e.target.value))}
              placeholder="XXXXXXXX"
              className="input-cute font-mono text-xl tracking-[0.3em] text-center uppercase"
              maxLength={12}
            />
            <p className="text-xs text-gray-400 mt-2 text-center">
              {code.length}/12 Zeichen
            </p>
          </div>

          <div className="bg-hk-yellow-100 rounded-hk-lg p-4">
            <p className="text-sm text-yellow-700">
              💡 <strong>Wo finde ich meinen Code?</strong><br />
              Öffne Hello Kitty Island Adventure → Einstellungen → Multiplayer → Zugangscode
            </p>
          </div>

          <div className="flex justify-end space-x-3">
            {initialCode && (
              <Button variant="secondary" onClick={() => {
                setCode(initialCode)
                setIsEditing(false)
              }}>
                Abbrechen
              </Button>
            )}
            <Button variant="primary" onClick={handleSave} disabled={!code}>
              Speichern
            </Button>
          </div>
        </div>
      ) : (
        <div>
          {code ? (
            <div className="flex items-center space-x-3">
              <div className="flex-1 bg-hk-pink-50 rounded-hk-lg p-4 text-center">
                <p className="font-mono text-xl tracking-[0.3em] text-hk-pink-500">
                  {showCode ? code : '••••••••'}
                </p>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(code)}
                className="p-3 bg-hk-pink-50 rounded-hk hover:bg-hk-pink-100 transition-colors"
                title="Kopieren"
              >
                📋
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="p-3 bg-hk-pink-50 rounded-hk hover:bg-hk-pink-100 transition-colors"
                title="Bearbeiten"
              >
                ✏️
              </button>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-400 mb-4">Noch kein Zugangscode hinterlegt</p>
              <Button variant="primary" onClick={() => setIsEditing(true)}>
                Code hinzufügen
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AccessCodeManager
