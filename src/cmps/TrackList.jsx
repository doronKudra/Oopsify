import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { userService } from '../services/user'
import { StationPreview } from './StationPreview'
import { SortableTrack } from './SortableTracks.jsx'
import { TrackPreview } from './TrackPreview.jsx'
// get the user from store

export function TrackList({ openContextMenu, tracks, tempIdsRef, isStation }) {

    return (
        <section>
            <div className={`track-list-container ${!isStation && 'album-view'}`}>
                <div className="track-list-title">
                    <div className="title-track-number left">#</div>
                    <div className="center">Title</div>
                    {isStation && <div className='list-album-title'>Album</div>}
                    <div className="title-track-duration right">
                        <svg
                            viewBox="0 0 16 16"
                            className="icon-control duration-icon"
                        >
                            <path
                                d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
                                fill="currentColor"
                            />
                            <path
                                d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75V4a.75.75 0 0 1 .75-.75z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                </div>

                <div className="track-container">
                    <SortableContext
                        items={tempIdsRef.current}
                        strategy={verticalListSortingStrategy}
                    >
                        {tracks.map((track, idx) => {
                            const tempId = tempIdsRef.current[idx]
                            return (
                                <SortableTrack id={tempId} key={tempId}>
                                    <TrackPreview
                                        openContextMenu={openContextMenu}
                                        track={track}
                                        idx={idx}
                                        isStation={isStation}
                                    />
                                </SortableTrack>
                            )
                        })}
                    </SortableContext>
                </div>
            </div>
        </section>
    )
}
