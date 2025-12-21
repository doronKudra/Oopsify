import { userService } from '../services/user'
import { StationPreview } from './StationPreview'

export function StationList({ stations, listType}) {
    return <section>
        <ul className={listType + "-station-list"}>
            {stations.length && stations.map(station =>
                <li key={station.id}>
                    <StationPreview station={station} listType={listType}/>
                </li>)
            }
        </ul>
    </section>
}