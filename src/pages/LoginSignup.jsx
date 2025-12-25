import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { signup, login } from '../store/actions/user.actions'
import { userService } from '../services/user'
import { GoogleLoginButton } from '../cmps/GoogleLoginButton'
import { jwtDecode } from 'jwt-decode'

export function LoginSignup({ isSignup }) {
    const dispatch = useDispatch()
    const [credentials, setCredentials] = useState(userService.getEmptyUser())
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    function clearState() {
        setCredentials(userService.getEmptyUser())
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
        if (!credentials.userName.trim())
            newErrors.userName = 'Email is required'
        else if (!/^\S+@\S+\.\S+$/.test(credentials.userName))
            newErrors.userName = 'Enter a valid email address'

        // Password
        if (!credentials.password.trim())
            newErrors.password = 'Password is required'
        else if (credentials.password.length < 6)
            newErrors.password = 'Password must be at least 6 characters'

        // Full name (signup only)
        if (isSignup) {
            if (!credentials.fullName.trim())
                newErrors.fullName = 'Full name is required'
        }

        setErrors(newErrors)
        return newErrors
    }

    async function onLoginSignup(ev) {
        if (ev) ev.preventDefault()

        const newErrors = validateAll()
        if (Object.keys(newErrors).length > 0) return

        try {
            if (isSignup) await signup(credentials)
            else await login(credentials)
        } catch (err) {
            setErrors({ server: err.message })
            return
        }

        clearState()
        navigate('/')
    }

    // Live validation while typing
    function validateField(name, value) {
        const newErrors = { ...errors }

        if (name === 'userName') {
            if (!value.trim()) newErrors.userName = 'Email is required'
            else if (!/^\S+@\S+\.\S+$/.test(value))
                newErrors.userName = 'Enter a valid email address'
            else delete newErrors.userName
        }

        if (name === 'password') {
            if (!value.trim()) newErrors.password = 'Password is required'
            else if (value.length < 6)
                newErrors.password = 'Password must be at least 6 characters'
            else delete newErrors.password
        }

        if (name === 'fullName') {
            if (!value.trim()) newErrors.fullName = 'Full name is required'
            else delete newErrors.fullName
        }

        setErrors(newErrors)
    }

    function handleGoogleLogin(credential) {
        const googleUser = jwtDecode(credential)

        const user = {
            id: googleUser.sub,
            fullName: googleUser.name,
            userName: googleUser.email,
            imgUrl: googleUser.picture,
            likedStations: [],
            likedTracks: {
                name: 'Liked Songs',
                tracks: [],
                createdBy: googleUser.email,
                images: [{ url: '/src/assets/images/liked-songs.png' }],
                id: 'liked-songs',
            },
        }
        // dispatch({ type: SET_USER, user })
        signup(user)
        // navigate('/')
    }

    return (
        <div className="login-signup">
            <div className="loginsignup-header-area">
                <div className="logo-container">{/* SVG unchanged */}</div>
                <h1 className="loginsignup-header">
                    {isSignup ? 'Sign up to start listening' : 'Welcome back'}
                </h1>
            </div>

            <form className="auth-card" onSubmit={onLoginSignup}>
                <label htmlFor="userName">Email address</label>
                <input
                    id="userName"
                    type="email"
                    name="userName"
                    required
                    value={credentials.userName}
                    onChange={handleChange}
                />
                {errors.userName && <p className="error">{errors.userName}</p>}
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
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            id="fullName"
                            type="text"
                            name="fullName"
                            required
                            value={credentials.fullName}
                            onChange={handleChange}
                        />
                        {errors.fullName && (
                            <p className="error">{errors.fullName}</p>
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
                <button className="guest-login">Continue as Guest</button>
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
