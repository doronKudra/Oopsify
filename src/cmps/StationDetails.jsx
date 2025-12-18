import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { tracks } from '../services/track/track.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadStation, addStationMsg } from '../store/actions/station.actions'
import { getDemoStation } from '../services/track/track.service.js'
import { StationList } from './StationList.jsx'
import { StationControls } from './StationControls.jsx'
import { FastAverageColor } from 'fast-average-color'

export function StationDetails() {
    const { stationId } = useParams()
    const station = useSelector(
        (storeState) => storeState.stationModule.station
    )

    console.log('station:', station)
    useEffect(() => {
        loadStation(stationId)
    }, [stationId])

    const demoStation = getDemoStation()
    console.log('demoStation:', demoStation)

    const stationDuration = Math.floor(
        demoStation.tracks.reduce(
            (sum, track) => sum + (track.duration_ms || 0),
            0
        ) / 60000
    )

    // const avgColor = new FastAverageColor()

    // async function fetchColor() {
    //   if (!station?.cover_art) return
    //   try {
    //     const color = await fac.getColorAsync(station.cover_art)
    //     setAvgColor(color.hex)
    //   } catch (err) {
    //     console.error('Error getting average color:', err)
    //   }

    const fac = new FastAverageColor()
    fac.getColorAsync(container.querySelector('img'))
        .then((color) => {
            container.style.backgroundColor = color.rgba
            container.style.color = color.isDark ? '#fff' : '#000'
        })
        .catch((e) => {
            console.log(e)
        })

    return (
        <section className="station-details">
            <Link to="/">Go Back</Link>
            <section className="station-header">
                <img src={demoStation.cover_art} alt="Cover" />{' '}
                <div className="station-header-title">
                    <p>Album</p>
                    <h1>{demoStation.name}</h1>
                    <div className="station-header-info">
                        <h4>{`${demoStation.artist} * ${
                            demoStation.year || 2002
                        } * ${
                            demoStation.tracks.length
                        } Songs, ${stationDuration} min`}</h4>
                    </div>
                </div>
            </section>
            <button
                onClick={() => {
                    onFavoriteStationMsg(station._id)
                }}
            >
                ♡
            </button>
            <StationControls station={demoStation}></StationControls>
            <StationList station={demoStation} />{' '}
        </section>
    )
}

// async function onAddStationMsg(stationId) {
//     try {
//         await addStationMsg(
//             stationId,
//             'bla bla ' + parseInt(Math.random() * 10)
//         )
//         showSuccessMsg(`Station msg added`)
//     } catch (err) {
//         showErrorMsg('Cannot add station msg')
//     }
// }
