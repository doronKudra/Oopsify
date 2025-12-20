
export function PlayerControls({ currTime, duration }) {


    function getCurrTime(time) {
        const totalSec = Math.floor(time / 1000)
        const hours = Math.floor(totalSec / 3600)
        const mins = Math.floor((totalSec % 3600) / 60)
        const secs = totalSec % 60

        if (duration >= 60000 * 60) {
            console.log('124124124:', 124124124)
            return (hours + ':' +
                mins.toString().padStart(2, 0) + ':' +
                secs.toString().padStart(2, 0)
            )
        }
        return (
            mins.toString().padStart(2, '0') + ':' +
            secs.toString().padStart(2, '0')
        )
        // return timeStr
    }

    return (
        <section className="player-controls">
            <div className="controls">

            </div>
            <div className="time-display">
                <span>{duration ? getCurrTime(currTime) : '-:--'}</span>
                <div className="track-duration"></div>
                <span>{duration ? getCurrTime(duration) : '-:--'}</span>
            </div>
        </section>
    )
}

//hour = 3,600,000