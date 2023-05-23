import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../src/components/page-signin/src/App'
import { BrowserRouter } from "react-router-dom"
import '../src/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)