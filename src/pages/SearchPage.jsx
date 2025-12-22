import { useEffect, useRef, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { spotifyService } from "../services/spotifyService.js"
import { SearchStation } from "../cmps/searchItems/SearchStation.jsx"
import { TrackPreview } from "../cmps/TrackPreview.jsx"


export function SearchPage() {
    const [items, setItems] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [isLoading, setIsLoading] = useState(false)
    const [currentType, setCurrentType] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const filterBy = { txt: searchParams.get('txt'), type: searchParams.get('type') }
        if (filterBy.txt && filterBy.type) {
            setIsLoading(true)
            onSearch(filterBy)
        } else {
            navigate('/genres')
        }
    }, [searchParams])

    async function onSearch(filterBy) {
        setIsLoading(false)
        setItems(await spotifyService.search(filterBy.txt, filterBy.type))
        setCurrentType(filterBy.type)
        setIsLoading(false)
    }

    function onType(newType) {
        navigate(`/search?txt=${encodeURIComponent(searchParams.get('txt') || '')}&type=${newType}`)
    }

    function onArtist(id) {
        console.log('id:', id)
    }


    if (isLoading) return (
        <div className="Loading">
            <h1>Loading...</h1>
        </div>
    )
    if (!items && !items.length) return (
        <div className="Loading">
            <h1>No Match...</h1>
        </div>
    )
    return (
        <section className="search-page">
            <div className="search-type">
                <button className={searchParams.get('type') === 'track' ? 'type-active' : ''} onClick={() => onType('track')}>Tracks</button>
                <button className={searchParams.get('type') === 'station' ? 'type-active' : ''} onClick={() => onType('station')}>Stations</button>
                <button className={searchParams.get('type') === 'album' ? 'type-active' : ''} onClick={() => onType('album')}>Albums</button>
                <button className={searchParams.get('type') === 'artist' ? 'type-active' : ''} onClick={() => onType('artist')}>Artists</button>
            </div>
            <div className="track-container">
                {items && items.length && currentType === 'track' ?
                    items.map((track, idx) => (
                        <TrackPreview key={track.id} track={track} isLiked={true} idx={idx} />
                    ))
                    : <div> No Results </div>
                }
            </div>
            {currentType === 'station' && <SearchStation items={items} />}
        </section>
    )
}
