import { userService } from '../services/user'
import { StationPreview } from './StationPreview'

export function TrackList({ station, durationMs, user, onToggleLiked }) {
    function msToTimeString(ms) {
        const minutes = Math.floor(ms / 60000)
        const seconds = Math.floor((ms % 60000) / 1000)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    const likedTracks = user?.likedTracks?.tracks || []

    return (
        <section>
            <div className="track-list-container">
                <div className="track-list-title">
                    <div className="title-track-number left">#</div>
                    <div className="center">Title</div>
                    <div className="title-track-duration right">
                        <svg
                            viewBox="0 0 16 16"
                            className="icon-control duration-icon"
                        >
                            <path
                                d="M8 1.5a6.5 6.5 0 1 0 0 13..."
                                fill="currentColor"
                            />
                            <path
                                d="M8 3.25a.75.75 0 0 1..."
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                </div>

                <div className="track-container">
                    {station?.tracks.map((track, idx) => {
                        const isLiked = likedTracks.some(
                            (t) => t.id === track.id
                        )

                        return (
                            <div key={idx} className="track">
                                {/* LEFT */}
                                <div className="track-num left">
                                    <span className="track-num-text">
                                        {idx + 1}
                                    </span>
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="track-num-icon"
                                    >
                                        <path
                                            d="m7.05 3.606 13.49..."
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
                                        onClick={() => onToggleLiked(track)}
                                    >
                                        {isLiked ? (
                                            // GREEN CHECK ICON
                                            <svg
                                                className="track-list-like-icon"
                                                width="1em"
                                                height="1em"
                                                viewBox="0 0 16 16"
                                                style={{ color: '#1db954' }}
                                            >
                                                <path
                                                    d="M8 1.5a6.5 6.5 0 1 0..."
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M11.03 5.97a.75.75 0 0 1..."
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        ) : (
                                            // TRANSPARENT PLUS ICON
                                            <svg
                                                className="track-list-like-icon"
                                                width="1em"
                                                height="1em"
                                                viewBox="0 0 16 16"
                                            >
                                                {/* Circle stays visible */}
                                                <path
                                                    d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
                                                    fill="#b3b3b3"
                                                />

                                                {/* Plus is transparent */}
                                                <path
                                                    d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75z"
                                                    fill="transparent"
                                                />
                                            </svg>
                                        )}
                                    </button>

                                    <div className="track-duration-list">
                                        {msToTimeString(track.duration_ms)}
                                    </div>

                                    <button className="control-btn more-btn">
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="icon-control"
                                        >
                                            <path
                                                d="M4.5 13.5a1.5 1.5 0 1 0..."
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
