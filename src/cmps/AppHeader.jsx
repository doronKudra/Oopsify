import { Link, NavLink } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router'
import { useState } from 'react'
// import { useSelector } from 'react-redux'
// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
// import { logout } from '../store/actions/user.actions'


export function AppHeader({on}) {
	const navigate = useNavigate()
	const location = useLocation()

	const [txtFilter,setTxtFilter] = useState('')

	function handleChange({target}) {
		setTxtFilter(target.value)
	}

	function onClearTxt() {
        setTxtFilter('')
    }

	return (
		<header className="app-header">
			<i className="fa-brands fa-spotify" onClick={() => navigate('/')}></i>
			<div>
				<button className='home-btn' onClick={() => navigate('/')}>
					<i className={`fa-${location.pathname === '/' ? 'solid' : 'regular'} fa-house`}></i>
				</button>
				<div  className='search-container'>
					<input onChange={handleChange} value={txtFilter} type="text" id='header-search' placeholder='What do you want to play?' />
					<i className="fa-solid fa-magnifying-glass"></i>
					{txtFilter && <i onClick={onClearTxt} className="fa-solid fa-xmark"></i>}
				</div>

			</div>

			<NavLink to="login" className="login-link">Login</NavLink>
		</header>
	)
}
