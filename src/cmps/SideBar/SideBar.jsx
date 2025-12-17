import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { SideBarHeader } from './SideBarHeader.jsx';
import { SideBarFilter } from './SideBarFilter.jsx';
import { StationList } from '../StationList.jsx';

export function SideBar() {

    return (
        <aside>
            <SideBarHeader/>
            <SideBarFilter/>
            <StationList/>
        </aside>
    )
}