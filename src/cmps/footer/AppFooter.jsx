import { useEffect, useRef, useState } from 'react'
import { store } from '../../store/store.js'
import { FooterTrackPreview } from './FooterTrackPreview.jsx'
import { PlayerControls } from './PlayerControls.jsx'
import { VolumeControl } from './VolumeControl.jsx'
import { spotifyService } from '../../services/spotifyService.js'
import { UPDATE_CURRENT_TRACK } from '../../store/reducers/player.reducer.js'
import { useSelector } from 'react-redux'
import { YtPlayer } from '../YtPlayer.jsx'
import { playerActions } from '../../store/actions/player.actions.js'

export function AppFooter() {
	const track = useSelector(state => state.playerModule.track)
	const [isPlaying, setIsPlaying] = useState(false)
	const [duration, setDuration] = useState(null)
	const [currTime, setCurrTime] = useState(null)

	// const currTime = playerRef.current.getCurrentTime()
// getDuration() will return 0 until the video's metadata is loaded, which normally happens just after the video starts playing.
	const playerRef = useRef(null)

	function onReady({ target }) {
		playerRef.current = target
		target.playVideo()
		setIsPlaying(true)
		const trackDuration = playerRef.current.getDuration()
		console.log('duration:',duration)
		setDuration(trackDuration)
		console.log('target:', target)
	}

	function onPause() {
		if (!playerRef.current) return
		playerRef.current.pauseVideo()
		setIsPlaying(false)
	}

	function onPlay() {
		if (!playerRef.current) return
		playerRef.current.playVideo()
		setIsPlaying(true)
	}

	function onProgressBar(time, isMouseUp) {
		console.log('time:', time)
		if (!playerRef.current) return
		playerRef.current.seekTo(time, isMouseUp)
	}

	function onVolume() {
		//target.setVolume
	}

	function onAdd() {
		console.log('adding...:')
	}
	function onTilte() {
		console.log('titling...:')
	}
	function onArtist() {
		console.log('artisting...:')
	}


	return (
		<>
			{track && <YtPlayer videoId={track.videoId} onReady={onReady} />}
			<footer className="app-footer">
				<FooterTrackPreview track={track} onAdd={onAdd} onTilte={onTilte} onArtist={onArtist} />
				<PlayerControls onProgressBar={onProgressBar} currTime={currTime} duration={duration} onPause={onPause} onPlay={onPlay} isPlaying={isPlaying} />
				<VolumeControl />
			</footer>
		</>
	)
}

// 1. player.playVideo():Void   //player state after this function executes - playing (1)
// 2. player.pauseVideo():Void  //player state after this function executes will be paused (2) -
//     unless the player is in the ended (0) state when the function is called, in which case the player state will not change.
// 3. player.stopVideo():Void Stops and cancels loading of the current video.(for rare cases)
// !4. player.seekTo(seconds:Number, allowSeekAhead:Boolean):Void // set to false when draging the video progress and when mouse up set to true.
//
// 


