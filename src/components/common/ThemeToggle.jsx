import { MoonIcon, SunIcon, MonitorIcon } from '@phosphor-icons/react'
import { useTheme } from '../../contexts/ThemeContext'
import { ThemeToggleBtn } from './styles/layout'

const ICON_MAP = {
    dark:   { Icon: MoonIcon,    label: 'Switch to light mode'  },
    light:  { Icon: SunIcon,     label: 'Switch to system mode' },
    system: { Icon: MonitorIcon, label: 'Switch to dark mode'   },
}

const ThemeToggle = () => {
    const { theme, cycleTheme } = useTheme()
    const { Icon, label } = ICON_MAP[theme] ?? ICON_MAP.system

    return (
        <ThemeToggleBtn
            onClick={cycleTheme}
            aria-label={label}
            title={label}
            id="theme-toggle-btn"
        >
            <Icon size={18} color="currentColor" weight="regular" />
        </ThemeToggleBtn>
    )
}

export default ThemeToggle
