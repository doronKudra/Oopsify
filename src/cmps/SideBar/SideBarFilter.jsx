import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'

export function SideBarFilter() {
    return (
        <div>
            <section className="sidebar-filter-container">
                <button className="sidebar-filter">Playlists</button>
                <button className="sidebar-filter">Artists</button>
                <button className="sidebar-filter">Albums</button>
            </section>
        </div>
    )
}
