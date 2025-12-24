import { StationList } from './StationList'
import { useContextMenu } from '../cmps/OptionMenuProvider.jsx'
import { makeId } from '../services/util.service.js'

export function LikedTracks({ user, listType }) {
    if(!user) return
    const { openContextMenu } = useContextMenu()
    function handleOpenMenu({ x, y, context }) {
        const isPinned = true // later add to user pinned property inside a user along with playlist id
        openContextMenu({
            x,
            y,
            context,
            actions: [
                isPinned ? 
                { id:makeId(),icon:'unpin',name: 'Unpin playlist', callback: ({ station }) => onPinStation(station) } :
                { id:makeId(),icon:'pin',name: 'Pin playlist', callback: ({ station }) => onPinStation(station) },
            ]
        })
    }

    function onPinStation(station) {
        console.log('pinned')
    }

    const likedTracks = user ? user.likedTracks : {}
    const station = {
        name: 'Liked Songs',
        tracks: likedTracks.tracks || [],
        owner: {
            id: user.id,
            name: user.userName,
        },
        images: [{ url: '/src/assets/images/liked-songs.png' }],
        id: 'liked-songs'
    }
    return (
        <StationList
            openContextMenu={handleOpenMenu}
            stations={[station]}
            listType={listType}
        />
    )
    // return <section>
    //         <ul className={listType + "-station-list"}>
    //             {station && 
    //                 <li key={station.id}>
    //                     <StationPreview station={station} listType={listType}/>
    //                 </li>
    //             }
    //         </ul>
    // </section>
}