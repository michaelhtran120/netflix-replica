import React, { useRef, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import '../../css/forgotpassword.css'
import logo from "../../images/logo.svg"


const ForgotPassword = () => {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [ error, setError ] = useState('')
    const [ message, setMessage ] = useState('')
    const [ loading, setLoading ] = useState(false)

    async function handleSubmit(e){
        e.preventDefault()

        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your email for further instructions')
        } catch (error){
            console.log(error)
            setError(error.message)
        }

        setLoading(false)
    }


    return (
        <>
        <img src={logo} className='forgot-password-logo' alt='logo'/>
        <div className='reset-password-container'>
            <h2>Password Reset</h2>
            {error && <p className='forgot-password-error'>{error}</p>}
            {message && <p className='forgot-password-message'>{message}</p>}
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type='email' ref={emailRef} required/>
                <button disabled={loading} className='reset-password-btn'>Reset Password</button>
            </form>
            <Link to='/login' className='return-login-btn'>Return to Log In</Link>
            <br/>
            <br/>
            <span>New to Netflix?</span> <Link to='/signup' className='return-signup-btn'>Sign up now!</Link>
        </div>
        </>
  

    )
}

export default ForgotPassword
