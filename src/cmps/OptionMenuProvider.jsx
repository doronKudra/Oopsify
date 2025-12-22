import { createContext, useContext, useState } from 'react'
import { ContextMenu } from './OptionMenu.jsx'

const OptionMenuContext = createContext()

export function OptionMenuProvider({ children }) {
    const [menu, setMenu] = useState(null)

    function openContextMenu({ x, y, context, actions }) {
        setMenu({ position: { x, y }, context, actions })
    }

    function closeContextMenu() {
        setMenu(null)
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