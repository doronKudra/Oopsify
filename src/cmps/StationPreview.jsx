import { Link } from 'react-router-dom'

export function StationPreview({ station }) {
    return <article className="preview">
        <header>
            <Link to={`/station/${station._id}`}>{station.name}</Link>
        </header>
        
        {station.createdBy && <p>Owner: <span>{station.createdBy.fullname}</span></p>}
        
    </article>
}