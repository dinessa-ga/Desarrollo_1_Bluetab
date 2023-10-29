import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import UploadCV from './component/UploadCv'
import Form from './component/form'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <UploadCV/>
    <Form/>
  </React.StrictMode>,
)
