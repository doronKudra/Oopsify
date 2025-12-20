import { userService } from '../services/user'
import { StationPreview } from './StationPreview'

export function TrackList({ station }) {
    console.log('station:', station)

    function msToTimeString(ms) {
        const minutes = Math.floor(ms / 60000)
        const seconds = Math.floor((ms % 60000) / 1000)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    return (
        <section>
            <div className='track-list-container'>
                <div className='track-list-title'>
                    <div>#</div>
                    <div className='center'>Title</div>
                    <div>xx:xx</div>
                </div>
                {station.tracks.map((track) => (
                    <div key={track.id} className="track">
                        <div className="track-num">{track.order}</div>
                        <div className="track-details center">
                            <div className='track-name'>{track.name}</div>
                            <div>{track.artist}</div>
                        </div>
                        <div className="track-duration">
                            {msToTimeString(track.duration_ms)}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
