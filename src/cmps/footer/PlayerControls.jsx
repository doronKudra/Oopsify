
export function PlayerControls({ currTime, duration }) {


    function getCurrTime(time) {
        console.log('time:', time)
        const totalSec = Math.floor(time / 1000)
        const hours = Math.floor(totalSec / 3600)
        const mins = Math.floor((totalSec % 3600) / 60)
        const secs = totalSec % 60

        console.log('hours,mins,secs:',hours,mins,secs)
        if (duration >= 60000 * 60) {
            console.log('124124124:',124124124)
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
                <span>{getCurrTime(currTime)}</span>
                <div className="track-duration"></div>
                <span>{getCurrTime(duration)}</span>
            </div>
        </section>
    )
}

//hour = 3,600,000