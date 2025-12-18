import { useState } from "react"
import { demoSong } from "../../services/spotifyService.js"


export function FooterTrackPreview({onAdd , onTilte, onArtist}) {

    const [playingSong, setPlayingSong] = useState(demoSong) //for now. not necessary

    return (
        <section className="footer-track-preview">
            <img src={playingSong.imgUrl} alt="" width={'56px'} height={'56px'} />
            <div>
                <h5 onClick={onTilte}>{playingSong.title}</h5>
                <h6 onClick={onArtist}>{playingSong.artist}</h6>
            </div>
            <div>
                <svg onClick={onAdd} data-encore-id="icon" role="img" aria-hidden="true" className="footer-plus" viewBox="0 0 16 16"><path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8"></path><path d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75"></path></svg>
            </div>
        </section>
    )
}