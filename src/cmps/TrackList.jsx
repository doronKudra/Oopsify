import { userService } from '../services/user'
import { StationPreview } from './StationPreview'

// {
//     stations,
//     isMain,
//     onRemoveStation,
//     onUpdateStation,
// }
export function TrackList({station}) {
    // function isCustomizable(station) {
    //     const user = userService.getLoggedinUser()

    //     if (isMain) return false
    //     return station.owner?._id === user._id // can only edit your own stations
    // }
    return (
        <section>
            <div>
                {station.tracks.map((track) => (
                    <div key={track.id}>
                        <h3>{track.album}</h3>
                        <h4>
                            {track.order}. {track.name} — {track.artist}
                        </h4>
                    </div>
                ))}
            </div>
            {/* <ul className="list">
            {stations && stations.map(station =>
                <li key={station._id}>
                    <StationPreview station={station}/>
                    <div className="actions">
                        {!isMain && 
                            <button onClick={() => onUpdateStation(station)}>Edit</button>
                        }
                        {isCustomizable(station) && 
                            <button onClick={() => onRemoveStation(station)}>x</button>
                        }
                        </div>
                </li>)
            }
        </ul> */}
        </section>
    )
}
