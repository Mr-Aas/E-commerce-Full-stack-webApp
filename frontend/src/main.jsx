import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LanguageProvider } from './context/languageContext.jsx'
import './i18n.js'
import './index.css'

import App from './pages/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <LanguageProvider>

    <App />
   </LanguageProvider>
  </StrictMode>,
)
