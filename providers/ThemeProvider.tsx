'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  toggleTheme: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
  }, [])

  function toggleTheme() {
    // No-op, we are forcing dark mode
  }

  return (
    <ThemeContext.Provider value={{ theme: 'dark', toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
