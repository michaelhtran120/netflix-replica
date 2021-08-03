import React, {useRef, useState} from 'react'
import '../../css/signup.css'
import {useAuth} from '../../contexts/AuthContext'
import {Link, useHistory} from 'react-router-dom'


const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e){
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push('/browse')
        } catch {
            setError('Failed to sign in')
        }
        setLoading(false)
    }

    return (
            <div className='signup-container'>
                <h1>Log In</h1>
                <p>{currentUser && currentUser.email}</p>
                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input type='email' placeholder=
                    'Email Address' required ref={emailRef}/>                
                    <label>Password</label>
                    <input type='password' placeholder=
                    'Password' required ref={passwordRef}/>
                    <button disabled={loading}type='submit'>Sign In</button>
                </form>
                Need an account? <Link to='/signup'>Click Here!</Link>
            </div>
  

    )
}

export default Login

