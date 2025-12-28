// import { Link } from 'react-router-dom'
// import { tracks } from '../services/track/track.service.js'
// import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
// import { getDemoStation } from '../services/track/track.service.js'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { loadStation, loadLikedTracks, updateStation, addTrackToStation, removeTrackFromStation } from '../store/actions/station.actions'
import { TrackList } from './TrackList.jsx'
import { StationControls } from './StationControls.jsx'
import { FastAverageColor } from 'fast-average-color'
import { DndContext } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { makeId, mixHex, formatSpotifyDuration } from '../services/util.service.js'
import { SearchInDetails } from './SearchInDetails.jsx'
import { useContextMenu } from './OptionMenuProvider.jsx'
import { useModal } from './ModalProvider.jsx'
import { setUserStation } from '../store/actions/user.actions.js'
import { toggleLikedStation, toggleLikedTrack } from '../store/actions/user.actions.js'

export function StationDetails() {
    const { stationId } = useParams()
    console.log(stationId)
    const { openEditStation } = useModal()
    const user = useSelector((store) => store.userModule.user)
    const station = useSelector((store) => store.stationModule.station)
    const [tracks, setTracks] = useState([])
    const isOwner = (station?.owner?._id === user?._id)
    useEffect(() => {
        if (stationId !== 'liked-tracks') {
            loadStation(stationId) //updates the store's station
            console.log(station)
        } else {
            loadLikedTracks(stationId)
        }
    }, [stationId])

    useEffect(() => {
        if (station?.tracks) {
            setTracks(station.tracks) // updates the track's state
        }
    }, [station])



    // const station =
    // stationId === 'liked-songs' ? user.likedTracks : stationFromStore
    const { openContextMenu } = useContextMenu()


    function onAddStation(station) {
        toggleLikedStation(station)
    }

    function onRemoveStation(station) {
        toggleLikedStation(station)
    }

    async function onAddToStation(track) {
        if (stationId === 'liked-tracks') {
            await toggleLikedTrack(track)
        } else {
            const updatedTracks = [...tracks, track]
            setTracks(updatedTracks)
            await addTrackToStation(station._id, track)
        }
    }

    async function onRemoveFromStation(track) {
        if (stationId === 'liked-songs') {
            await toggleLikedTrack(track)
        } else {
            const updatedTracks = tracks.filter((t) => t._id !== track._id)
            setTracks(updatedTracks)
            await removeTrackFromStation(station, track._id)
        }
    }

    async function onToggleLiked(track) {
        await toggleLikedTrack(track)
    }


    const tempIdsRef = useRef([])
    if (tempIdsRef.current.length !== tracks.length) {
        tempIdsRef.current = tracks.map(() => makeId())
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

    if (!station) return <section className="station-details"></section>

    const stationDurationMs = station.tracks.reduce(
        (sum, t) => sum + (t.duration_ms || 0),
        0
    )
    const stationDuration = formatSpotifyDuration(stationDurationMs)

    async function handleDragEnd(event) {
        const { active, over } = event
        if (!over || active._id === over._id) return

        const oldIndex = tempIdsRef.current.indexOf(active._id)
        const newIndex = tempIdsRef.current.indexOf(over._id)

        const newTrackOrder = arrayMove(tracks, oldIndex, newIndex)
        // 1. Update UI immediately
        setTracks(newTrackOrder)

        // 2. Update temp IDs
        tempIdsRef.current = arrayMove(tempIdsRef.current, oldIndex, newIndex)

        // 3. Persist to backend + Redux
        const updatedStation = {
            ...station,
            tracks: newTrackOrder,
        }
        await setUserStation(updatedStation)
    }

    const isStation = station?.type === 'station'

    const dominant = bgColor.hex
    const base = '#121212'

    function handleOpenMenu({ x, y, context }) {
        const { track } = context
        if (!track) return
        const isInStation = station.tracks.some(({ id }) => id === track._id)
        const isLiked = user.likedTracks.tracks.some(({ id }) => id === track._id)
        let actions
        if (station._id === 'liked-tracks' || station.owner._id === user._id) {
            actions = [
                {
                    id: makeId(),
                    icon: 'add',
                    name: 'Add to playlist',
                    callback: () => { },
                    // children: stations.map(station => ({
                    //     id: makeId(),
                    //     icon: '',
                    //     name: station.name,
                    //     callback: () => addTrackToStation(station._id, track),
                    // }))
                }, // TODO (add to a different playlist) dropdown
                isInStation && isOwner && (station._id !== 'liked-tracks') && {
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
                    border: true,
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
                        callback: () => { },
                        // children: stations.map(station => ({
                        //     id: makeId(),
                        //     icon: 'add',
                        //     name: station.name,
                        //     callback: () => addTrackToStation(station._id, track),
                        // }))
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
                        border: true,
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
        if (station.owner._id === user._id) {
            actions = [
                {
                    id: makeId(),
                    icon: 'queue',
                    name: 'Add to queue',
                    callback: () => { },
                    border: true,
                }, // TODO
                {
                    id: makeId(),
                    icon: 'profile',
                    name: 'Add to profile',
                    callback: () => { },
                    border: true,
                },
                {
                    id: makeId(),
                    icon: 'edit',
                    name: 'Edit details',
                    callback: () => openEditStation(),
                }, // TODO
                {
                    id: makeId(),
                    icon: 'delete',
                    name: 'Delete',
                    callback: () => { },
                    border: true,
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
            const isLiked = user.likedStations.includes(station._id)
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
                        border: true,
                    }, // TODO
                    isLiked && {
                        id: makeId(),
                        icon: 'profile',
                        name: 'Add to profile',
                        callback: () => { },
                        border: true,
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
    const colorStop1 = mixHex(dominant, base, 0.4)
    const colorStop2 = mixHex(dominant, base, 0.6)
    const colorStop3 = mixHex(dominant, base, 0.8)

    return (
        <>
            <DndContext onDragEnd={handleDragEnd}>
                <section className="station-details">
                    <section
                        className="station-header station-owner-header"
                        style={{
                            '--avgColor': dominant,
                            // background: `linear-gradient( to bottom, ${dominant} 0%, ${colorStop1} 100% )`,
                        }}
                        onClick={() => openEditStation()}
                    >
                        <img className='details-track-image' src={albumCoverArt} alt="Cover" />
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
                                            {station.owner.fullname}
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

                    {/* <div
                        style={{
                            background: `linear-gradient( to bottom, ${colorStop2} 0%, ${colorStop3} 100% )`,
                        }}
                    > */}
                    <StationControls
                        openContextMenu={handleOpenMenuStation}
                        station={station}
                    />
                    {/* </div> */}
                    {/* <div
                        style={{
                            background: `linear-gradient( to bottom, ${colorStop3} 0px, ${base} 100px, ${base} 100% )`,
                        }}
                    > */}
                    <TrackList
                        openContextMenu={handleOpenMenu}
                        tracks={tracks}
                        tempIdsRef={tempIdsRef}
                        isStation={isStation}
                        isOwner={isOwner}
                    />
                    {/* </div> */}
                    {
                        station?.owner?._id === user?._id &&
                        <SearchInDetails openContextMenu={handleOpenMenu} tracks={tracks.length ? true : false} station={station} user={user} />
                    }
                </section>
            </DndContext>
        </>
    )
}
