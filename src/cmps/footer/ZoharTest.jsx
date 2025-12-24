import { useSelector } from "react-redux"
import { TrackPreview } from "../TrackPreview"


export function ZoharTest() {

    const trackList = useSelector(state => state.playerModule.trackList)

    return (
        <div>
            <hr />
            <h4 style={{fontSize:'28px', textAlign:'center',padding:'20px'}}>Secret Route 🤭</h4>
            <h6 style={{fontSize:'12px', textAlign:'center',color:'gray'}}>test for queue...</h6>
            <hr />
            {trackList.map((track, idx) => (
                <TrackPreview openContextMenu={() => console.log('1:', 1)} track={track} idx={idx} onToggleLiked={() => console.log('2:', 2)} inDetails={true} />
            ))}
        </div>
    )
}