import { userService } from '../services/user'
import { useState } from 'react'
import { StationPreview } from './StationPreview'
import { ContextMenu } from './ContextMenu'
import { makeId } from '../services/util.service'

export function StationList({ stations, listType }) {
    const [menu, setMenu] = useState(null)

    function openContextMenu({ x, y, context }) {
        setMenu({
            position: { x, y },
            context,
            actions: [
                {id:makeId(),name:'Pin',callback: ({ station }) => onPinStation(station)},
                {id:makeId(),name:'Remove from Your Library',callback: ({ station }) => onRemoveStation(station)},
                {id:makeId(),name:'Add to Your Library',callback: ({ station }) => onAddStation(station)},
            ]
        })
    }

    function onPinStation(station){
        console.log('pinned')
    }

    function onRemoveStation(station){
        
    }

    function onAddStation(station){
        console.log('added')
    }

    function closeContextMenu() {
        setMenu(null)
    }
    if (!stations?.length) return
    return (<section>
        <ul className={listType + "-station-list"}>
            {stations.map(station =>
                <li key={station.id}>
                    <StationPreview openContextMenu={openContextMenu} station={station} listType={listType} />
                </li>)
            }
        </ul>
        {menu && (
            <ContextMenu
                actions={menu.actions}
                context={menu.context}
                position={menu.position}
                onClose={closeContextMenu}
            />
        )}
    </section>)
}