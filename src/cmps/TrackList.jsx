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
                    <div>#</div>
                    <div className="center">Title</div>
                    <div>
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
                        <div key={idx + 1} className="track">
                            <div className="track-num">
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
                            <div className="track-details center">
                                <div className="track-name">{track?.name}</div>
                                <div>
                                    {track.artists
                                        .map((artist) => artist.name)
                                        .join(', ')}
                                </div>
                            </div>
                            <div className="track-duration">
                                {msToTimeString(track?.duration_ms)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
