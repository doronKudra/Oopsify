import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
// import { useSelector } from 'react-redux'
// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
// import { logout } from '../store/actions/user.actions'
import logoSvg from '../assets/images/icons/spotify-brands-solid.svg'
import homeSvg from '../assets/images/icons/house-regular.svg'

export function AppHeader() {
	const navigate = useNavigate()

	return (
		<header className="app-header">
			<button to="/" className="logo"><img src={logoSvg} alt="" />
			</button>
			<button className='home-btn' onClick={() => navigate('/')}> <img src={homeSvg} alt="" /></button>
			<input type="text" />

			<NavLink to="login" className="login-link">Login</NavLink>
		</header>
	)
}
