import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cart from './components/cartpage/Cart.jsx'
import {Provider} from 'react-redux'
import {store} from './store/store.js'
createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>

  </StrictMode>,
)
