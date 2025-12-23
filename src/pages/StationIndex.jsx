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

export function StationIndex() {

    // const [filterBy, setFilterBy] = useState(stationService.getDefaultFilter())
    const stations = useSelector(storeState => storeState.stationModule.stations)

    const [bgColor, setBgColor] = useState({ hex: '#3f3f3fff' })
    const user = useSelector(storeState => storeState.userModule.user)
    const { openContextMenu } = useContextMenu()

    function handleOpenMenu({ x, y, context }) {
        const { station } = context
        let actions
        if ((station.owner.id === user.id)) {
            actions = [
                { id: makeId(), icon: 'queue', name: 'Add to queue', callback: () => {} }, // TODO
                { id: makeId(), icon: 'profile', name: 'Add to profile', callback: () => {} },
                { id: makeId(), icon: 'edit', name: 'Edit details', callback: () => {} }, // TODO
                { id: makeId(), icon: 'delete', name: 'Delete', callback: () => {} }, // TODO
                { id: makeId(), icon: 'private', name: 'Make private', callback: () => {} }, // TODO 
                { id: makeId(), icon: 'folder', name: 'Move to folder', callback: () => {} }, // TODO - make a dropdown cmp
                { id: makeId(), icon: 'share', name: 'Share', callback: () => {} },// TODO
            ]
        }
        else{
            const isLiked = user.likedStations.includes(station.id)
            if(station.type === 'station'){
                actions = [                
                    (isLiked ?
                    { id: makeId(), icon: 'remove', name: 'Remove from Your Library', callback: () => onRemoveStation(station) }
                    : { id: makeId(), icon: 'save', name: 'Add to Your Library', callback: () => onAddStation(station) }),
                    { id: makeId(), icon: 'queue', name: 'Add to queue', callback: () => {} }, // TODO
                    (isLiked && { id: makeId(), icon: 'profile', name: 'Add to profile', callback: () => {} }),// TODO
                    { id: makeId(), icon: 'folder', name: (isLiked ? 'Move to folder' : 'Add to folder'), callback: () => {} },// TODO
                    { id: makeId(), icon: 'share', name: 'Share', callback: () => {} },// TODO
                ]
            }
        }
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

    function onAddToQueue() { // TODO

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