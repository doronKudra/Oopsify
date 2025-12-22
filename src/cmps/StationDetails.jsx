import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { tracks } from '../services/track/track.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadStation, updateStation } from '../store/actions/station.actions'
import { getDemoStation } from '../services/track/track.service.js'
import { TrackList } from './TrackList.jsx'
import { StationControls } from './StationControls.jsx'
import { FastAverageColor } from 'fast-average-color'
import { DndContext } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { makeId } from '../services/util.service.js'

import {
    updateUserLikedTracks,
    updateUser,
} from '../store/actions/user.actions.js'

export function StationDetails() {
    const { stationId } = useParams()

    const user = useSelector((store) => store.userModule.user)
    const likedTracks = user?.likedTracks?.tracks || []

    const stationFromStore = useSelector((store) => store.stationModule.station)

    const station =
        stationId === 'liked-songs' ? user.likedTracks : stationFromStore

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

    async function onToggleLiked(clickedTrack) {
        const isLiked = likedTracks.some(
            (track) => track.id === clickedTrack.id
        )
        let updatedTracks

        if (isLiked) {
            updatedTracks = likedTracks.filter(
                (track) => track.id !== clickedTrack.id
            )
        } else {
            updatedTracks = [...likedTracks, clickedTrack]
        }
        updateUserLikedTracks(updatedTracks)
        const userToUpdate = {
            ...user,
            likedTracks: { ...user.likedTracks, tracks: updatedTracks },
        }
        await updateUser(userToUpdate)
    }

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
        <DndContext onDragEnd={handleDragEnd}>
            <section
                className="station-details"
                style={{
                    background: `linear-gradient(
        to bottom,
        ${bgColor.hex} 0%,
        #121212 15%,
        #121212 100%
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

                <StationControls station={station} />
                <TrackList
                    tracks={localTracks}
                    tempIdsRef={tempIdsRef}
                    durationMs={stationDuration}
                    user={user}
                    onToggleLiked={onToggleLiked}
                />
            </section>
        </DndContext>
    )
}
