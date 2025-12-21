import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { SideBarHeader } from './SideBarHeader.jsx';
import { SideBarFilter } from './SideBarFilter.jsx';
import { StationList } from '../StationList.jsx';
import { stationService } from '../../services/station/index.js'
import { loadStations, addStation, updateStation, removeStation, addStationMsg } from '../../store/actions/station.actions.js'
import { LikedTracks} from '../LikedTracks.jsx'

export function SideBar() {

    const [filterBy, setFilterBy] = useState(stationService.getDefaultFilter())
    const stations = useSelector(storeState => storeState.stationModule.stations)
    const user = useSelector(storeState => storeState.userModule.user)

    useEffect(() => {
        loadStations(filterBy)
    }, [filterBy])

    return (
        <aside className='sidebar-container'>
            <header className='sidebar-actions'>
                <SideBarHeader />
                <SideBarFilter />
            </header>
            <LikedTracks user={user} listType={'favorites'}/>
            <StationList stations={stations}
                listType={'favorites'}
            />
        </aside>
    )
}