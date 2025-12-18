import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { tracks } from '../services/track/track.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadStation, addStationMsg } from '../store/actions/station.actions'
import { getDemoStation } from '../services/track/track.service.js'
import { TrackList } from './TrackList.jsx'
import { StationControls } from './StationControls.jsx'
import { FastAverageColor } from 'fast-average-color'

export function StationDetails() {
    const demoStation = getDemoStation()
    const { stationId } = useParams()
    const station = useSelector(
        (storeState) => storeState.stationModule.station
    )

    const [bgColor, setBgColor] = useState({ hex: '#121212' })

    useEffect(() => {
        async function fetchColor() {
            if (!demoStation.cover_art) return
            try {
                const fac = new FastAverageColor()
                const color = await fac.getColorAsync(demoStation.cover_art)
                setBgColor(color)
            } catch (err) {
                console.error('Error getting average color:', err)
            }
        }
        fetchColor()
    }, [demoStation?.cover_art])

    // useEffect(() => {
    //     loadStation(stationId)
    // }, [stationId])

    const stationDuration = Math.floor(
        demoStation.tracks.reduce(
            (sum, track) => sum + (track.duration_ms || 0),
            0
        ) / 60000
    )

    return (
        <section
            className="station-details"
            style={{
                background: `linear-gradient(to bottom, ${bgColor.hex}, #121212)`,
            }}
        >
            <section className="station-header">
                <img src={demoStation.cover_art} alt="Cover" />{' '}
                <div className="station-header-title">
                    <p>Album</p>
                    <h1>{demoStation.name}</h1>
                    <div className="station-header-info">
                        <h4>{`${demoStation.artist} • ${
                            demoStation.year || 2002
                        } • ${
                            demoStation.tracks.length
                        } Songs, ${stationDuration} min`}</h4>
                    </div>
                </div>
            </section>
            {/* <button
                onClick={() => {
                    onFavoriteStationMsg(station._id)
                }}
            >
                ♡
            </button> */}
            <StationControls station={demoStation}></StationControls>
            <TrackList station={demoStation} />{' '}
        </section>
    )
}