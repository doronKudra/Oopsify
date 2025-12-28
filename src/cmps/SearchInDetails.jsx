import { useState, useEffect, useRef } from "react"
import { debounce } from "../services/util.service"
import { spotifyService } from "../services/spotifyService.js"
import { TrackPreview } from "./TrackPreview.jsx"
import { useSelector } from "react-redux"
import {  toggleLikedTrack } from "../store/actions/user.actions.js"

export function SearchInDetails({ openContextMenu, tracks: isTracksInDetails, station }) {
    console.log('station:',station)
    // const user = useSelector(state => state.userModule.user)

    const [txt, setTxt] = useState('')
    const [tracks, setTracks] = useState([])
    const [isShown, setIsShown] = useState(false)
    const debouncedSearchRef = useRef(debounce(getTracks, 400))

    useEffect(() => {
        debouncedSearchRef.current(txt)
    }, [txt])

    useEffect(() => {
        if (!isTracksInDetails) setIsShown(true)
        else setIsShown(false)
    }, [isTracksInDetails])

    function handleSearch({ target }) {
        setTxt(target.value)
    }

    async function getTracks(txt) {
        if (!txt) {
            setTracks([])
            return
        }
        setTracks(await spotifyService.search(txt, 'track'))
    }

    function onAddTrackInSearch(track) {
        if (station._id === "liked-tracks") toggleLikedTrack(track)
    }

    if (!isShown) {
        if (txt) setTxt('')
        return (
            <div className={`SearchInDetails ${!isTracksInDetails ? 'border-top-none' : ''}`}>
                <button onClick={() => setIsShown(true)} className="details-find-more">
                    Find more
                </button>
            </div>
        )
    }

    return (
        <>
            <div className={`SearchInDetails ${!isTracksInDetails ? 'border-top-none' : ''}`}>


                <div className="search-details-header" >
                    <div>
                        <h3>Let's find something for your playlist</h3>
                        <div className="search-input-container">
                            <svg data-encore-id="icon" role="img" aria-hidden="true" className="details-search-svg" viewBox="0 0 16 16" ><path d="M7 1.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5M.25 7a6.75 6.75 0 1 1 12.096 4.12l3.184 3.185a.75.75 0 1 1-1.06 1.06L11.304 12.2A6.75 6.75 0 0 1 .25 7"></path></svg>
                            <input value={txt} onChange={handleSearch} type="text" placeholder="Search for tracks" />
                            {
                                txt &&
                                <svg onClick={() => setTxt('')} data-encore-id="icon" role="img" aria-label="Close" aria-hidden="false" className="search-details-xmark-input" viewBox="0 0 24 24"><path d="M3.293 3.293a1 1 0 0 1 1.414 0L12 10.586l7.293-7.293a1 1 0 1 1 1.414 1.414L13.414 12l7.293 7.293a1 1 0 0 1-1.414 1.414L12 13.414l-7.293 7.293a1 1 0 0 1-1.414-1.414L10.586 12 3.293 4.707a1 1 0 0 1 0-1.414"></path></svg>
                            }
                        </div>
                    </div>
                    <button onClick={() => setIsShown(false)} className="search-details-xmark-btn">
                        <svg data-encore-id="icon" role="img" aria-label="Close" aria-hidden="false" className="search-details-xmark-svg" viewBox="0 0 24 24"><path d="M3.293 3.293a1 1 0 0 1 1.414 0L12 10.586l7.293-7.293a1 1 0 1 1 1.414 1.414L13.414 12l7.293 7.293a1 1 0 0 1-1.414 1.414L12 13.414l-7.293 7.293a1 1 0 0 1-1.414-1.414L10.586 12 3.293 4.707a1 1 0 0 1 0-1.414"></path></svg>
                    </button>
                </div>
                <div className="track-container ">

                    {tracks && tracks.length ?
                        tracks.map((track, idx) => (
                            <TrackPreview openContextMenu={openContextMenu} key={track._id} track={track} idx={idx} isStation={false} inDetails={true} onAddTrackInSearch={onAddTrackInSearch} />
                        )) : ''}
                    {txt ? <div> No Results </div> : ""}
                </div>
            </div>
        </>
    )
}