import { createContext } from 'react'

// Context to detect when we're inside an interactive container
// This prevents nested interactive elements (buttons inside buttons)
export const InteractiveContext = createContext(false)