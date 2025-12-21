import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { addStation } from '../../store/actions/station.actions.js'
import { userService } from '../../services/user'

export function SideBarHeader() {
    
    function onAddStation(){
        addStation(userService.getLoggedinUser())
    }

    return (
        <div className='sidebar-header'>
            <header className='sidebar-header-title'>Your Library</header>
            <div className='sidebar-header-buttons-container'>
                <button className='sidebar-create-station' onClick={onAddStation}>
                    <svg data-encore-id="icon" role="img" aria-hidden="true" className="sidebar-create-station-icon icon-small" viewBox="0 0 16 16">
                        <path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75"></path>
                        </svg>
                    <span>Create</span>
                    </button>
                <button className='sidebar-expand'>
                    <svg className="sidebar-expand-icon icon-small" data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16">
                        <path d="M6.53 9.47a.75.75 0 0 1 0 1.06l-2.72 2.72h1.018a.75.75 0 0 1 0 1.5H1.25v-3.579a.75.75 0 0 1 1.5 0v1.018l2.72-2.72a.75.75 0 0 1 1.06 0zm2.94-2.94a.75.75 0 0 1 0-1.06l2.72-2.72h-1.018a.75.75 0 1 1 0-1.5h3.578v3.579a.75.75 0 0 1-1.5 0V3.81l-2.72 2.72a.75.75 0 0 1-1.06 0"></path>
                        </svg>
                </button>
            </div>
        </div>
    )
}