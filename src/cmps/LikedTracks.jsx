import { StationPreview } from './StationPreview'

export function LikedTracks({ user, listType}){
    const station = {
        name: 'Liked Songs',
        tracks:user.likedTracks,
        createdBy: user.userName,
        images: [{url: 'src/assets/images/liked-songs.png'}],
        id: 'liked-songs'
    }
    return <section>
            <ul className={listType + "-station-list"}>
                {station && 
                    <li key={station.id}>
                        <StationPreview station={station} listType={listType}/>
                    </li>
                }
            </ul>
    </section>
}