import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { SideBarHeader } from './SideBarHeader.jsx';
import { SideBarFilter } from './SideBarFilter.jsx';
import { StationList } from '../StationList.jsx';
import { stationService } from '../../services/station/index.js'
import { loadStations } from '../../store/actions/station.actions.js'
import { LikedTracks } from '../LikedTracks.jsx'
import { store } from '../../store/store.js'
import { ContextMenu } from '../ContextMenu.jsx'
import { makeId } from '../../services/util.service.js'
import { toggleLikedStation } from '../../store/actions/user.actions.js'

export function SideBar() {
    const user = useSelector(storeState => storeState.userModule.user)
    const [filterBy, setFilterBy] = useState(stationService.getDefaultFilter())
    const stations = useSelector(storeState => storeState.stationModule.stations)
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

    function onPinStation(station) {
        console.log('pinned')
    }

    function onAddStation(station) {
        toggleLikedStation(station.id)
    }

    useEffect(() => {
        loadStations(filterBy)
    }, [filterBy])

    useEffect(() => {
        setFilterBy({ likedStations: user.likedStations })
    }, [user])

    return (
        <div className="content-area">
            {menu && (
                <ContextMenu
                    actions={menu.actions}
                    context={menu.context}
                    position={menu.position}
                    onClose={closeContextMenu}
                />
            )}
            <aside className='sidebar-container'>
                <header className='sidebar-actions'>
                    <SideBarHeader />
                    <SideBarFilter />
                </header>
                <LikedTracks user={user} listType={'favorites'} />
                <StationList
                    openContextMenu={openContextMenu}
                    stations={stations}
                    listType={'favorites'}
                />
            </aside>
        </div>
    )
}