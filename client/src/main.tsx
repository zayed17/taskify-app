import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux'
import store from './store/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="329764453810-hgd09tink9c006t8hsmce8nosbbrt1m4.apps.googleusercontent.com">
      <Provider store={store} >
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
