import { userService } from '../services/user'
import { StationPreview } from './StationPreview'

export function TrackList({ station, durationMs }) {
    function msToTimeString(ms) {
        const minutes = Math.floor(ms / 60000)
        const seconds = Math.floor((ms % 60000) / 1000)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    const duration = msToTimeString(durationMs)
    console.log('station:', station)

    return (
        <section>
            <div className="track-list-container">
                <div className="track-list-title">
                    {/* LEFT*/}
                    <div className="title-track-number left">#</div>

                    {/* Center*/}
                    <div className="center">Title</div>

                    {/* Right*/}
                    <div className="title-track-duration right">
                        <svg
                            viewBox="0 0 16 16"
                            className="icon-control duration-icon"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8"
                                fill="currentColor"
                            />
                            <path
                                d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                </div>

                <div className="track-container">
                    {station?.tracks.map((track, idx) => (
                        <div key={idx} className="track">
                            {/* LEFT: number + play icon */}
                            <div className="track-num left">
                                <span className="track-num-text">
                                    {idx + 1}
                                </span>
                                <svg
                                    viewBox="0 0 24 24"
                                    className="track-num-icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>

                            {/* MIDDLE: title + artists */}
                            <div className="track-details center">
                                <div className="track-name">{track.name}</div>
                                <div>
                                    {track.artists
                                        .map((a) => a.name)
                                        .join(', ')}
                                </div>
                            </div>

                            {/* RIGHT: like + duration + more */}
                            <div className="track-actions right">
                                <button className="control-btn liked-btn">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="icon-control"
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
                                            d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
