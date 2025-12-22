import { useSelector } from "react-redux"
import { playerActions } from "../store/actions/player.actions"
import { toggleLiked } from "../store/actions/user.actions"



export function TrackPreview({ track, idx, onToggleLiked }) {

    const likedTracks = useSelector(state => state.userModule.user.likedTracks?.tracks || [])

    function getCurrTime(time) {
        const totalSec = Math.floor(time / 1000)
        const hours = Math.floor(totalSec / 3600)
        const mins = Math.floor((totalSec % 3600) / 60)
        const secs = totalSec % 60

        if (time >= 60000 * 60) {
            return (hours + ':' +
                mins.toString().padStart(2, 0) + ':' +
                secs.toString().padStart(2, 0)
            )
        }
        return (
            mins.toString().padStart(2, '0') + ':' +
            secs.toString().padStart(2, '0')
        )
    }

    async function onToggleLiked(track) {
        await toggleLiked(track)
    }

    function checkLiked(id) {
        const isLiked = likedTracks.find(likedTrack => likedTrack.id === id)
        if (isLiked) return true
        return false
    }

    function onPlay(track) {
        playerActions.onTrackToPlay(track)
    }

    return (
        <div key={idx} className="track">
            {/* LEFT */}
            <div onClick={() => onPlay(track)} className="track-num left">
                <span className="track-num-text">
                    {idx + 1}
                </span>
                <svg
                    role="img"
                    height="24"
                    width="24"
                    viewBox="0 0 24 24" className="track-num-icon">
                    <path
                        d="M7 4v16l13-8z"
                        fill="currentColor"
                    />
                </svg>
            </div>

            {/* MIDDLE */}
            <div className="track-details center">
                <div className="track-name">
                    {track.name}
                </div>
                <div>
                    {track.artists
                        .map((a) => a.name)
                        .join(', ')}
                </div>
            </div>

            {/* RIGHT */}
            <div className="track-actions right">
                <button
                    className="control-btn liked-btn"
                    onClick={() =>
                        onToggleLiked(track)
                    }
                >
                    {checkLiked(track.id) ? (
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
                    {getCurrTime(
                        track.duration || track.duration_ms
                    )}
                </div>

                <button className="control-btn more-btn">
                    <svg
                        viewBox="0 0 24 24"
                        className="icon-control"
                        ole="img"
                        width="1em"
                        height="1em"
                    >
                        <path
                            d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"
                            fill="currentColor"
                        />
                    </svg>
                </button>
            </div>
        </div>
    )
}