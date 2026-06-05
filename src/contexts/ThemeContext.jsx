import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

// orden del ciclo
const CYCLE = ['dark', 'light', 'system']
const STORAGE_KEY = 'steel_theme'

const getSystemTheme = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

/**
//  * aplica el atributo data-theme al elemento <html>.
 * @param {'dark'|'light'} resolved
 */
const applyTheme = (resolved) => {
    document.documentElement.setAttribute('data-theme', resolved)
}

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        return CYCLE.includes(saved) ? saved : 'system'
    })

    // Resuelve el tema efectivo (dark o light)
    const resolvedTheme = theme === 'system' ? getSystemTheme() : theme

    // Aplica data-theme y guarda en localStorage cada vez que cambia theme
    useEffect(() => {
        const resolved = theme === 'system' ? getSystemTheme() : theme
        applyTheme(resolved)
        localStorage.setItem(STORAGE_KEY, theme)
    }, [theme])

    // En modo 'system', escucha cambios en la preferencia del SO en tiempo real
    useEffect(() => {
        if (theme !== 'system') return

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleChange = (e) => applyTheme(e.matches ? 'dark' : 'light')

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [theme])

    /** Avanza al siguiente tema en el ciclo */
    const cycleTheme = () => {
        setTheme((prev) => {
            const idx = CYCLE.indexOf(prev)
            return CYCLE[(idx + 1) % CYCLE.length]
        })
    }

    return (
        <ThemeContext.Provider value={{ theme, resolvedTheme, cycleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider

export const useTheme = () => useContext(ThemeContext)
