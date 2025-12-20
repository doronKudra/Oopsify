import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loadStations } from '../store/actions/station.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { stationService } from '../services/station/index.js'
import { userService } from '../services/user/index.js'

import { StationList } from '../cmps/StationList.jsx'
import { FastAverageColor } from 'fast-average-color'
// import { StationFilter } from '../cmps/StationFilter.jsx'


export function StationIndex() {
    const dispatch = useDispatch()

    const [filterBy, setFilterBy] = useState(stationService.getDefaultFilter())
    const stations = useSelector(storeState => storeState.stationModule.stations)

    const [bgColor, setBgColor] = useState({ hex: '#3f3f3fff' })

    useEffect(() => {
        dispatch(loadStations(filterBy))
    }, [filterBy, dispatch])

    return (
        <main className="station-index" style={{
            background: `linear-gradient(to bottom, ${bgColor.hex}, #121212)`,
        }}>
            {/* <StationFilter filterBy={filterBy} setFilterBy={setFilterBy} /> */}
            <StationList
                stations={stations}
                listType={'recent'} />
            <StationList
                stations={stations}
                listType={'explore'} />
        </main>
    )
}