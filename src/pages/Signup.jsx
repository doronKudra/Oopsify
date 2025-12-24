// import { useState } from 'react'
// import { useNavigate } from 'react-router'
// import { signup } from '../store/actions/user.actions'
// import { ImgUploader } from '../cmps/ImgUploader'
// import { userService } from '../services/user'

// export function LoginSignup() {
//     // const [credentials, setCredentials] = useState(userService.getEmptyUser())
//     // const navigate = useNavigate()

//     // function clearState() {
//     //     setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
//     // }

//     // function handleChange(ev) {
//     //     const type = ev.target.type
//     //     const field = ev.target.name
//     //     const value = ev.target.value
//     //     setCredentials({ ...credentials, [field]: value })
//     // }

//     // async function onSignup(ev = null) {
//     //     if (ev) ev.preventDefault()

//     //     if (!credentials.username || !credentials.password || !credentials.fullname) return
//     //     await signup(credentials)
//     //     clearState()
//     //     navigate('/')
//     // }

//     // function onUploaded(imgUrl) {
//     //     setCredentials({ ...credentials, imgUrl })
//     // }

//     // onSubmit={onSignup}
//     const isSignup = true
//     return (
//         <div className="login-signup">
//             <div className="logo-container">{/* SVG stays the same */}</div>

//             <h1 className="loginsignup-header">
//                 {isSignup ? 'Sign up to start listening' : 'Welcome back'}
//             </h1>

//             <form className="auth-card" 
//             // onSubmit={onSubmit}
//             >
//                 <label htmlFor="email">
//                     {isSignup ? 'Email address' : 'Email or username'}
//                 </label>

//                 <input
//                     id="email"
//                     type="email"
//                     name="email"
//                     required
//                     // value={email}
//                     // onChange={(ev) => setEmail(ev.target.value)}
//                 />

//                 <button type="submit">{isSignup ? 'Next' : 'Continue'}</button>
//             </form>

//             <p className="separator">Or</p>

//             <div className="social-login">
//                 <button className="google-login">Continue with Google</button>
//                 <button className="google-facebook">
//                     Continue with Facebook
//                 </button>
//                 <button className="google-apple">Continue with Apple</button>
//             </div>

//             <div className="other-option">
//                 {isSignup ? (
//                     <>
//                         <span>Already have an account?</span>
//                         <button
//                             type="button"
//                             onClick={() => navigate('/login')}
//                         >
//                             Log in
//                         </button>
//                     </>
//                 ) : (
//                     <>
//                         <span>Don't have an account?</span>
//                         <button
//                             type="button"
//                             onClick={() => navigate('/signup')}
//                         >
//                             Sign up
//                         </button>
//                     </>
//                 )}
//             </div>
//         </div>
//     )
// }
