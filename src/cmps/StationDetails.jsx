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
    const demoStation = getDemoStation()
    const { stationId } = useParams()
    const station = useSelector(
        (storeState) => storeState.stationModule.stations
    )

    useEffect(() => {
        dispatch(loadStation(stationId))
        console.log('station:', station)
    }, [stationId, dispatch])

    // if (!station) return <div>Loading...</div>

    const [bgColor, setBgColor] = useState({ hex: '#121212' })

    // useEffect(() => {
    //     async function fetchColor() {
    //         if (!station.cover_art) return
    //         try {
    //             const fac = new FastAverageColor()
    //             const color = await fac.getColorAsync(station.cover_art)
    //             setBgColor(color)
    //         } catch (err) {
    //             console.error('Error getting average color:', err)
    //         }
    //     }
    //     fetchColor()
    // }, [station?.cover_art])

    // const stationDuration = Math.floor(
    //     station.tracks.reduce(
    //         (sum, track) => sum + (track.duration_ms || 0),
    //         0
    //     ) / 60000
    // )

    return (
        <section
            className="station-details"
            style={{
                background: `linear-gradient(to bottom, ${bgColor.hex}, #121212)`,
            }}
        >
            {/* <section className="station-header">
                <img src={station.cover_art} alt="Cover" />{' '}
                <div className="station-header-title">
                    <p>Album</p>
                    <h1>{station.name}</h1>
                    <div className="station-header-info">
                        <h4>{`${station.artist} • ${station.year || 2002} • ${
                            station.tracks.length
                        } Songs, ${stationDuration} min`}</h4>
                    </div>
                </div>
            </section>
            <StationControls station={station}></StationControls>
            <TrackList station={station} />{' '} */}
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
