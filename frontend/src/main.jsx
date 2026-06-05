import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LanguageProvider } from './context/languageContext.jsx'
import './i18n.js'
import './index.css'
import { Provider } from "react-redux";
import { store } from "./utils/Store.js";

import App from './pages/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <Provider store={store}>

        <App />
        
      </Provider>
    </LanguageProvider>
  </StrictMode>,
)
