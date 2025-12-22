import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { userService } from '../services/user'
import { StationPreview } from './StationPreview'
import { SortableTrack } from './SortableTracks.jsx'
import { TrackPreview } from './TrackPreview.jsx'
// get the user from store

export function TrackList({ tracks, tempIdsRef, durationMs, onToggleLiked }) {
    function msToTimeString(ms) {
        const minutes = Math.floor(ms / 60000)
        const seconds = Math.floor((ms % 60000) / 1000)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    const likedTracks = useSelector(
        (store) => store.userModule.user?.likedTracks?.tracks || []
    )

    return (
        <section>
            <div className="track-list-container">
                <div className="track-list-title">
                    <div className="title-track-number left">#</div>
                    <div className="center">Title</div>
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
                            const isLiked = likedTracks.some(
                                (t) => t.id === track.id
                            )
                            const tempId = tempIdsRef.current[idx]

                            return (
                                <SortableTrack id={tempId} key={tempId}>
                                    <TrackPreview track={track} idx={idx} isLiked={isLiked} onToggleLiked={onToggleLiked} />
                                </SortableTrack>
                            )
                        })}
                    </SortableContext>
                </div>
            </div>
        </section>
    )
}

// {/* <div className="track">
//     {/* LEFT */}
//     <div className="track-num left">
//         <span className="track-num-text">
//             {idx + 1}
//         </span>
//         <svg
//             role="img"
//             height="24"
//             width="24"
//             viewBox="0 0 24 24"
//             className="track-num-icon"
//         >
//             <path
//                 d="M7 4v16l13-8z"
//                 fill="currentColor"
//             />
//         </svg>
//     </div>

//     {/* MIDDLE */}
//     <div className="track-details center">
//         <div className="track-name">
//             {track.name}
//         </div>
//         <div>
//             {track.artists
//                 .map((a) => a.name)
//                 .join(', ')}
//         </div>
//     </div>

//     {/* RIGHT */}
//     <div className="track-actions right">
//         <button
//             className="control-btn liked-btn"
//             onClick={() =>
//                 onToggleLiked(track)
//             }
//         >
//             {isLiked ? (
//                 // GREEN CHECK ICON
//                 <svg
//                     className="track-list-like-icon"
//                     width="1em"
//                     height="1em"
//                     viewBox="0 0 16 16"
//                 >
//                     <defs>
//                         <mask id="check-cutout">
//                             <rect
//                                 width="16"
//                                 height="16"
//                                 fill="white"
//                             />
//                             <path
//                                 d="M4.5 8.5l2 2 5-5"
//                                 stroke="black"
//                                 strokeWidth="1.8"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                             />
//                         </mask>
//                     </defs>

//                     <circle
//                         cx="8"
//                         cy="8"
//                         r="7"
//                         fill="#1db954"
//                         mask="url(#check-cutout)"
//                     />
//                 </svg>
//             ) : (
//                 // TRANSPARENT PLUS ICON
//                 <svg
//                     className="track-list-like-icon"
//                     ole="img"
//                     width="1em"
//                     height="1em"
//                     viewBox="0 0 16 16"
//                 >
//                     <path
//                         d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
//                         fill="currentColor"
//                     />
//                     <path
//                         d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75z"
//                         fill="currentColor"
//                     />
//                 </svg>
//             )}
//         </button>

//         <div className="track-duration-list">
//             {msToTimeString(
//                 track.duration_ms
//             )}
//         </div>

//         <button className="control-btn more-btn">
//             <svg
//                 viewBox="0 0 24 24"
//                 className="icon-control"
//                 ole="img"
//                 width="1em"
//                 height="1em"
//             >
//                 <path
//                     d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"
//                     fill="currentColor"
//                 />
//             </svg>
//         </button>
//     </div>
// </div> */}