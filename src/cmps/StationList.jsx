import { userService } from '../services/user'
import { StationPreview } from './StationPreview'

export function StationList({ stations, listType}) {
    return <section>
        <ul className={listType + "-station-list"}>
            {stations && stations.map(station =>
                <li key={station._id}>
                    <StationPreview station={station} listType={listType}/>
                </li>)
            }
        </ul>
    </section>
}