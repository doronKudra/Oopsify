import YouTube from "react-youtube";

export function YtPlayer({ videoId, onReady}) {
    const opts = {
        height: '0',
        width: '0',
        playerVars: {
            autoplay: 1,
            controls: 0
        }
    }

    return (
        <YouTube
            videoId={videoId}
            opts={opts}
            onReady={onReady}
        />
    )
}