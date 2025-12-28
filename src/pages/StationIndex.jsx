import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadStations } from '../store/actions/station.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { stationService } from '../services/station/index.js'
import { userService } from '../services/user/index.js'
import { StationList } from '../cmps/StationList.jsx'
import { toggleLikedStation } from '../store/actions/user.actions.js'
import { useContextMenu } from '../cmps/OptionMenuProvider.jsx'
import { makeId } from '../services/util.service.js'
import { FastAverageColor } from 'fast-average-color'

export function StationIndex() {
    // const [filterBy, setFilterBy] = useState(stationService.getDefaultFilter())
    const stations = useSelector(
        (storeState) => storeState.stationModule.stations
    )
    const baseColor = '132, 0, 255'
    const [homeBg, setHomeBg] = useState('#121212')
    const user = useSelector((storeState) => storeState.userModule.user)
    const { openContextMenu } = useContextMenu()

    function handleOpenMenu({ x, y, context }) {
        const { station } = context
        let actions
        if (station.owner.id === user.id) {
            actions = [
                {
                    id: makeId(),
                    icon: 'queue',
                    name: 'Add to queue',
                    callback: () => {},
                    border: true,
                }, // TODO
                {
                    id: makeId(),
                    icon: 'profile',
                    name: 'Add to profile',
                    callback: () => {},
                    border: true,
                },
                {
                    id: makeId(),
                    icon: 'edit',
                    name: 'Edit details',
                    callback: () => {},
                }, // TODO
                {
                    id: makeId(),
                    icon: 'delete',
                    name: 'Delete',
                    callback: () => {},
                    border: true,
                }, // TODO
                {
                    id: makeId(),
                    icon: 'private',
                    name: 'Make private',
                    callback: () => {},
                }, // TODO
                {
                    id: makeId(),
                    icon: 'folder',
                    name: 'Move to folder',
                    callback: () => {},
                }, // TODO - make a dropdown cmp
                {
                    id: makeId(),
                    icon: 'share',
                    name: 'Share',
                    callback: () => {},
                }, // TODO
            ]
        } else {
            const isLiked = user.stations.includes(station.id)
            if (station.type === 'station') {
                actions = [
                    isLiked
                        ? {
                              id: makeId(),
                              icon: 'remove',
                              name: 'Remove from Your Library',
                              callback: () => onRemoveStation(station),
                          }
                        : {
                              id: makeId(),
                              icon: 'save',
                              name: 'Add to Your Library',
                              callback: () => onAddStation(station),
                          },
                    {
                        id: makeId(),
                        icon: 'queue',
                        name: 'Add to queue',
                        callback: () => {},
                        border: true,
                    }, // TODO
                    isLiked && {
                        id: makeId(),
                        icon: 'profile',
                        name: 'Add to profile',
                        callback: () => {},
                        border: true,
                    }, // TODO
                    {
                        id: makeId(),
                        icon: 'folder',
                        name: isLiked ? 'Move to folder' : 'Add to folder',
                        callback: () => {},
                    }, // TODO
                    {
                        id: makeId(),
                        icon: 'share',
                        name: 'Share',
                        callback: () => {},
                    }, // TODO
                ]
            }
        }
        openContextMenu({
            x,
            y,
            context,
            actions,
        })
    }

    useEffect(() => {
        loadStations()
    }, [])

    function onAddToQueue() {
        // TODO
    }

    function onAddStation(station) {
        toggleLikedStation(station)
    }
    function onRemoveStation(station) {
        toggleLikedStation(station)
    }

    function handleHoverColor(color) {
        if (!color) {
            setHomeBg(baseColor)
            return
        }

        const [r, g, b] = color.value 
        const rgb = `${r}, ${g}, ${b}`

        setHomeBg(rgb)
    }

    return (
        <main
            className="station-index"
            style={{
                background: `
      linear-gradient(
        to bottom,
        rgba(${homeBg}, 0.92) 0px,
        rgba(${homeBg}, 0.25) 150px,
        #121212 300px
      )
    `,
            }}
        >
            <StationList
                openContextMenu={handleOpenMenu}
                stations={stations}
                listType={'recent'}
                onHoverColor={handleHoverColor}
            />
            <StationList
                openContextMenu={handleOpenMenu}
                stations={stations}
                listType={'index'}
                listTitle={'Recommended Stations'}
            />
            <StationList
                openContextMenu={handleOpenMenu}
                stations={stations}
                listType={'index'}
                listTitle={'Discover Picks for you'}
            />
        </main>
    )
}
