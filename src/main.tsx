import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import './firebase'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NextUIProvider>
      <main className="text-foreground">
        <App />
      </main>
    </NextUIProvider>
  </StrictMode>,
)
