import { FooterTrackPreview } from './FooterTrackPreview.jsx'
import { PlayerControls } from './PlayerControls.jsx'
import { VolumeControl } from './VolumeControl.jsx'

export function AppFooter() {
	const currentTrack = 'Billy Jean'
	const isPlaying = false

	//FooterTrackPreview
	function onAdd() {
		console.log('adding...:')
	}
	function onTilte() {
		console.log('titling...:')
	}
	function onArtist() {
		console.log('artising...:')
	}



	return (
		<footer className="app-footer">
			<FooterTrackPreview onAdd={onAdd} onTilte={onTilte} onArtist={onArtist} />
			<div className='control-container'>
				<PlayerControls currTime={60000 *25.642} duration={60000 *31.5} />
			</div>
			<VolumeControl />
		</footer>
	)
}