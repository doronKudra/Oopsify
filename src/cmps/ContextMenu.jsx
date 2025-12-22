import { makeId } from '../services/util.service'

export function ContextMenu({ actions, context, onClose }) { // dynamic in the future actions: [{id,name,callback}]
    
    function onSelectMenuItem(cb){
        cb(context)
        onClose()
    }

    if(!actions?.length) return
    return (<div  className="context-menu">
        <div onClick={onClose} className="context-menu-backdrop"></div>
        <div onClick={ev => ev.stopPropagation()} className="context-menu-content">
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