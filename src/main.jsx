import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import UploadCV from './component/UploadCv'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <UploadCV/>
  </React.StrictMode>,
)
