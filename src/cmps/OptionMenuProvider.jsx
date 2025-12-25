import { createContext, useContext, useState } from 'react'
import { ContextMenu } from './OptionMenu.jsx'

const MENU_SIZE = {
    width: 280,
    height: 250,
}

const OptionMenuContext = createContext()

export function OptionMenuProvider({ children }) {
    const [menu, setMenu] = useState(null)

    function openContextMenu({ x, y, context, actions }) {
        const openUpwards = y + MENU_SIZE.height > window.innerHeight
        const finalY = openUpwards ? y - MENU_SIZE.height : y
        const position = clampPosition(x, finalY, MENU_SIZE.width, MENU_SIZE.height)
        setMenu({ position, context, actions})
    }

    function closeContextMenu() {
        setMenu(null)
    }

    function clampPosition(x, y, menuWidth, menuHeight) {
        const padding = 20
        const maxX = window.innerWidth - menuWidth - padding
        const maxY = window.innerHeight - menuHeight - padding

        return {
            x: Math.min(x, maxX),
            y: Math.min(y, maxY),
        }
    }

    return (
        <OptionMenuContext.Provider value={{ openContextMenu }}>
            {children}
            {menu && (
                <ContextMenu
                    {...menu}
                    onClose={closeContextMenu}
                />
            )}
        </OptionMenuContext.Provider>
    )
}

export function useContextMenu() {
    return useContext(OptionMenuContext)
}