import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { SideBarHeader } from './SideBarHeader.jsx'
import { SideBarFilter } from './SideBarFilter.jsx'
import { StationList } from '../StationList.jsx'
import { stationService } from '../../services/station/index.js'
import { loadSidebarStations } from '../../store/actions/station.actions.js'
import { LikedTracks } from '../LikedTracks.jsx'
import { useContextMenu } from '../OptionMenuProvider.jsx'
import { makeId } from '../../services/util.service.js'
import { toggleLikedStation } from '../../store/actions/user.actions.js'

export function SideBar() {
    const user = useSelector(storeState => storeState.userModule.user)
    const [filterBy, setFilterBy] = useState(stationService.getDefaultFilter())
    const stations = useSelector(storeState => storeState.stationModule.sidebarStations)
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

    function onPinStation(station) {
        console.log('pinned')
    }

    function onAddStation(station) {
        toggleLikedStation(station.id)
    }
    function onRemoveStation(station) {
        toggleLikedStation(station.id)
    }

    useEffect(() => {
        loadSidebarStations(filterBy)
    }, [filterBy])

    useEffect(() => {
        if (!user?.likedStations) return
        setFilterBy(prev => ({
            ...prev,
            likedStations: user.likedStations
        }))
    }, [user?.likedStations])

    return (
        <div className="content-area">
            <aside className='sidebar-container'>
                <header className='sidebar-actions'>
                    <SideBarHeader />
                    <SideBarFilter />
                </header>
                <LikedTracks user={user} listType={'favorites'} />
                <StationList
                    openContextMenu={handleOpenMenu}
                    stations={stations}
                    listType={'favorites'}
                />
            </aside>
        </div>
    )
}