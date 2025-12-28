import { useEffect, useRef, useState } from 'react'
import { FooterTrackPreview } from './FooterTrackPreview.jsx'
import { PlayerControls } from './PlayerControls.jsx'
import { VolumeControl } from './VolumeControl.jsx'
import { useSelector } from 'react-redux'
import { YtPlayer } from '../YtPlayer.jsx'
import { playerActions } from '../../store/actions/player.actions.js'
import { useContextMenu } from '../OptionMenuProvider.jsx'
import { makeId } from '../../services/util.service.js'
import { toggleLikedTrack } from '../../store/actions/user.actions.js'

export function AppFooter() {
	const track = useSelector(state => state.playerModule.track)
	const trackList = useSelector(state => state.playerModule.trackList)

	const [isPlaying, setIsPlaying] = useState(false)
	const [duration, setDuration] = useState(null)
	const [currTime, setCurrTime] = useState(null)
	const [volume, setVolume] = useState(50)
	const lastVolume = useRef(50)

	const intervalTimeRef = useRef(null)
	const volumeRef = useRef(null)

	const playerRef = useRef(null)
	const { openContextMenu } = useContextMenu()

	useEffect(() => {
		volumeRef.current.style.setProperty('--fill', `${volume}%`)
	}, [])

	function onReady({ target }) {
		playerRef.current = target
		target.playVideo()
		playerRef.current.setVolume(volume)
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
			}, 500)
		}

		if (
			event.data === window.YT.PlayerState.PAUSED ||
			event.data === window.YT.PlayerState.ENDED
		) {
			setIsPlaying(false)
			clearInterval(intervalTimeRef.current)

			if (event.data === window.YT.PlayerState.ENDED) {
				playerActions.playPrevNextTrack(1)
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

	function onPrevNext(value) { //arg = -1 || 1
		playerActions.playPrevNextTrack(value)
	}

	function checkPrevNext(value) { //arg = -1 || 1
		const track = playerActions.getPrevNextTrack(value)
		return track ? true : false
	}


	function onShuffle() {
		playerActions.onShuffle()
	}

	function onVolumeBtn() {
		const newVolume = volume ? 0 : lastVolume.current
		lastVolume.current = volume
		setVolume(newVolume)
		playerRef.current.setVolume(newVolume)
		volumeRef.current.style.setProperty('--fill', `${newVolume}%`)
	}

	function onVolume({ target }) { //value from 0-100
		const value = target.value
		lastVolume.current = value
		setVolume(value)
		playerRef.current.setVolume(value)
		volumeRef.current.style.setProperty('--fill', `${value}%`)
	}

	function onAdd() {
		toggleLikedTrack(track)
	}
	function onTilte() {
		
	}
	function onArtist() {
		
	}

	function handleOpenMenu({ x, y, context }) {
		// const { track } = context
		//const isInStation = false // for now
		// const isLiked = true
		// let actions = [
		// 	{ id: makeId(), icon: 'add', name: 'Add to playlist', callback: () => onAddToStation(track), }, // TODO (add to a different playlist) dropdown
		// 	isLiked ? { id: makeId(), icon: 'remove', name: 'Remove from your Liked Songs', callback: () => onToggleLiked(track), }
		// 		: { id: makeId(), icon: 'save', name: 'Save to your Liked Songs', callback: () => onToggleLiked(track), },
		// 	{ id: makeId(), icon: 'queue', name: 'Add to queue', callback: () => { }, }, // TODO
		// 	{ id: makeId(), icon: 'radio', name: 'Go to song radio', callback: () => { }, }, // TODO
		// 	{ id: makeId(), icon: 'artist', name: 'Go to artist', callback: () => { }, }, // TODO
		// 	{ id: makeId(), icon: 'album', name: 'Go to album', callback: () => { }, }, // TODO - make a dropdown cmp
		// 	{ id: makeId(), icon: 'share', name: 'Share', callback: () => { }, }, // TODO
		// ]
		// openContextMenu({
		// 	x,
		// 	y,
		// 	context,
		// 	actions,
		// })
	}

	return (
		<>
			{track && <YtPlayer videoId={track.videoId} onReady={onReady} onPlayerStateChange={onPlayerStateChange} />}
			<footer className="app-footer">
				<FooterTrackPreview openContextMenu={handleOpenMenu} track={track} onAdd={onAdd} onTilte={onTilte} onArtist={onArtist} />
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
				<VolumeControl volume={volume} onVolume={onVolume} onVolumeBtn={onVolumeBtn} volumeRef={volumeRef} />
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


