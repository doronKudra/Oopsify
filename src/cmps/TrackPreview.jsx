import { useSelector } from 'react-redux'
import { playerActions } from '../store/actions/player.actions'
import { toggleLikedTrack } from '../store/actions/user.actions'
import { useLocation } from 'react-router'

export function TrackPreview({ openContextMenu, track, idx, inDetails, onAddTrackInSearch }) {
    const user = useSelector(state => state.userModule.user)

    function getCurrTime(time) {
        const totalSec = Math.floor(time / 1000)
        const hours = Math.floor(totalSec / 3600)
        const mins = Math.floor((totalSec % 3600) / 60)
        const secs = totalSec % 60

        if (hours > 0) {
            return (
                hours +
                ':' +
                mins.toString() +
                ':' +
                secs.toString().padStart(2, '0')
            )
        }

        return mins.toString() + ':' + secs.toString().padStart(2, '0')
    }

    async function onToggleLiked(track) {
        await toggleLikedTrack(track)
    }

    function checkLiked(id) {
        const likedTracks = user?.likedTracks?.tracks
        if (!likedTracks || !likedTracks.length) return false
        const isLiked = likedTracks.find(likedTrack => likedTrack._id === id)
        return isLiked
    }

    function onPlay(track) {
        playerActions.onTrackToPlay(track)
    }

    function onTrackDetails(ev, track) {
        ev.preventDefault()
        ev.stopPropagation()

        openContextMenu({
            x: ev.clientX,
            y: ev.clientY,
            context: { track },
        })
    }
    return (
        <div
            onContextMenu={(ev) => onTrackDetails(ev, track)}
            className="track"
        >
            {/* Column 1 */}
            <div
                onClick={() => onPlay(track)}
                onPointerDown={(ev) => ev.stopPropagation()}
                className="track-num left"
            >
                <span className="track-num-text">{idx + 1}</span>
                <svg
                    role="img"
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    className="track-num-icon"
                >
                    <path d="M7 4v16l13-8z" fill="currentColor" />
                </svg>
            </div>

            {/* Column 2 */}
            <div className="track-details center">
                <div></div>
                <img
                    className="track-list-img"
                    src={track.images[0]?.url}
                    alt=""
                />
                <div>
                    <div className="track-name">{track.name}</div>
                    <div className="track-artist">
                        {track.artists.map((a) => a.name).join(', ')}
                    </div>
                </div>
            </div>

            {/* Column 3 */}
            <div className="track-album-name" onClick={() => { }}>
                {track?.album?.name && track?.album?.name}
            </div>

            {/* Column 4 */}
            {!inDetails ? (
                <div className="track-actions right">
                    <button
                        className="control-btn liked-btn"
                        onClick={() => onToggleLiked(track)}
                        onPointerDown={(ev) => ev.stopPropagation()}
                    >
                        {checkLiked(track._id) ? (
                            // GREEN CHECK ICON
                            <svg
                                className="track-list-like-icon"
                                width="1em"
                                height="1em"
                                viewBox="0 0 16 16"
                            >
                                <defs>
                                    <mask id="check-cutout">
                                        <rect
                                            width="16"
                                            height="16"
                                            fill="white"
                                        />
                                        <path
                                            d="M4.5 8.5l2 2 5-5"
                                            stroke="black"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </mask>
                                </defs>
                                <circle
                                    cx="8"
                                    cy="8"
                                    r="7"
                                    fill="#1db954"
                                    mask="url(#check-cutout)"
                                />
                            </svg>
                        ) : (
                            // TRANSPARENT PLUS ICON
                            <svg
                                className="track-list-like-icon"
                                ole="img"
                                width="1em"
                                height="1em"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75z"
                                    fill="currentColor"
                                />
                            </svg>
                        )}
                    </button>

                    <div className="track-duration-list">
                        {getCurrTime(track.duration || track.duration_ms)}
                    </div>

                    <button
                        onPointerDown={(ev) => onTrackDetails(ev, track)}
                        className="control-btn more-btn"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className="icon-control"
                            aria-hidden="true"
                        >
                            <circle
                                cx="4.5"
                                cy="12"
                                r="2"
                                fill="currentColor"
                            />
                            <circle cx="12" cy="12" r="2" fill="currentColor" />
                            <circle
                                cx="19.5"
                                cy="12"
                                r="2"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                </div>
            ) : (
                <button onClick={() => onAddTrackInSearch(track)} className="details-add-btn">Add</button>
            )}
        </div>
    )
}
