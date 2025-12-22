import YouTube from "react-youtube";

export function YtPlayer({ videoId, onReady, onPause, onPlay }) {
    const opts = {
        height: '300px',
        width: '300px',
        playerVars: {
            autoplay: 1,
            controls: 0
        }
    }

    // function handleReady({target}) {
    //     onReady(target)
    // }


    return (
        <YouTube
            videoId={videoId}
            opts={opts}
            onReady={onReady}
        />
    )
}