import { useEffect } from 'react'

export function GoogleLoginButton({ onLogin }) {
    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id:
                '237503464504-c08kj67amrvgbpc4mj209122vf8956vk.apps.googleusercontent.com',
            callback: handleResponse,
        })
        google.accounts.id.renderButton(document.getElementById('google-btn'), {
            theme: 'outline',
            size: 'large',
            shape: 'pill',
            theme: 'filled_black',
        })
    }, [])

    function handleResponse(response) {
        onLogin(response.credential)
    }

    return <div id="google-btn" className="google-built-in"></div>
}

// function handleClick() {
//     /* global google */
//     google.accounts.id.login({
//         callback: handleResponse,
//     })
// }

// <button className="google-login" onClick={handleClick}>
//     Continue with Google
// </button>

// function loginWithGoogle() {
//     const params = new URLSearchParams({
//         client_id: 'YOUR_CLIENT_ID',
//         redirect_uri: 'https://yourapp.com/auth/google/callback',
//         response_type: 'code',
//         scope: 'openid email profile',
//         access_type: 'offline',
//         prompt: 'consent',
//     })

//     window.location.href =
//         'https://accounts.google.com/o/oauth2/v2/auth?' + params.toString()
// }

{
    /* <button onClick={loginWithGoogle}>
    Continue with Google
</button> */
}

// GET /auth/google/callback?code=...
// POST https://oauth2.googleapis.com/token
