import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Amplify } from 'aws-amplify'
import App from './App.jsx'
import './styles/index.css'

// Development mode - Amplify wird mit Mock-Config initialisiert
// Nach dem Amplify-Deployment: amplify_outputs.json importieren
const devConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'dev-mode',
      userPoolClientId: 'dev-mode',
    }
  }
}

// Konfiguration laden
const configureAmplify = async () => {
  try {
    // Prüfe ob amplify_outputs.json existiert (nur in Produktion)
    const response = await fetch('/amplify_outputs.json')
    if (response.ok) {
      const outputs = await response.json()
      Amplify.configure(outputs)
      console.log('Amplify configured with backend')
    } else {
      throw new Error('No backend config')
    }
  } catch {
    // Entwicklungsmodus ohne Backend
    Amplify.configure(devConfig)
    console.log('Running in development mode (no Amplify backend)')
  }
}

// App starten
configureAmplify().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  )
})
