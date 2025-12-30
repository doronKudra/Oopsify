import { playerActions } from '../store/actions/player.actions'
import { useSelector } from 'react-redux'
import { PlayIcon } from './icons/PlayIcon'
import { PauseIcon } from './icons/PauseIcon'
import { store } from '../store/store'
import { useEffect, useState } from 'react'

export function StationControls({
    openContextMenu,
    onAddStation,
    onRemoveStation,
    station,
}) {
    const sidebarStations = useSelector(
        (store) => store.stationModule.sidebarStations
    )
    const isLiked = sidebarStations.some(({ _id }) => _id === station._id)
    // console.log('isLiked:', isLiked)

    const playingStationId = useSelector((store) => store.playerModule.stationId)
    const isPlaying = useSelector(state => state.playerModule.isPlaying)

    const [isThisStationPlaying, setIsThisStationPlaying] = useState(false)

    useEffect(()=>{
        console.log('2:',2)
        if (isPlaying && playingStationId === station?._id){
            setIsThisStationPlaying(true)
        } else {
            setIsThisStationPlaying(false)
        }
    },[isPlaying, playingStationId])

    function onStationRightClick(ev, station) {
        openContextMenu({
            x: ev.clientX,
            y: ev.clientY,
            context: { station },
        })
    }

    function onPlayPauseBtn() {
        if (isThisStationPlaying) { //pause
            playerActions.onPlaying(true)
            // playerActions.setStationPlaying(false)
            // playerActions.pauseTrack() // 
        } else if(playingStationId !== station._id){
            playerActions.onPlayStation(station)
        } else {
            playerActions.onPlaying(false)            
        }
    }

    const hasImg = station?.images?.[0]?.url

    return (
        <div className="btn-container">
            {/* Play */}
            <button
                className="control-btn play-btn"
                aria-label="Play"
                onClick={onPlayPauseBtn}
            >
                <div className="green-circle">
                    {' '}
                    {isThisStationPlaying ? (
                        <PauseIcon width={24} height={24} />
                    ) : (
                        <PlayIcon width={24} height={24} />
                    )}{' '}
                </div>
            </button>

            {/* Preview */}
            <button
                className="control-btn preview-btn"
                aria-label="Preview"
                onClick={() => {}}
            >
                {hasImg && <img src={station.images[0].url} alt="Cover" />}
            </button>

            {/* Shuffle */}
            <button
                className="control-btn shuffle-btn"
                aria-label="Shuffle"
                onClick={() => {}}
            >
                <svg
                    viewBox="0 0 24 24"
                    className="icon-control shuffle-icon"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M18.788 3.702a1 1 0 0 1 1.414-1.414L23.914 6l-3.712 3.712a1 1 0 1 1-1.414-1.414L20.086 7h-1.518a5 5 0 0 0-3.826 1.78l-7.346 8.73a7 7 0 0 1-5.356 2.494H1v-2h1.04a5 5 0 0 0 3.826-1.781l7.345-8.73A7 7 0 0 1 18.569 5h1.518l-1.298-1.298z"
                        fill="currentColor"
                    />
                    <path
                        d="M18.788 14.289a1 1 0 0 0 0 1.414L20.086 17h-1.518a5 5 0 0 1-3.826-1.78l-1.403-1.668-1.306 1.554 1.178 1.4A7 7 0 0 0 18.568 19h1.518l-1.298 1.298a1 1 0 1 0 1.414 1.414L23.914 18l-3.712-3.713a1 1 0 0 0-1.414 0zM7.396 6.49l2.023 2.404-1.307 1.553-2.246-2.67a5 5 0 0 0-3.826-1.78H1v-2h1.04A7 7 0 0 1 7.396 6.49"
                        fill="currentColor"
                    />
                </svg>
            </button>

            {/* Add to Liked */}
            <button
                className="control-btn liked-btn"
                aria-label="Add To Liked"
                onClick={() => {
                    isLiked ? onRemoveStation(station) : onAddStation(station)
                }}
            >
                {!isLiked && (
                    <svg
                        viewBox="0 0 24 24"
                        className="icon-control liked-icon"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M11.999 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18m-11 9c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11-11-4.925-11-11"
                            fill="currentColor"
                        />
                        <path
                            d="M17.999 12a1 1 0 0 1-1 1h-4v4a1 1 0 1 1-2 0v-4h-4a1 1 0 1 1 0-2h4V7a1 1 0 1 1 2 0v4h4a1 1 0 0 1 1 1"
                            fill="currentColor"
                        />
                    </svg>
                )}
                {isLiked && (
                    <svg
                        data-encore-id="icon"
                        role="img"
                        aria-hidden="true"
                        className="icon-control liked-icon-marked"
                        viewBox="0 0 24 24"
                    >
                        <path d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12m16.398-2.38a1 1 0 0 0-1.414-1.413l-6.011 6.01-1.894-1.893a1 1 0 0 0-1.414 1.414l3.308 3.308z"></path>
                    </svg>
                )}
            </button>

            {/* Download */}
            <button
                className="control-btn download-btn"
                aria-label="Download"
                onClick={() => {}}
            >
                <svg
                    viewBox="0 0 24 24"
                    className="icon-control download-icon"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12"
                        fill="currentColor"
                    />
                    <path
                        d="M12 6.05a1 1 0 0 1 1 1v7.486l1.793-1.793a1 1 0 1 1 1.414 1.414L12 18.364l-4.207-4.207a1 1 0 1 1 1.414-1.414L11 14.536V7.05a1 1 0 0 1 1-1"
                        fill="currentColor"
                    />
                </svg>
            </button>

            {/* Three Dots */}
            <button
                className="control-btn more-btn"
                aria-label="More options"
                onPointerDown={(ev) => onStationRightClick(ev, station)}
            >
                <svg
                    viewBox="0 0 24 24"
                    className="icon-control more-icon"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"
                        fill="currentColor"
                    />
                </svg>
            </button>

            <button className="control-btn list-btn" aria-label="List view">
                <span className="btn-label">List</span>
                <svg
                    viewBox="0 0 16 16"
                    className="icon-control list-icon"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M15 14.5H5V13h10zm0-5.75H5v-1.5h10zM15 3H5V1.5h10zM3 3H1V1.5h2zm0 11.5H1V13h2zm0-5.75H1v-1.5h2z"
                        fill="currentColor"
                    />
                </svg>
            </button>
        </div>
    )
}
