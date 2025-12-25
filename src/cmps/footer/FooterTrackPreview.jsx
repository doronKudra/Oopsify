import { useState } from 'react'
import { useSelector } from 'react-redux'
import defaultImg from '../../assets/images/default-img.png'

export function FooterTrackPreview({
    openContextMenu,
    track,
    onAdd,
    onTilte,
    onArtist,
}) {
    const likedTracks = useSelector(
        (state) => state.userModule.user?.likedTracks?.tracks || []
    )

    function checkLiked(id) {
        const isLiked = likedTracks.find((likedTrack) => likedTrack.id === id)
        if (isLiked) return true
        return false
    }
    function onPreviewRightClick(ev, track) {
        ev.preventDefault()
        ev.stopPropagation()

        openContextMenu({
            x: ev.clientX,
            y: ev.clientY,
            context: { track },
        })
    }
    if (!track) return <section className="footer-track-preview"></section>
    return (
        <section className="footer-track-preview">
            <img
                onContextMenu={(ev) => onPreviewRightClick(ev, track)}
                src={track.images[0].url || defaultImg}
                alt=""
                width={'56px'}
                height={'56px'}
            />
            <div>
                <h5
                    onClick={onTilte}
                    onContextMenu={(ev) => onPreviewRightClick(ev, track)}
                >
                    {track.name}
                </h5>
                <h6
                    onClick={onArtist}
                    onContextMenu={(ev) => onPreviewRightClick(ev, track)}
                >
                    {track.artists[0].name}
                </h6>
            </div>
            <div onClick={onAdd} className="footer-add-btn">
                {!checkLiked(track.id) && (
                    <svg
                        data-encore-id="icon"
                        role="img"
                        aria-hidden="true"
                        className="footer-plus"
                        viewBox="0 0 16 16"
                    >
                        <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8"></path>
                        <path d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75"></path>
                    </svg>
                )}
                {checkLiked(track.id) && (
                    <svg
                        role="img"
                        aria-hidden="true"
                        className="footer-liked-icon"
                        viewBox="0 0 16 16"
                    >
                        <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m11.748-1.97a.75.75 0 0 0-1.06-1.06l-4.47 4.47-1.405-1.406a.75.75 0 1 0-1.061 1.06l2.466 2.467 5.53-5.53z"></path>
                    </svg>
                )}
            </div>
        </section>
    )
}
