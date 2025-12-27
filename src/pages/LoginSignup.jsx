import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { signup, login } from '../store/actions/user.actions'
import { userService } from '../services/user'
import { GoogleLoginButton } from '../cmps/GoogleLoginButton'
import { jwtDecode } from 'jwt-decode'

export function LoginSignup({ isSignup }) {
    const [credentials, setCredentials] = useState(userService.getEmptyUser())
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    
    async function onLoginSignup(ev) {
        ev.preventDefault()        
        
        const newErrors = validateAll()
        if (Object.keys(newErrors).length > 0) return
        
        try {
            if (isSignup) await signup(credentials)
                else await login(credentials)
        } catch (err) {
            if (err.response?.status === 400 ) setErrors({server:"This email already has an account."})
            else if (err.response?.status === 402 ) setErrors({server:"Incorrect username or password."})
                else setErrors({ server: 'Something went wrong... please try again later.' })
            return
        }
        
        clearState()
        navigate('/')
    }
    
    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials((prev) => ({ ...prev, [field]: value }))
        validateField(field, value)
    }
    
    function validateAll() {
        const newErrors = {}
        
        // Email
        if (!credentials.username.trim())
            newErrors.username = 'Email is required'
        else if (!/^\S+@\S+\.\S+$/.test(credentials.username))
            newErrors.username = 'Enter a valid email address'
        // Password
        if (!credentials.password.trim())
            newErrors.password = 'Password is required'
        else if (credentials.password.length < 6)
            newErrors.password = 'Password must be at least 6 characters'
        
        // Full name (signup only)
        if (isSignup) {
            if (!credentials.fullname.trim())
                newErrors.fullname = 'Full name is required'
        }
        
        setErrors(newErrors)
        return newErrors
    }
    
    
    // Live validation while typing
    function validateField(name, value) {
        const newErrors = { ...errors }
        
        if (name === 'username') {
            if (!value.trim()) newErrors.username = 'Email is required'
            else if (!/^\S+@\S+\.\S+$/.test(value))
                newErrors.username = 'Enter a valid email address'
            else delete newErrors.username
        }
        
        if (name === 'password') {
            if (!value.trim()) newErrors.password = 'Password is required'
            else if (value.length < 6)
                newErrors.password = 'Password must be at least 6 characters'
            else delete newErrors.password
        }
        
        if (name === 'fullname') {
            if (!value.trim()) newErrors.fullname = 'Full name is required'
            else delete newErrors.fullname
        }
        
        setErrors(newErrors)
    }
    
    function handleGoogleLogin(credential) {
        const googleUser = jwtDecode(credential)
        
        const user = {
            fullname: googleUser.name,
            username: googleUser.email,
            imgUrl: googleUser.picture,
        }
        signup(user)
        navigate('/')
    }
    
    const guestUser = {
        fullname: 'Guest User',
        username: 'guest',
        password: 'guest',
        imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
    }
    
    function onLoginAsGuest() {
        login(guestUser)
        navigate('/')
    }
    
    function clearState() {
        setCredentials(userService.getEmptyUser())
    }
    
    return (
        <div className="login-signup">
            <div className="loginsignup-header-area">
                <div className="logo-container">
                    <svg
                        role="img"
                        viewBox="0 0 24 24"
                        aria-label="Spotify"
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                    >
                        {' '}
                        <title>Spotify</title>{' '}
                        <path
                            fill="#FFFFFF"
                            d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.155 17.337a.748.748 0 0 1-1.03.278c-2.824-1.73-6.37-2.123-10.557-1.17a.75.75 0 1 1-.33-1.46c4.62-1.046 8.57-.59 11.66 1.36a.748.748 0 0 1 .257.992zm1.47-3.258a.936.936 0 0 1-1.285.348c-3.23-1.98-8.15-2.56-11.94-1.4a.937.937 0 1 1-.55-1.79c4.3-1.32 9.77-.67 13.39 1.57a.936.936 0 0 1 .385 1.27zm.13-3.39a1.122 1.122 0 0 1-1.54.417c-3.7-2.21-9.36-2.41-13.03-1.32a1.125 1.125 0 0 1-.64-2.15c4.3-1.28 10.67-1.05 15 1.57a1.12 1.12 0 0 1 .21 1.48z"
                        />{' '}
                    </svg>
                </div>
                <h1 className="loginsignup-header">
                    {isSignup ? 'Sign up to start listening' : 'Welcome back'}
                </h1>
            </div>

            <form className="auth-card" onSubmit={onLoginSignup}>
                <label htmlFor="username">Email address</label>
                <input
                    id="username"
                    type="email"
                    name="username"
                    required
                    value={credentials.username}
                    onChange={handleChange}
                />
                {errors.username && <p className="error">{errors.username}</p>}
                {errors.server && <p className="error">{errors.server}</p>}

                <label htmlFor="password">
                    {isSignup ? 'Create a password' : 'Password'}
                </label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    required
                    value={credentials.password}
                    onChange={handleChange}
                />

                {errors.password && <p className="error">{errors.password}</p>}

                {isSignup && (
                    <>
                        <label htmlFor="fullname">Full Name</label>
                        <input
                            id="fullname"
                            type="text"
                            name="fullname"
                            required
                            value={credentials.fullname}
                            onChange={handleChange}
                        />
                        {errors.fullname && (
                            <p className="error">{errors.fullname}</p>
                        )}
                    </>
                )}

                <button type="submit">{isSignup ? 'Sign Up' : 'Log In'}</button>
            </form>

            <p className="separator">Or</p>

            <div className="social-login">
                {isSignup && (
                    <div className="social-login">
                        <GoogleLoginButton onLogin={handleGoogleLogin} />
                    </div>
                )}
                <button className="apple-login">Continue with Apple</button>
                <button className="guest-btn" onClick={onLoginAsGuest}>
                    Continue as Guest
                </button>
            </div>

            <div className="other-option">
                {isSignup ? (
                    <>
                        <span>Already have an account?</span>
                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                        >
                            Log in
                        </button>
                    </>
                ) : (
                    <>
                        <span>Don't have an account?</span>
                        <button
                            type="button"
                            onClick={() => navigate('/signup')}
                        >
                            Sign up
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}
