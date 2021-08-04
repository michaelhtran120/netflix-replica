import React, {useRef, useState, useEffect} from 'react'
import '../../css/signup.css'
import {useAuth} from '../../contexts/AuthContext'
import {Link, useHistory} from 'react-router-dom'
import '../../css/login.css'
import background from "../../images/landing-background.jpg";


const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [loading, setLoading] = useState(false)
    const [isEmailActive, setIsEmailActive] = useState(false);
    const [isPasswordActive, setIsPasswordActive] = useState(false);
    const [formValue, setFormValue] = useState(
        {
            email: '',
            password: ''
        })

    const history = useHistory()

    async function handleSubmit(e){
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push('/browse')
        } catch(error) {
            console.log(error)
            setError(error.message)
        }
        setLoading(false)
    }

    function handleChange(e){
        const { name, value } = e.target
        setFormValue(
            {
                ...formValue,
            [name]:value
        });

    }

    useEffect(() => {
        if (formValue.email === '' && formValue.password === ''){
            setIsEmailActive(false)
            setIsPasswordActive(false)
        } else if (formValue.email !== '' && formValue.password === ''){
            setIsEmailActive(true)
            setIsPasswordActive(false)
        } else if (formValue.email === '' && formValue.password !== ''){
            setIsEmailActive(false)
            setIsPasswordActive(true)
        } else {
            setIsEmailActive(true)
            setIsPasswordActive(true)
        }
    }, [formValue.email, formValue.password])

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
        <div className='login'>
            <img className='login-background' src={background} alt='background' />
            <div className='login-container'>
                <h1 className='login-title'>Log In</h1>
                <form onSubmit={handleSubmit}>
                    <div className='float-label'>
                        <input 
                            type='text' 
                            name='email' 
                            required ref={emailRef} 
                            value={formValue.email} 
                            onChange={(e)=>handleChange(e)}
                            onBlur={(e)=>handleEmailBlur(e)}
                            autoComplete='off'
                        />    
                        <label className={ isEmailActive ? 'Active' : '' }>Email</label>   
                        {emailError && <p className='login-error-msg'>{emailError}</p>}    
                     </div>  

                     <div className='float-label'>   
                        <input type='password' name='password' required ref={passwordRef} value={formValue.password} onChange={(e)=>handleChange(e)}/>
                        <label className={ isPasswordActive ? 'Active' : '' } >Password</label>
                        {error && <p className='login-error-msg'>{error}</p>}
                        
                    </div> 
                    <button disabled={loading}type='submit'>Log In</button>
                </form>
                <div className='forgot-password-container'>
                    <p>Forgot Password?</p><span><Link to='/forgot-password' >Click Here!</Link></span>
                </div>
                <div className='signup-link-container'>
                    <p>New to Netflix?</p> <span><Link to='/signup'>Sign Up Now!</Link></span>
                </div>
            </div>
        </div>
  

    )
}

export default Login

