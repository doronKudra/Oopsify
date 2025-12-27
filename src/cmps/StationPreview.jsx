import { Link } from 'react-router-dom'
import { FastAverageColor } from 'fast-average-color'

export function StationPreview({
    openContextMenu,
    station,
    listType,
    onHoverColor,
}) {
    function onStationRightClick(ev, station) {
        ev.preventDefault()
        ev.stopPropagation()

        openContextMenu({
            x: ev.clientX,
            y: ev.clientY,
            context: { station },
        })
    }
    return (
        <DynamicCmp
            onStationRightClick={onStationRightClick}
            station={station}
            listType={listType}
            onHoverColor={onHoverColor}
        />
    )
}

function DynamicCmp({ onStationRightClick, station, listType, onHoverColor }) {
    const fac = new FastAverageColor()
    async function handleHover() {
        const url =
            station?.images?.[0]?.url || station?.tracks?.[0]?.images?.[0]?.url

        if (!url) return

        const fac = new FastAverageColor()
        const color = await fac.getColorAsync(url)

        onHoverColor?.(color)
    }

    switch (listType) {
        case 'favorites': // small image, pinned, type, creator (for liked tracks show number of tracks)
            return <Link className='sidebar-station-preview-link' to={`/station/${station?.id}`}>
                <article onContextMenu={(ev) => onStationRightClick(ev, station)} className="sidebar-station-preview-container">
                    <div className="small-img-container">
                        <img className="small-img" src={station?.images?.at(-1)?.url}></img>
                    </div>
                    <div className="sidebar-preview-station">
                        <span className="sidebar-preview-station-title">
                            {station?.name?.slice(0, 32)}
                            {station.name.length > 32 && '...'}
                        </span>
                        {!(station.id === 'liked-tracks') && station?.owner?.name &&
                            <span className="sidebar-preview-station-info">{'Playlist' + ' • ' + station?.owner?.name}</span> //station.type pinned svg: <svg data-encore-id="icon" role="img" aria-hidden="false" class="e-91000-icon e-91000-baseline wJ1guHZhFtkqK3QIfpqy" viewBox="0 0 16 16" style="--encore-icon-fill: var(--text-bright-accent, #107434); --encore-icon-height: var(--encore-graphic-size-informative-smaller-2); --encore-icon-width: var(--encore-graphic-size-informative-smaller-2);"><title>Pinned</title><path d="M8.822.797a2.72 2.72 0 0 1 3.847 0l2.534 2.533a2.72 2.72 0 0 1 0 3.848l-3.678 3.678-1.337 4.988-4.486-4.486L1.28 15.78a.75.75 0 0 1-1.06-1.06l4.422-4.422L.156 5.812l4.987-1.337z"></path></svg>
                        }
                        {station.id === 'liked-tracks' &&
                            <span className="sidebar-preview-station-info">{station.tracks.length + ' songs'}</span>
                        }
                    </div>
                </article>
            </Link>

        case 'index': // bigger image, title -> description -> name of artists (if no title show desc, if no desc show artists names)
            return (
                <Link
                    className="index-station-preview-link"
                    to={`/station/${station?.id}`}
                >
                    <article
                        onContextMenu={(ev) => onStationRightClick(ev, station)}
                        className="index-station-preview-container"
                    >
                        <div className="medium-img-container">
                            <img
                                className="medium-img"
                                src={station?.images?.at(0)?.url}
                            ></img>
                        </div>
                        <div className="index-station-preview">
                            <span className="index-station-preview-title">
                                {station?.name?.slice(0, 25)}
                                {station.name.length > 25 && '...'}
                            </span>
                            {
                                station?.description && (
                                    <span className="index-station-preview-info">
                                        {station?.description?.slice(0, 32) +
                                            '...'}
                                    </span>
                                ) //station.type pinned svg: <svg data-encore-id="icon" role="img" aria-hidden="false" class="e-91000-icon e-91000-baseline wJ1guHZhFtkqK3QIfpqy" viewBox="0 0 16 16" style="--encore-icon-fill: var(--text-bright-accent, #107434); --encore-icon-height: var(--encore-graphic-size-informative-smaller-2); --encore-icon-width: var(--encore-graphic-size-informative-smaller-2);"><title>Pinned</title><path d="M8.822.797a2.72 2.72 0 0 1 3.847 0l2.534 2.533a2.72 2.72 0 0 1 0 3.848l-3.678 3.678-1.337 4.988-4.486-4.486L1.28 15.78a.75.75 0 0 1-1.06-1.06l4.422-4.422L.156 5.812l4.987-1.337z"></path></svg>
                            }
                        </div>
                    </article>
                </Link>
            )
        case 'recent': // small image, title
            return (
                <Link
                    className="recent-station-preview-link"
                    to={`/station/${station?.id}`}
                >
                    <article
                        onContextMenu={(ev) => onStationRightClick(ev, station)}
                        className="recent-station-preview-container"
                        onMouseEnter={handleHover}
                    >
                        <img
                            className="recent-small-img small-img"
                            src={station?.images?.at(-1)?.url}
                        ></img>
                        <div className="recent-preview-station">
                            <span className="recent-preview-station-title">
                                {station?.name?.slice(0, 19)}
                                {station?.name?.length > 19 && '...'}
                            </span>
                        </div>
                    </article>
                </Link>
            )
    }
}
