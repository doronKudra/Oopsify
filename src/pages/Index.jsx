import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadStations } from '../store/actions/station.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { stationService } from '../services/station/index.js'
import { userService } from '../services/user/index.js'

import { StationList } from '../cmps/StationList.jsx'
import { StationFilter } from '../cmps/StationFilter.jsx'


export function Index() {

    const [ filterBy, setFilterBy ] = useState(stationService.getDefaultFilter())
    const stations = useSelector(storeState => storeState.stationModule.stations)

    useEffect(() => {
        loadStations(filterBy)
    }, [filterBy])



    return (
        <main className="station-index">
            <header>
                <h2>Stations</h2>
            </header>
            <StationFilter filterBy={filterBy} setFilterBy={setFilterBy} />
            <StationList 
                stations={stations}
                isMain={true}
                onRemoveStation={() => {}}
                onUpdateStation={() => {}} />
        </main>
    )
}