import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'

export function SideBarHeader() {

    return (
        <div className='side-header'>
            <header>Your Library</header>
            <button className='side-create-station'>+ Create</button>
            <button className='side-expand'>Expand</button>
        </div>
    )
}