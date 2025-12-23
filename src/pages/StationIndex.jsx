import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loadStations } from '../store/actions/station.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { stationService } from '../services/station/index.js'
import { userService } from '../services/user/index.js'
import { StationList } from '../cmps/StationList.jsx'
import { FastAverageColor } from 'fast-average-color'
import { toggleLikedStation } from '../store/actions/user.actions.js'
import { useContextMenu } from '../cmps/OptionMenuProvider.jsx'
import { makeId } from '../services/util.service.js'
// import { StationFilter } from '../cmps/StationFilter.jsx'

export function StationIndex() {

    // const [filterBy, setFilterBy] = useState(stationService.getDefaultFilter())
    const stations = useSelector(storeState => storeState.stationModule.stations)

    const [bgColor, setBgColor] = useState({ hex: '#3f3f3fff' })
    const user = useSelector(storeState => storeState.userModule.user)
    const { openContextMenu } = useContextMenu()

    function handleOpenMenu({ x, y, context }) {
        const { station } = context
        const isLiked = user.likedStations.includes(station.id)

        const actions = [
            { id: makeId(), name: 'Pin playlist', callback: () => onPinStation(station) },
            (isLiked ?
                { id: makeId(), name: 'Remove from Your Library', callback: () => onRemoveStation(station) }
                : { id: makeId(), name: 'Add to Your Library', callback: () => onAddStation(station) })
        ]
        openContextMenu({
            x,
            y,
            context,
            actions
        })
    }

    useEffect(() => {
        loadStations()
    }, [])

    function onPinStation(station) {
        console.log('pinned')
    }

    function onAddStation(station) {
        toggleLikedStation(station.id)
    }
    function onRemoveStation(station) {
        toggleLikedStation(station.id)
    }
    return (
        <main className="station-index" style={{
            background: `linear-gradient(to bottom, ${bgColor.hex}, #121212)`,
        }}>
            {/* <StationFilter filterBy={filterBy} setFilterBy={setFilterBy} /> */}
            <StationList
                openContextMenu={handleOpenMenu}
                stations={stations}
                listType={'recent'} />
            <StationList
                openContextMenu={handleOpenMenu}
                stations={stations}
                listType={'index'} />
            <StationList
                openContextMenu={handleOpenMenu}
                stations={stations}
                listType={'index'} />
        </main>
    )
}