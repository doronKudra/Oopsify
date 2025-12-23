import { useLayoutEffect, useRef } from 'react'

export function ContextMenu({ actions, context, position, onClose }) { // dynamic in the future actions: [{id,name,callback},context?,onClose]

    const menuRef = useRef(null)

    useLayoutEffect(() => {
        if (!menuRef.current) return
    }, [])

    function onSelectMenuItem(cb) {
        cb(context)
        onClose()
    }

    if (!actions?.length) return
    return (<div className="context-menu">
        <div onClick={onClose} className="context-menu-backdrop"></div>
        <div onClick={ev => ev.stopPropagation()} style={{ position: 'fixed', top: position.y, left: position.x}} className="context-menu-content">
            <ul>
                {actions.map(action =>
                    <li key={action.id}>
                        <button onClick={() => onSelectMenuItem(action.callback)}>{action.name}</button>
                    </li>)
                }
            </ul>
        </div>
    </div>)
}