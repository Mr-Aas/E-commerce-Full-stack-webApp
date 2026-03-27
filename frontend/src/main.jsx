import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import './index.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar/>
    <App />
    <Footer/>
  </StrictMode>,
)
