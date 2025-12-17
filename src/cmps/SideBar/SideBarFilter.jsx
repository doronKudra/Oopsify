import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'

export function SideBarFilter() {
    return (
        <div>
            <section className="cat-filter">
                <button class="filter">Playlists</button>
                <button class="filter">Artists</button>
                <button class="filter">Albums</button>
                <button class="filter">Podcasts&Shows</button>
            </section>
        </div>
    )
}
