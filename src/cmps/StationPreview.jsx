import { Link } from 'react-router-dom'

export function StationPreview({ station, listType }) {
    return (<DynamicCmp station={station} listType={listType} />)
}

function DynamicCmp({station ,listType}) {
    switch (listType) {
        case 'favorites': // small image, pinned, type, creator (for liked tracks show number of tracks)
            return <Link to={`/station/${station._id}`}><article className="preview">
                <header>
                    {station.name}
                </header>

                {station.createdBy && <p>Owner: <span>{station.createdBy.fullname}</span></p>}

            </article></Link>

        case 'index': // bigger image, title -> description -> name of artists (if no title show desc, if no desc show artists names)
            return 
        case 'recent': // small image, title
            return 
    }
}