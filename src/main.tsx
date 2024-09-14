import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import './firebase'
import { Provider } from 'jotai'
import { store } from './store.ts'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NextUIProvider>
      <Provider store={store}>
        <main className="text-foreground h-screen">
          <App />
        </main>
      </Provider >
    </NextUIProvider>
  </StrictMode>,
)
