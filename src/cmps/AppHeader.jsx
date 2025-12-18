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
			<div className='search-container'>
				<button className='home-btn' onClick={() => navigate('/')}>
					{location.pathname === '/' && 
					<svg data-encore-id="icon" role="img" color="white" aria-hidden="true" className="e-91000-icon e-91000-baseline" viewBox="0 0 24 24">
						<path d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732z"></path>
						</svg>
					}
					{location.pathname !== '/' && 
					<svg data-encore-id="icon" role="img" aria-hidden="true" className="home-icon e-91000-icon e-91000-baseline" viewBox="0 0 24 24">
						<path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732z"></path>
						</svg>
					}
					
					{/* <i className={`fa-${location.pathname === '/' ? 'solid' : 'regular'} fa-house`}></i> */}
				</button>
				<div className='search-bar'>
					<svg data-encore-id="icon" role="img" aria-hidden="true" className="magnifying-glass e-91000-icon e-91000-baseline MpoH5sdgCUbPL5LCl3Cy" data-testid="search-icon" viewBox="0 0 24 24" >
						<path d="M10.533 1.27893C5.35215 1.27893 1.12598 5.41887 1.12598 10.5579C1.12598 15.697 5.35215 19.8369 10.533 19.8369C12.767 19.8369 14.8235 19.0671 16.4402 17.7794L20.7929 22.132C21.1834 22.5226 21.8166 22.5226 22.2071 22.132C22.5976 21.7415 22.5976 21.1083 22.2071 20.7178L17.8634 16.3741C19.1616 14.7849 19.94 12.7634 19.94 10.5579C19.94 5.41887 15.7138 1.27893 10.533 1.27893ZM3.12598 10.5579C3.12598 6.55226 6.42768 3.27893 10.533 3.27893C14.6383 3.27893 17.94 6.55226 17.94 10.5579C17.94 14.5636 14.6383 17.8369 10.533 17.8369C6.42768 17.8369 3.12598 14.5636 3.12598 10.5579Z"></path>
						</svg>
					<input onChange={handleChange} value={txtFilter} type="text" id='header-search' placeholder='What do you want to play?' />
					{/* <i className="fa-solid fa-magnifying-glass"></i> */}
					
					{txtFilter && <div onClick={onClearTxt} className="xmark">
						<svg data-encore-id="icon" role="img" aria-hidden="true" className="e-91000-icon e-91000-baseline" viewBox="0 0 24 24"><path d="M3.293 3.293a1 1 0 0 1 1.414 0L12 10.586l7.293-7.293a1 1 0 1 1 1.414 1.414L13.414 12l7.293 7.293a1 1 0 0 1-1.414 1.414L12 13.414l-7.293 7.293a1 1 0 0 1-1.414-1.414L10.586 12 3.293 4.707a1 1 0 0 1 0-1.414"></path></svg>
						</div>}
				</div>

			</div>
			<NavLink to="login" className="login-link">Login</NavLink>
		</header>
	)
}
