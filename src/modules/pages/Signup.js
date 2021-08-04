import React, {useRef, useState, useEffect} from 'react'
import background from "../../images/landing-background.jpg";
import '../../css/signup.css'
import {useAuth} from '../../contexts/AuthContext'
import {Link, useHistory} from 'react-router-dom'


const Signup = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmedRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [loading, setLoading] = useState(false)
    const [formValue, setFormValue] = useState(
        {
            email: '',
            password: '',
            confirmPassword: '',
        })
    const [isEmailActive, setIsEmailActive] = useState(false);
    const [isPasswordActive, setIsPasswordActive] = useState(false);
    const [isConfirmPasswordActive, setIsConfirmPasswordActive] = useState(false);
    const history = useHistory()

    function handleChange(e){
        const { name, value } = e.target
        setFormValue(
            {
                ...formValue,
            [name]:value
        });
    }

    useEffect(()=>{
        if (formValue.email === ''){
            setIsEmailActive(false)
        } else {
            setIsEmailActive(true)
        }
    }, [formValue.email])

    useEffect(()=>{
        if (formValue.password === ''){
            setIsPasswordActive(false)
        } else {
            setIsPasswordActive(true)
        }
    }, [formValue.password])
    
    useEffect(()=>{
        if (formValue.confirmPassword === ''){
            setIsConfirmPasswordActive(false)
        } else {
            setIsConfirmPasswordActive(true)
        }
    }, [formValue.confirmPassword])

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
        } catch (error){
            if(error.message === 'The email address is badly formatted.'){
                setEmailError('Invalid email')
            } else if (error.message === 'Password should be at least 6 characters'){
                setError(error.message)
            } else {
                setEmailError(error.message)
            }

            console.log(error)
        }
        setLoading(false)
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }

     function handleEmailBlur(e) {
         if (validateEmail(e.target.value) === true){
             setEmailError('')
         } else {
             setEmailError('Please enter valid email')
         }

     }

    return (
        <div>
            <img className='signup-background' src={background} alt='background' />
            <div className='signup-container'>
                <h1 className='signup-title'>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className='signup-float-label'>
                    <input 
                        type='text'    
                        name='email' 
                        required ref={emailRef} 
                        onBlur={(e)=>handleEmailBlur(e)} 
                        className={emailError && 'invalid'} 
                        onChange={(e)=>handleChange(e)}
                        autoComplete='off'
                    />
                    <label className={ isEmailActive ? 'Active' : '' }>Email</label>
                    {emailError && <p className='error-msg'>{emailError}</p>}    
                    </div>
   
                    <div className='signup-float-label'>
                        <input 
                            type='password' 
                            name='password' 
                            required ref={passwordRef} 
                            className={error && 'invalid'} 
                            onChange={(e)=>handleChange(e)}
                        />
                        <label className={ isPasswordActive ? 'Active' : '' } >Password</label>
                        {error && <p className='error-msg'>{error}</p>}
                    </div>

                    <div className='signup-float-label'>
                        <input 
                            type='password' 
                            name='confirmPassword' 
                            required ref={passwordConfirmedRef} className={error && 'invalid'} 
                            onChange={(e)=>handleChange(e)}
                        />
                        <label className={ isConfirmPasswordActive ? 'Active' : ''} >Confirm Password</label>
                        {error && <p className='error-msg'>{error}</p>}
                    </div>


                    <button disabled={loading}type='submit'>Sign Up</button>
                </form>
                <div className='login-link-container'>
                    <p>Already have an account?</p>
                    <span><Link to='/login' className="login-link" >Log In</Link></span>
                </div>
            </div>
        </div>
  

    )
}

export default Signup
