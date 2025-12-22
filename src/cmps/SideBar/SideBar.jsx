import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SideBarHeader } from './SideBarHeader.jsx';
import { SideBarFilter } from './SideBarFilter.jsx';
import { StationList } from '../StationList.jsx';
import { stationService } from '../../services/station/index.js'
import { loadStations, addStation, updateStation, removeStation } from '../../store/actions/station.actions.js'
import { LikedTracks} from '../LikedTracks.jsx'
import { store } from '../../store/store.js'

export function SideBar() {
    const user = useSelector(storeState => storeState.userModule.user)
    const [filterBy, setFilterBy] = useState({...stationService.getDefaultFilter(), likedStations:user.likedStations})
    const allStations = useSelector(storeState => storeState.stationModule.stations)
    var stations = {...allStations}
    
    useEffect(() => {
        loadStations(filterBy)
    }, [filterBy])

    // useEffect(() => {

    // })
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