import { useState } from 'react'
import { StationPreview } from './StationPreview'

import { makeId } from '../services/util.service'
import { removeStation, addStation } from '../store/actions/station.actions.js'
import { useSelector } from 'react-redux'

export function StationList({
    openContextMenu,
    stations,
    listType,
    listTitle,
    onHoverColor
}) {
    let displayStations = [...stations]
    if (listType === 'recent') displayStations = displayStations.slice(0, 8)
    if (!displayStations?.length) return
    return (
        <section>
            {listTitle && (
                <div className="station-list-header">
                    <a>{listTitle}</a>
                    <a className="station-list-show-all-link">
                        <span>Show all</span>
                    </a>
                </div>
            )}
            <ul className={listType + '-station-list'}>
                {displayStations.map((station) => (
                    <li key={station._id}>
                        <StationPreview
                            openContextMenu={openContextMenu}
                            station={station}
                            listType={listType}
                            onHoverColor={onHoverColor}
                        />
                    </li>
                ))}
            </ul>
        </section>
    )
}
