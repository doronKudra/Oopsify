import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { tracks } from '../services/track/track.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadStation, addStationMsg } from '../store/actions/station.actions'
import { getDemoStation } from '../services/track/track.service.js'
import { TrackList } from './TrackList.jsx'
import { StationControls } from './StationControls.jsx'
import { FastAverageColor } from 'fast-average-color'

export function StationDetails() {
    const dispatch = useDispatch()
    const { stationId } = useParams()

    const station = useSelector((store) => store.stationModule.station)

    useEffect(() => {
        dispatch(loadStation(stationId))
    }, [stationId, dispatch])

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

    return (
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
                        <h4>{`${station.artist} • ${station.year || 2002} • ${
                            station.tracks.length
                        } Songs, ${Math.floor(
                            stationDuration / 60000
                        )} min`}</h4>
                    </div>
                </div>
            </section>

            <StationControls station={station} />
            <TrackList station={station} durationMs={stationDuration} />
        </section>
    )
}

{
    /* <button
                onClick={() => {
                    onFavoriteStationMsg(station._id)
                }}
            >
                ♡
            </button> */
}
