import PlayBtn from '../assets/images/icons/circle-play-green.svg?react'
import Shuffle from '../assets/images/icons/shuffle.svg?react'
import AddToLiked from '../assets/images/icons/add-to-liked.svg?react'
import Download from '../assets/images/icons/download.svg?react'
import ThreeDots from '../assets/images/icons/three-dots.svg?react'

export function StationControls({ station }) {
    return (
        <div className="btn-container">
            <button className="control-btn">
                <PlayBtn className="icon" />
            </button>
            <button className="control-btn">
                <Shuffle className="icon" />
            </button>
            <button className="control-btn">
                <AddToLiked className="icon" />
            </button>
            <button className="control-btn">
                <Download className="icon" />
            </button>
            <button className="control-btn">
                <ThreeDots className="icon" />
            </button>
        </div>
    )
}
