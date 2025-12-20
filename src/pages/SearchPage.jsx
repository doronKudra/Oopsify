import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { spotifyService } from "../services/spotifyService"


export function SearchPage() {
    const [items, setItems] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    console.log('searchParams:', searchParams)
    console.log('items:', items)
    useEffect(() => {
        const filterBy = { txt: searchParams.get('txt'), type: searchParams.get('type') }
        onSearch(filterBy)
    }, [searchParams])

    async function onSearch(filterBy) {
        if (!filterBy.txt || !filterBy.type) return console.log('filterBy is Empty:',filterBy)
        setItems(await spotifyService.search(filterBy.txt, filterBy.type))
    }

    if (!items) return (
        <div className="Loading">
            <h1>Loading...</h1>
        </div>
    )
    return (
        <section className="search-page">

        </section>
    )
}