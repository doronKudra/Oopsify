import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { tracks } from '../services/track/track.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import {
    loadStation,
    updateStation,
    addTrackToStation,
    removeTrackFromStation,
} from '../store/actions/station.actions'
import { getDemoStation } from '../services/track/track.service.js'
import { TrackList } from './TrackList.jsx'
import { StationControls } from './StationControls.jsx'
import { FastAverageColor } from 'fast-average-color'
import { DndContext } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import {
    makeId,
    mixHex,
    formatSpotifyDuration,
} from '../services/util.service.js'
import { SearchInDetails } from './SearchInDetails.jsx'
import { useContextMenu } from './OptionMenuProvider.jsx'

import {
    toggleLikedStation,
    updateUserLikedTracks,
    updateUser,
    toggleLiked,
} from '../store/actions/user.actions.js'

export function StationDetails() {
    const { stationId } = useParams()

    const user = useSelector((store) => store.userModule.user)

    const stationFromStore = useSelector((store) => store.stationModule.station)

    const station =
        stationId === 'liked-songs' ? user.likedTracks : stationFromStore
    const { openContextMenu } = useContextMenu()

    function handleOpenMenu({ x, y, context }) {
        const { track } = context
        const isInStation = station.tracks.some(({ id }) => id === track.id)
        const isLiked = user.likedTracks.tracks.some(({ id }) => id === track.id)
        let actions
        if (station.id === 'liked-songs' || station.owner.id === user.id) {
            actions = [
                !isInStation && {
                    id: makeId(),
                    icon: 'add',
                    name: 'Add to playlist',
                    callback: () => {
                        onAddToStation(track)
                    },
                }, // TODO (add to a different playlist) dropdown
                isInStation && {
                    id: makeId(),
                    icon: 'remove',
                    name: 'Remove from This Playlist',
                    callback: () => onRemoveFromStation(track),
                },
                isLiked
                    ? {
                        id: makeId(),
                        icon: 'remove',
                        name: 'Remove from your Liked Songs',
                        callback: () => onToggleLiked(track),
                    }
                    : {
                        id: makeId(),
                        icon: 'save',
                        name: 'Save to your Liked Songs',
                        callback: () => onToggleLiked(track),
                    },
                {
                    id: makeId(),
                    icon: 'queue',
                    name: 'Add to queue',
                    callback: () => { },
                }, // TODO
                {
                    id: makeId(),
                    icon: 'radio',
                    name: 'Go to song radio',
                    callback: () => { },
                }, // TODO
                {
                    id: makeId(),
                    icon: 'artist',
                    name: 'Go to artist',
                    callback: () => { },
                }, // TODO
                {
                    id: makeId(),
                    icon: 'album',
                    name: 'Go to album',
                    callback: () => { },
                }, // TODO - make a dropdown cmp
                {
                    id: makeId(),
                    icon: 'share',
                    name: 'Share',
                    callback: () => { },
                }, // TODO
            ]
        } else {
            if (station.type === 'station') {
                actions = [
                    {
                        id: makeId(),
                        icon: 'add',
                        name: 'Add to playlist',
                        callback: () => onAddToStation(track),
                    }, // TODO (add to a different playlist) dropdown
                    isLiked
                        ? {
                            id: makeId(),
                            icon: 'remove',
                            name: 'Remove from your Liked Songs',
                            callback: () => onToggleLiked(track),
                        }
                        : {
                            id: makeId(),
                            icon: 'save',
                            name: 'Save to your Liked Songs',
                            callback: () => onToggleLiked(track),
                        },
                    {
                        id: makeId(),
                        icon: 'queue',
                        name: 'Add to queue',
                        callback: () => { },
                    }, // TODO
                    {
                        id: makeId(),
                        icon: 'radio',
                        name: 'Go to song radio',
                        callback: () => { },
                    }, // TODO
                    {
                        id: makeId(),
                        icon: 'artist',
                        name: 'Go to artist',
                        callback: () => { },
                    }, // TODO
                    {
                        id: makeId(),
                        icon: 'album',
                        name: 'Go to album',
                        callback: () => { },
                    }, // TODO - make a dropdown cmp
                    {
                        id: makeId(),
                        icon: 'share',
                        name: 'Share',
                        callback: () => { },
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

    function onStationRightClick(ev, station) {
        ev.preventDefault()
        ev.stopPropagation()

        handleOpenMenuStation({
            x: ev.clientX,
            y: ev.clientY,
            context: { station },
        })
    }

    function handleOpenMenuStation({ x, y, context }) {
        const { station } = context
        let actions
        if (station.owner.id === user.id) {
            actions = [
                {
                    id: makeId(),
                    icon: 'queue',
                    name: 'Add to queue',
                    callback: () => { },
                }, // TODO
                {
                    id: makeId(),
                    icon: 'profile',
                    name: 'Add to profile',
                    callback: () => { },
                },
                {
                    id: makeId(),
                    icon: 'edit',
                    name: 'Edit details',
                    callback: () => { },
                }, // TODO
                {
                    id: makeId(),
                    icon: 'delete',
                    name: 'Delete',
                    callback: () => { },
                }, // TODO
                {
                    id: makeId(),
                    icon: 'private',
                    name: 'Make private',
                    callback: () => { },
                }, // TODO
                {
                    id: makeId(),
                    icon: 'folder',
                    name: 'Move to folder',
                    callback: () => { },
                }, // TODO - make a dropdown cmp
                {
                    id: makeId(),
                    icon: 'share',
                    name: 'Share',
                    callback: () => { },
                }, // TODO
            ]
        } else {
            const isLiked = user.likedStations.includes(station.id)
            if (station.type === 'station') {
                actions = [
                    isLiked
                        ? {
                            id: makeId(),
                            icon: 'remove',
                            name: 'Remove from Your Library',
                            callback: () => onRemoveStation(station),
                        }
                        : {
                            id: makeId(),
                            icon: 'save',
                            name: 'Add to Your Library',
                            callback: () => onAddStation(station),
                        },
                    {
                        id: makeId(),
                        icon: 'queue',
                        name: 'Add to queue',
                        callback: () => { },
                    }, // TODO
                    isLiked && {
                        id: makeId(),
                        icon: 'profile',
                        name: 'Add to profile',
                        callback: () => { },
                    }, // TODO
                    {
                        id: makeId(),
                        icon: 'folder',
                        name: isLiked ? 'Move to folder' : 'Add to folder',
                        callback: () => { },
                    }, // TODO
                    {
                        id: makeId(),
                        icon: 'share',
                        name: 'Share',
                        callback: () => { },
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

    function onAddStation(station) {
        toggleLikedStation(station.id)
    }

    function onRemoveStation(station) {
        toggleLikedStation(station.id)
    }

    async function onAddToStation(track) {
        if (stationId === 'liked-songs') {
            await toggleLiked(track)
        }
        else {
            const updatedTracks = [...localTracks, track]
            setLocalTracks(updatedTracks)
            await addTrackToStation(station.id, track)
        }
    }

    async function onRemoveFromStation(track) {
        if (stationId === 'liked-songs') {
            await toggleLiked(track)
        }
        else {
            const updatedTracks = localTracks.filter((t) => t.id !== track.id)
            setLocalTracks(updatedTracks)
            await removeTrackFromStation(station, track.id)
        }
    }

    async function onToggleLiked(track) {
        await toggleLiked(track)
    }

    useEffect(() => {
        if (stationId !== 'liked-songs') {
            loadStation(stationId)
        }
    }, [stationId])

    const [localTracks, setLocalTracks] = useState([])
    useEffect(() => {
        if (station?.tracks) {
            setLocalTracks(station.tracks)
        }
    }, [station])

    const tempIdsRef = useRef([])
    if (tempIdsRef.current.length !== localTracks.length) {
        tempIdsRef.current = localTracks.map(() => makeId())
    }

    const [bgColor, setBgColor] = useState({ hex: '#121212' })

    const albumCoverArt =
        station?.images?.[0]?.url || station?.tracks?.[0]?.images?.[0]?.url

    useEffect(() => {
        if (!albumCoverArt) return
        async function fetchColor() {
            try {
                const fac = new FastAverageColor()
                const color = await fac.getColorAsync(albumCoverArt)
                setBgColor(color)
            } catch (err) {
                console.error('Error getting average color:', err)
            }
        }
        fetchColor()
    }, [albumCoverArt])

    if (!station) return <div>Loading...</div>

    const stationDurationMs = station.tracks.reduce(
        (sum, t) => sum + (t.duration_ms || 0),
        0
    )
    console.log('stationDurationMs:', stationDurationMs)
    const stationDuration = formatSpotifyDuration(stationDurationMs)

    async function handleDragEnd(event) {
        const { active, over } = event
        if (!over || active.id === over.id) return

        const oldIndex = tempIdsRef.current.indexOf(active.id)
        const newIndex = tempIdsRef.current.indexOf(over.id)

        const newTrackOrder = arrayMove(localTracks, oldIndex, newIndex)
        // 1. Update UI immediately
        setLocalTracks(newTrackOrder)

        // 2. Update temp IDs
        tempIdsRef.current = arrayMove(tempIdsRef.current, oldIndex, newIndex)

        // 3. Persist to backend + Redux
        const updatedStation = {
            ...station,
            tracks: newTrackOrder,
        }
        await updateStation(updatedStation)
    }

    const isStation = station?.type === 'station'

    const dominant = bgColor.hex
    const base = '#121212'

    const colorStop1 = mixHex(dominant, base, 0.4)
    const colorStop2 = mixHex(dominant, base, 0.6)
    const colorStop3 = mixHex(dominant, base, 0.8)

    console.log('user:', user)
    return (
        <>
            <DndContext onDragEnd={handleDragEnd}>
                <section className="station-details">
                    <section
                        className="station-header"
                        style={{
                            background: `linear-gradient( to bottom, ${dominant} 0%, ${colorStop1} 100% )`,
                        }}
                    >
                        <div className="cover-container">
                            <img src={albumCoverArt} alt="Cover" />
                        </div>
                        <div className="station-header-title">
                            <p className="header-type">
                                {isStation ? 'Public Playlist' : 'Album'}
                            </p>

                            <h1
                                onContextMenu={(ev) =>
                                    onStationRightClick(ev, station)
                                }
                            >
                                {station.name}
                            </h1>

                            <div className="station-header-info">
                                {isStation ? (
                                    <>
                                        <span className="enhance">
                                            {user.fullName}
                                        </span>
                                        <span> • </span>
                                        <span>2025</span>
                                        <span> • </span>
                                        <span>{stationDuration}</span>
                                    </>
                                ) : (
                                    <>
                                        <img
                                            src={station?.artist?.img}
                                            alt={station?.artist?.name}
                                            className="artist-img"
                                        />
                                        <span>{station?.artist?.name}</span>
                                        <span> • </span>
                                        <span>{station.year}</span>
                                        <span> • </span>
                                        <span>{stationDuration}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </section>

                    <div
                        style={{
                            background: `linear-gradient( to bottom, ${colorStop2} 0%, ${colorStop3} 100% )`,
                        }}
                    >
                        <StationControls
                            openContextMenu={handleOpenMenuStation}
                            station={station}
                        />
                    </div>
                    <div
                        style={{
                            background: `linear-gradient( to bottom, ${colorStop3} 0px, ${base} 100px, ${base} 100% )`,
                        }}
                    >
                        <TrackList
                            openContextMenu={handleOpenMenu}
                            tracks={localTracks}
                            tempIdsRef={tempIdsRef}
                            user={user}
                            isStation={isStation}
                        />
                    </div>
                    <SearchInDetails
                        openContextMenu={handleOpenMenu}
                        tracks={localTracks}
                    />
                </section>
            </DndContext>
        </>
    )
}
