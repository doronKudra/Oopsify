import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loadStations } from '../store/actions/station.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { stationService } from '../services/station/index.js'
import { userService } from '../services/user/index.js'
import { ContextMenu } from '../cmps/ContextMenu'
import { StationList } from '../cmps/StationList.jsx'
import { FastAverageColor } from 'fast-average-color'
import { makeId } from '../services/util.service.js'
import { toggleLikedStation } from '../store/actions/user.actions.js'
// import { StationFilter } from '../cmps/StationFilter.jsx'


export function StationIndex() {

    const [filterBy, setFilterBy] = useState(stationService.getDefaultFilter())
    const stations = useSelector(storeState => storeState.stationModule.stations)

    const [bgColor, setBgColor] = useState({ hex: '#3f3f3fff' })
    const user = useSelector(storeState => storeState.userModule.user)
    const [menu, setMenu] = useState(null)
    function openContextMenu({ x, y, context }) {
        setMenu({
            position: { x, y },
            context,
            actions: [
                { id: makeId(), name: 'Pin playlist', callback: ({ station }) => onPinStation(station) },
                { id: makeId(), name: 'Add to Your Library', callback: ({ station }) => onAddStation(station) },
            ]
        })
    }
    function closeContextMenu() {
        setMenu(null)
    }
    useEffect(() => {
        loadStations(filterBy)
    }, [filterBy])

    useEffect(() => {
        
        setFilterBy({likedStations:user.likedStations})
    }, [user])

    function onPinStation(station) {
        console.log('pinned')
    }

    function onAddStation(station) {
        toggleLikedStation(station.id)
    }
    return (
        <main className="station-index" style={{
            background: `linear-gradient(to bottom, ${bgColor.hex}, #121212)`,
        }}>
            {/* <StationFilter filterBy={filterBy} setFilterBy={setFilterBy} /> */}
            {menu && (
                <ContextMenu
                    actions={menu.actions}
                    context={menu.context}
                    position={menu.position}
                    onClose={closeContextMenu}
                />
            )}
            <StationList
                openContextMenu={openContextMenu}
                stations={stations}
                listType={'recent'} />
            <StationList
                openContextMenu={openContextMenu}
                stations={stations}
                listType={'index'} />
            <StationList
                openContextMenu={openContextMenu}
                stations={stations}
                listType={'index'} />
        </main>
    )
}