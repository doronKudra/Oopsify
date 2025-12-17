import { TrackInfo } from './TrackInfo'
import { PlayerControls } from './PlayerControls'
import { VolumeControl } from './VolumeControl'

export function AppFooter() {
	const currentTrack = 'Billy Jean'
	const isPlaying = false
	return (
		<footer className="player full">
			<TrackInfo track={currentTrack} />
			<PlayerControls isPlaying={isPlaying} />
			<VolumeControl />
		</footer>
	)
}