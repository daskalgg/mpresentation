import { createRoot } from 'react-dom/client'
import Presentation from './Presentation.tsx'

createRoot(document.getElementById('root')!).render(
    <div style={{ height: '100vh', width: '100vw' }}>
        <Presentation />
    </div>
)
