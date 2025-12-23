import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { tracks } from '../services/track/track.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadStation, updateStation, addTrackToStation, removeTrackFromStation } from '../store/actions/station.actions'
import { getDemoStation } from '../services/track/track.service.js'
import { TrackList } from './TrackList.jsx'
import { StationControls } from './StationControls.jsx'
import { FastAverageColor } from 'fast-average-color'
import { DndContext } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { makeId } from '../services/util.service.js'
import { SearchInDetails } from './SearchInDetails.jsx'
import { useContextMenu } from './OptionMenuProvider.jsx'

import {
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
        const actions = [
            (isInStation ?
                { id: makeId(), name: 'Remove from Playlist', callback: () => onRemoveFromStation(track) }
                : { id: makeId(), name: 'Add to Playlist', callback: () => onAddToStation(track) })
        ]
        openContextMenu({
            x,
            y,
            context,
            actions
        })
    }

    async function onAddToStation(track) {
        const updatedTracks = [...localTracks, track]
        setLocalTracks(updatedTracks)
        await addTrackToStation(station, track) 
    }

    async function onRemoveFromStation(track) {
        const updatedTracks = localTracks.filter(t => t.id !== track.id)
        setLocalTracks(updatedTracks)
        await removeTrackFromStation(station, track.id)
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

    const stationDuration = station.tracks.reduce(
        (sum, t) => sum + (t.duration_ms || 0),
        0
    )

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

    return (
        <>
            <DndContext onDragEnd={handleDragEnd}>
                <section
                    className="station-details"
                    style={{
                        background: `linear-gradient(
                                    to bottom,
                                    ${bgColor.hex} 0%,
                                    ${bgColor.hex + '80'} 284px,
                                    ${bgColor.hex + '50'} 284px,
                                    #121212 500px
                                    )`,
                    }}
                >
                    <section className="station-header">
                        <img src={albumCoverArt} alt="Cover" />
                        <div className="station-header-title">
                            <p>Album</p>
                            <h1>{station.name}</h1>
                            <div className="station-header-info">
                                <h4>
                                    {[
                                        station.artist && station.artist,
                                        station.year || 2002,
                                        `${localTracks.length} Songs`,

                                        `${Math.floor(
                                            stationDuration / 60000
                                        )} min`,
                                    ]
                                        .filter(Boolean)
                                        .join(' • ')}
                                </h4>
                            </div>
                        </div>
                    </section>

                    <StationControls openContextMenu={handleOpenMenu} station={station} />
                    <TrackList
                        openContextMenu={handleOpenMenu}
                        tracks={localTracks}
                        tempIdsRef={tempIdsRef}
                        durationMs={stationDuration}
                        user={user}
                    />
                    <SearchInDetails openContextMenu={handleOpenMenu} tracks={localTracks} />
                </section>
            </DndContext>
        </>
    )
}
