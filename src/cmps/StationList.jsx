import { useState, useRef } from 'react'
import { StationPreview } from './StationPreview'

import { makeId } from '../services/util.service'
import { removeStation, addStation } from '../store/actions/station.actions.js'
import { useSelector } from 'react-redux'

export function StationList({
    openContextMenu,
    stations,
    listType,
    listTitle,
    onHoverColor,
}) {
    let displayStations = [...stations]
    if (listType === 'recent') displayStations = displayStations.slice(0, 8)
    if (!displayStations?.length) return
    console.log('displayStations:', displayStations)
    console.log('listType:', listType)

    const carouselRef = useRef(null)

    function scrollLeft() {
        carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }

    function scrollRight() {
        carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }

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

            {/* NORMAL LIST for recent + favorites */}
            {listType !== 'index' && (
                <ul className={listType + '-station-list'}>
                    {displayStations.map((station) => (
                        <li key={station._id || station.id}>
                            <StationPreview
                                openContextMenu={openContextMenu}
                                station={station}
                                listType={listType}
                                onHoverColor={onHoverColor}
                            />
                        </li>
                    ))}
                </ul>
            )}

            {/* CAROUSEL ONLY for index */}
            {listType === 'index' && (
                <div className="carousel-wrapper">
                    <button className="carousel-btn left" onClick={scrollLeft}>
                        ‹
                    </button>

                    <ul
                        className={listType + '-station-list carousel'}
                        ref={carouselRef}
                    >
                        {displayStations.map((station) => (
                            <li key={station._id || station.id}>
                                <StationPreview
                                    openContextMenu={openContextMenu}
                                    station={station}
                                    listType={listType}
                                    onHoverColor={onHoverColor}
                                />
                            </li>
                        ))}
                    </ul>

                    <button
                        className="carousel-btn right"
                        onClick={scrollRight}
                    >
                        ›
                    </button>
                </div>
            )}
        </section>
    )
}
