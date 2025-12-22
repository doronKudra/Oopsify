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
	const isPlaying = useSelector(state => state.playerModule.isPlaying)
	console.log('currTrack:', track)

	const playerRef = useRef(null)
	const [currTime,setCurrTime] = useState(null)

	function onReady({ target }) {
		playerRef.current = target
		target.playVideo()
		playerActions.onPlay()
		// setCurrTime(target.)
		console.log('target:',target)
	}

	function onPause() {
		if (!playerRef.current) return
		playerRef.current.pauseVideo()
		playerActions.onPause()
	}
	
	function onPlay() {
		if (!playerRef.current) return
		playerRef.current.playVideo()
		playerActions.onPlay()
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
				<PlayerControls  currTime={0} duration={track?.duration} onPause={onPause} onPlay={onPlay} isPlaying={isPlaying}  />
				<VolumeControl />
			</footer>
		</>
	)
}