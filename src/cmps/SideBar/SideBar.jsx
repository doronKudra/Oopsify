import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SideBarHeader } from './SideBarHeader.jsx';
import { SideBarFilter } from './SideBarFilter.jsx';
import { StationList } from '../StationList.jsx';
import { stationService } from '../../services/station/index.js'
import { loadStations, addStation, updateStation, removeStation, addStationMsg } from '../../store/actions/station.actions.js'
import { LikedTracks} from '../LikedTracks.jsx'

export function SideBar() {
    const dispatch = useDispatch()
    const user = useSelector(storeState => storeState.userModule.user)
    const [filterBy, setFilterBy] = useState({...stationService.getDefaultFilter(), likedStations: user.likedStations})
    const allStations = useSelector(storeState => storeState.stationModule.stations)
    var stations = {...allStations}
    
    useEffect(() => {
        dispatch(loadStations(filterBy))
    }, [filterBy, dispatch])

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