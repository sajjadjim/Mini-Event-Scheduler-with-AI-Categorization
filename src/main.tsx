import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './Router/Router.tsx'
import { RouterProvider } from 'react-router'
import AuthProvider from './Auth/AuthProvider.tsx'


createRoot(document.getElementById('root')!).render(

  <AuthProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </AuthProvider>

  ,
)
