import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { SideBarHeader } from './SideBarHeader.jsx'
import { SideBarFilter } from './SideBarFilter.jsx'
import { StationList } from '../StationList.jsx'
import { stationService } from '../../services/station/index.js'
import { loadSidebarStations, removeStation } from '../../store/actions/station.actions.js'
import { LikedTracks } from '../LikedTracks.jsx'
import { useContextMenu } from '../OptionMenuProvider.jsx'
import { makeId } from '../../services/util.service.js'
import { toggleLikedStation } from '../../store/actions/user.actions.js'
import { useModal } from '../ModalProvider.jsx'
import { useEffectUpdate } from '../../customHooks/useEffectUpdate.js'
import { useNavigate } from 'react-router-dom'
import { playerActions } from '../../store/actions/player.actions.js'

export function SideBar() {
    const user = useSelector((storeState) => storeState.userModule.user)
    const [filterBy, setFilterBy] = useState(stationService.getDefaultFilter())
    const stations = useSelector(storeState => storeState.stationModule.sidebarStations)
    const currentStation = useSelector(storeState => storeState.stationModule.station)
    const { openContextMenu } = useContextMenu()
    const { openEditStation } = useModal()
    const navigate = useNavigate()
    const isOpen = useState(false)

    function handleOpenMenu({ x, y, context }) {
        const { station } = context
        let actions
        if (station.owner._id === user._id) {
            actions = [
                { id: makeId(), icon: 'queue', name: 'Add to queue', callback: () => playerActions.onPlayStation(station.tracks)}, // TODO
                { id: makeId(), icon: 'profile', name: 'Add to profile', callback: () => {},border: true,}, // TODO
                { id: makeId(), icon: 'edit', name: 'Edit details', callback: () => {openEditStation()} },
                { id: makeId(), icon: 'delete', name: 'Delete', callback: () => {onDeleteStation(station)} },   
                { id: makeId(), icon: 'new-playlist', name: 'Create playlist', callback: () => {} }, // TODO
                { id: makeId(), icon: 'add', name: 'Create folder', callback: () => {} }, // TODO
                { id: makeId(), icon: 'private', name: 'Make private', callback: () => {} }, // TODO
                { id: makeId(), icon: 'folder', name: 'Move to folder', callback: () => {} }, // TODO - make a dropdown cmp
                { id: makeId(), icon: 'share', name: 'Share', callback: () => {} },
            ]
        }
        else {
            const isLiked = user.stations.includes(station._id)
            const isPinned = false
            if (station.type === 'station') {
                actions = [
                    {
                        id: makeId(),
                        icon: 'queue',
                        name: 'Add to queue',
                        callback: () => {},
                        border: true,
                    }, // TODO
                    isLiked && {
                        id: makeId(),
                        icon: 'profile',
                        name: 'Add to profile',
                        callback: () => {},
                        border: true,
                    }, // TODO
                    {
                        id: makeId(),
                        icon: 'remove',
                        name: 'Remove from Your Library',
                        callback: () => onRemoveStation(station),
                        border: true,
                    },
                    {
                        id: makeId(),
                        icon: 'new-playlist',
                        name: 'Create playlist',
                        callback: () => {},
                    }, // TODO
                    {
                        id: makeId(),
                        icon: 'add',
                        name: 'Create folder',
                        callback: () => {},
                        border: true,
                    }, // TODO
                    {
                        id: makeId(),
                        icon: 'folder',
                        name: 'Move to folder',
                        callback: () => {},
                    }, // TODO
                    isPinned
                        ? {
                              id: makeId(),
                              icon: 'unpin',
                              name: 'Unpin playlist',
                              callback: ({ station }) => onPinStation(station),
                          } // TODO
                        : {
                              id: makeId(),
                              icon: 'pin',
                              name: 'Pin playlist',
                              callback: ({ station }) => onPinStation(station),
                          }, // TODO
                    {
                        id: makeId(),
                        icon: 'share',
                        name: 'Share',
                        callback: () => {},
                    }, // TODO
                ]
            }
        }
        openContextMenu({
            x,
            y,
            context,
            actions,
        })
    }

    function onPinStation(station) {}

    function onRemoveStation(station) {
        toggleLikedStation(station)
    }

    async function onDeleteStation(station){
        toggleLikedStation(station)
        await removeStation(station._id)
        if(currentStation._id === station._id){
            navigate('/')
        }
    }

    function toggleSidebar() {
        
    }

    useEffectUpdate(() => {
        if (!user || !user?.stations) {
            return
        }
        
        loadSidebarStations(filterBy) 
    }, [filterBy])

    useEffect(() => {
        if (!user || !user?.stations) {
            return
        }
        setFilterBy((prev) => ({
            ...prev,
            stationsId: user.stations,
        }))
    }, [user?.stations])

    
    return (
        <div className="route-scroll sidebar-scroll">
            <aside
                className={`sidebar-container ${isOpen ? 'open' : 'closed'}`}
            >
                <header className="sidebar-actions">
                    <SideBarHeader user={user} toggleSidebar={toggleSidebar}/>
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
