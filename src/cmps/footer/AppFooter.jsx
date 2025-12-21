import { useEffect } from 'react'
import { store } from '../../store/store.js'
import { FooterTrackPreview } from './FooterTrackPreview.jsx'
import { PlayerControls } from './PlayerControls.jsx'
import { VolumeControl } from './VolumeControl.jsx'
import { spotifyService } from '../../services/spotifyService.js'
import { UPDATE_CURRENT_TRACK } from '../../store/reducers/station.reducer.js'
import { useSelector } from 'react-redux'

export function AppFooter() {
	const currTrack = useSelector(state => state.stationModule.currTrack)
	console.log('currTrack:', currTrack)
	useEffect(() => {
		store.dispatch({ type: UPDATE_CURRENT_TRACK, track: spotifyService.getDemoTrack() })
	}, [])

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
		<footer className="app-footer">
			<FooterTrackPreview currTrack={currTrack} onAdd={onAdd} onTilte={onTilte} onArtist={onArtist} />
			<PlayerControls currTime={60000} duration={currTrack?.duration} />
			<VolumeControl />
		</footer>
	)
}