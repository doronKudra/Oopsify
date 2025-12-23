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
        let actions
        if ((station.owner.id === user.id)) {
            actions = [
                { id: makeId(), icon: 'queue', name: 'Add to queue', callback: () => {} }, // TODO
                { id: makeId(), icon: 'profile', name: 'Add to profile', callback: () => {} }, // TODO
                { id: makeId(), icon: 'edit', name: 'Edit details', callback: () => {} }, // TODO
                { id: makeId(), icon: 'delete', name: 'Delete', callback: () => {} }, // TODO
                { id: makeId(), icon: 'new-playlist', name: 'Create playlist', callback: () => {} }, // TODO
                { id: makeId(), icon: 'add', name: 'Create folder', callback: () => {} }, // TODO
                { id: makeId(), icon: 'private', name: 'Make private', callback: () => {} }, // TODO
                { id: makeId(), icon: 'folder', name: 'Move to folder', callback: () => {} }, // TODO - make a dropdown cmp
                { id: makeId(), icon: 'share', name: 'Share', callback: () => {} },
            ]
        }
        else {
            const isLiked = user.likedStations.includes(station.id)
            const isPinned = false
            if (station.type === 'station') {
                actions = [
                    { id: makeId(), icon: 'queue', name: 'Add to queue', callback: () => {} }, // TODO
                    (isLiked && { id: makeId(), icon: 'profile', name: 'Add to profile', callback: () => {} }),// TODO
                    { id: makeId(), icon: 'remove', name: 'Remove from Your Library', callback: () => onRemoveStation(station) },
                    { id: makeId(), icon: 'new-playlist', name: 'Create playlist', callback: () => {} },// TODO
                    { id: makeId(), icon: 'add', name: 'Create folder', callback: () => {} },// TODO
                    { id: makeId(), icon: 'folder', name: 'Move to folder', callback: () => {} },// TODO
                    isPinned ?
                        { id: makeId(), icon: 'unpin', name: 'Unpin playlist', callback: ({ station }) => onPinStation(station) } :// TODO
                        { id: makeId(), icon: 'pin', name: 'Pin playlist', callback: ({ station }) => onPinStation(station) },// TODO
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