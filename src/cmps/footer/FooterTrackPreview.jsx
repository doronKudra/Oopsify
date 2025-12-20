import { useState } from "react"
import { useSelector } from "react-redux"
import defaultImg from "../../assets/images/default-img.png"


export function FooterTrackPreview({ currTrack, onAdd, onTilte, onArtist }) {


    if (!currTrack) return
    return (
        <section className="footer-track-preview">
            <img src={currTrack.images[0].url || defaultImg} alt="" width={'56px'} height={'56px'} />
            <div>
                <h5 onClick={onTilte}>{currTrack.name}</h5>
                <h6 onClick={onArtist}>{currTrack.artists[0].name}</h6>
            </div>
            <div>
                <svg onClick={onAdd} data-encore-id="icon" role="img" aria-hidden="true" className="footer-plus" viewBox="0 0 16 16"><path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8"></path><path d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75"></path></svg>
            </div>
        </section>
    )
}