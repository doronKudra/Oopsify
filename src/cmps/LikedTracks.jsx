import { StationList } from './StationList'
import { useContextMenu } from '../cmps/OptionMenuProvider.jsx'
import { makeId } from '../services/util.service.js'

export function LikedTracks({ user, listType }) {
    const station = user?.likedTracks
    const { openContextMenu } = useContextMenu()

    function handleOpenMenu({ x, y, context }) {
        const isPinned = true // later add to user pinned property inside a user along with playlist id
        openContextMenu({
            x,
            y,
            context,
            actions: [
                isPinned
                    ? {
                          id: makeId(),
                          icon: 'unpin',
                          name: 'Unpin playlist',
                          callback: ({ station }) => onPinStation(station),
                      }
                    : {
                          id: makeId(),
                          icon: 'pin',
                          name: 'Pin playlist',
                          callback: ({ station }) => onPinStation(station),
                      },
            ],
        })
    }

    function onPinStation(station) {}

    if (!user || !station) return
    return (
        <StationList
            openContextMenu={handleOpenMenu}
            stations={[station]}
            listType={listType}
        />
    )
}
