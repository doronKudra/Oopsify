import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'

export function SideBarFilter() {
    return (
        <div>
            <section className="cat-filter">
                <button className="filter">Playlists</button>
                <button className="filter">Artists</button>
                <button className="filter">Albums</button>
                <button className="filter">Podcasts&Shows</button>
            </section>
        </div>
    )
}
