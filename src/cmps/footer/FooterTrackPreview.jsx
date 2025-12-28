import { useSelector } from 'react-redux'
import defaultImg from '../../assets/images/default-img.png'
import { useContextMenu } from '../OptionMenuProvider.jsx'
import { makeId } from '../../services/util.service.js'


export function FooterTrackPreview({ track, onAdd, onTilte, onArtist }) {
    const user = useSelector(state => state.userModule.user)

    const { openContextMenu } = useContextMenu()


    function checkLiked(id) {
        if (!user) return
        const isLiked = user?.likedTracks?.tracks.find((likedTrack) => likedTrack._id === id)
        if (isLiked) return true
        return false
    }

    function onPreviewRightClick(ev, track) {
        ev.preventDefault()
        ev.stopPropagation()

        handleOpenMenu({
            x: ev.clientX,
            y: ev.clientY,
            context: { track },
        })
    }

    function handleOpenMenu({ x, y, context }) {
        const { track } = context
        const isInStation = false // for now
        const isLiked = true
        let actions = [
            //
            { id: makeId(), icon: 'add', name: 'Add to playlist' }, // TODO (add to a different playlist) dropdown
            isLiked ? { id: makeId(), icon: 'remove', name: 'Remove from your Liked Songs', callback: () => onAdd(track) }
                : { id: makeId(), icon: 'save', name: 'Save to your Liked Songs', callback: () => onAdd(track) },
            { id: makeId(), icon: 'queue', name: 'Add to queue', callback: () => { }, }, // TODO
            { id: makeId(), icon: 'radio', name: 'Go to song radio', callback: () => { }, }, // TODO
            { id: makeId(), icon: 'artist', name: 'Go to artist', callback: () => { }, }, // TODO
            { id: makeId(), icon: 'album', name: 'Go to album', callback: () => { }, }, // TODO - make a dropdown cmp
            { id: makeId(), icon: 'share', name: 'Share', callback: () => { }, }, // TODO
        ]
        openContextMenu({
            x,
            y,
            context,
            actions,
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
                {!checkLiked(track._id) ?
                    <svg data-encore-id="icon" role="img" aria-hidden="true" className="footer-plus" viewBox="0 0 16 16" > <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8"></path> <path d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75"></path> </svg>
                    :
                    <svg role="img" aria-hidden="true" className="footer-liked-icon" viewBox="0 0 16 16" > <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m11.748-1.97a.75.75 0 0 0-1.06-1.06l-4.47 4.47-1.405-1.406a.75.75 0 1 0-1.061 1.06l2.466 2.467 5.53-5.53z"></path> </svg>
                }
            </div>
        </section>
    )
}
