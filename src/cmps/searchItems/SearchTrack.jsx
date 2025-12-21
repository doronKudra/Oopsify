import defaultImg from "../../assets/images/default-img.png"


export function SearchTrack({ items, onArtist }) {


    return (
        <ul className="search-track-list">
            {items.map(item => (
                <li key={item.id} className="search-track">
                    <div className="search-name-img">
                        <img src={item?.images[2].url || defaultImg} alt="" />
                        <div className="search-name">
                            <h5>{item.name}</h5>
                            <p>
                                {item.artists.map((artist, idx, arr) => (
                                    <span onClick={() => onArtist(artist.id)}>{artist.name + (idx !== arr.length - 1 ? ', ' : '')}</span>
                                ))}
                            </p>
                        </div>
                    </div>
                    <h5 onClick={() => onAlbum(item.album.id)} className="search-album-name">{item.album.name}</h5>
                </li>
            ))}
        </ul>
    )
}