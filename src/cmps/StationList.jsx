import { useState } from 'react'
import { StationPreview } from './StationPreview'

import { makeId } from '../services/util.service'
import { removeStation, addStation } from '../store/actions/station.actions.js'
import { updateUserLikedStations } from '../store/actions/user.actions.js'
import { useSelector } from 'react-redux'

export function StationList({ openContextMenu,stations, listType }) {
    if (!stations?.length) return
    return (<section>
        <ul className={listType + "-station-list"}>
            {stations.map(station =>
                <li key={station.id}>
                    <StationPreview openContextMenu={openContextMenu} station={station} listType={listType} />
                </li>)
            }
        </ul>
    </section>)
}