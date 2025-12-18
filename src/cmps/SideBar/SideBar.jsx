import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { SideBarHeader } from './SideBarHeader.jsx';
import { SideBarFilter } from './SideBarFilter.jsx';
import { StationList } from '../StationList.jsx';
import { stationService } from '../../services/station/index.js'
import { loadStations, addStation, updateStation, removeStation, addStationMsg } from '../../store/actions/station.actions.js'


export function SideBar() {

    const [filterBy, setFilterBy] = useState(stationService.getDefaultFilter())
    const stations = useSelector(storeState => storeState.stationModule.stations)

    useEffect(() => {
        loadStations(filterBy)
    }, [filterBy])

    async function onRemoveStation(stationId) {
        try {
            await removeStation(stationId)
            showSuccessMsg('Station removed')
        } catch (err) {
            showErrorMsg('Cannot remove station')
        }
    }

    async function onUpdateStation(station) {
        const name = +prompt('New name?', station.name) || 0
        if (name === '' || name === station.name) return

        const stationToSave = { ...station, name }
        try {
            const savedStation = await updateStation(stationToSave)
            showSuccessMsg(`Station updated, new name: ${savedStation.name}`)
        } catch (err) {
            showErrorMsg('Cannot update station')
        }
    }

    return (
        <aside>
            <SideBarHeader />
            <SideBarFilter />
            <StationList stations={stations}
                isMain={false}
                onRemoveStation={onRemoveStation}
                onUpdateStation={onUpdateStation}
            />
        </aside>
    )
}