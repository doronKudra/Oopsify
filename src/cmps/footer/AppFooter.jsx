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
	const trackList = useSelector(state => state.playerModule.trackList)

	const [isPlaying, setIsPlaying] = useState(false)
	const [duration, setDuration] = useState(null)
	const [currTime, setCurrTime] = useState(null)
	const [volume, setVolume] = useState(100)
	const lastVolume = useRef(100)

	const intervalTimeRef = useRef(null)

	// const currTime = playerRef.current.getCurrentTime()
	// getDuration() will return 0 until the video's metadata is loaded, which normally happens just after the video starts playing.
	const playerRef = useRef(null)

	function onReady({ target }) {
		playerRef.current = target
		target.playVideo()
		console.log('target:', target)
	}

	function onPlayerStateChange(event) {
		if (!playerRef.current) return

		if (event.data === window.YT.PlayerState.PLAYING) {
			setIsPlaying(true)

			const dur = playerRef.current.getDuration()
			if (dur) setDuration(dur)

			clearInterval(intervalTimeRef.current)
			intervalTimeRef.current = setInterval(() => {
				setCurrTime(playerRef.current.getCurrentTime())
			}, 250)
		}

		if (
			event.data === window.YT.PlayerState.PAUSED ||
			event.data === window.YT.PlayerState.ENDED
		) {
			setIsPlaying(false)
			clearInterval(intervalTimeRef.current)

			if (event.data === window.YT.PlayerState.ENDED) {
				console.log('track ended')
				//playerActions.PlayPrevNextTrack()
			}
		}
	}


	function onPause() {
		if (!playerRef.current) return
		playerRef.current.pauseVideo()
	}

	function onPlay() {
		if (!playerRef.current) return
		playerRef.current.playVideo()
	}

	function onProgressBar(value, isMouseUp) {
		if (!playerRef.current || !duration) return
		playerRef.current.seekTo((value / 1000) * duration, isMouseUp)
		setCurrTime((value / 1000) * duration)
		if (!isMouseUp) clearInterval(intervalTimeRef.current)
	}

	function onPrevNext(value) { //param = -1 || 1
		playerActions.playPrevNextTrack(value)
	}

	function checkPrevNext(value) { //param = -1 || 1
		const track = playerActions.getPrevNextTrack(value)
		return track ? true : false
	}
	
	
	function onShuffle() {
		playerActions.onShuffle()
	}

	function onVolumeBtn() {
		const newVolume = volume ? 0:lastVolume.current 
		lastVolume.current = volume
		setVolume(newVolume)
		playerRef.current.setVolume(newVolume)
	}
	
	function onVolume({target}) { //value from 0-100
		const value = target.value
		lastVolume.current = value
		setVolume(value)
		playerRef.current.setVolume(value)
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
			{track && <YtPlayer videoId={track.videoId} onReady={onReady} onPlayerStateChange={onPlayerStateChange} />}
			<footer className="app-footer">
				<FooterTrackPreview track={track} onAdd={onAdd} onTilte={onTilte} onArtist={onArtist} />
				<PlayerControls
					trackList={trackList}
					isPlaying={isPlaying}
					currTime={currTime}
					duration={duration}
					onPlay={onPlay}
					onPause={onPause}
					onProgressBar={onProgressBar}
					onPrevNext={onPrevNext}
					checkPrevNext={checkPrevNext}
					onShuffle={onShuffle}
				/>
				<VolumeControl volume={volume} onVolume={onVolume} onVolumeBtn={onVolumeBtn} />
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


