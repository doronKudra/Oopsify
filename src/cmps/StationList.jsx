import { userService } from '../services/user'
import { StationPreview } from './StationPreview'

// {
//     stations,
//     isMain,
//     onRemoveStation,
//     onUpdateStation,
// }
export function StationList({ stations }) {
    // function isCustomizable(station) {
    //     const user = userService.getLoggedinUser()

    //     if (isMain) return false
    //     return station.owner?._id === user._id // can only edit your own stations
    // }
    return (
        <section>
            {/* <ul className="list">
                {stations &&
                    stations.map((station) => (
                        <li key={station._id}>
                            <StationPreview station={station} />
                            <div className="actions">
                                {!isMain && (
                                    <button
                                        onClick={() => onUpdateStation(station)}
                                    >
                                        Edit
                                    </button>
                                )}
                                {isCustomizable(station) && (
                                    <button
                                        onClick={() => onRemoveStation(station)}
                                    >
                                        x
                                    </button>
                                )}
                            </div>
                        </li>
                    ))}
            </ul> */}
        </section>
    )
}
