import React, {useRef, useState} from 'react'
import background from "../../images/landing-background.jpg";
import '../../css/signup.css'
import {useAuth} from '../../contexts/AuthContext'
import {Link, useHistory} from 'react-router-dom'


const Signup = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmedRef = useRef()
    const { signup, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e){
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmedRef.current.value){
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push('/browse')
        } catch {
            setError('Failed to create an account')
        }
        setLoading(false)
    }

    return (
        <div>
            <img className='signup-background' src={background} alt='background' />
            <div className='signup-container'>
                <h1 className='signup-title'>Sign Up</h1>
                <p>{currentUser && currentUser.email}</p>
                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input type='email' placeholder=
                    'Email Address' required ref={emailRef}/>                
                    <label>Password</label>
                    <input type='password' placeholder=
                    'Password' required ref={passwordRef}/>

                    <label>Password Confirmation</label>
                    <input type='password' placeholder=
                    'Password' required ref={passwordConfirmedRef}/>
                    <button disabled={loading}type='submit'>Sign Up</button>
                </form>
                <p>Already have an account?</p><Link to='/login'><p>Log In</p></Link>
            </div>
        </div>
  

    )
}

export default Signup
