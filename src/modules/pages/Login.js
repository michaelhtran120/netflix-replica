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
    const [loading, setLoading] = useState(false)
    const [isEmailActive, setIsEmailActive] = useState(false);
    const [isPasswordActive, setIsPasswordActive] = useState(false);
    const [formValue, setFormValue] = useState(
        {
            email: '',
            password: ''
        }
        )

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


    return (
        <div className='login'>
            <img className='login-background' src={background} alt='background' />
            <div className='login-container'>
                <h1 className='login-title'>Log In</h1>
                <p>{currentUser && currentUser.email}</p>
                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className='float-label'>
                        <input type='email' name='email' required ref={emailRef} value={formValue.email} onChange={(e)=>handleChange(e)}/>    
                        <label className={ isEmailActive ? 'Active' : '' }>Email</label>   
                     </div>  
                     <div className='float-label'>   
                        <input type='password' name='password' required ref={passwordRef} value={formValue.password} onChange={(e)=>handleChange(e)}/>
                        <label className={ isPasswordActive ? 'Active' : '' } >Password</label>
                    </div> 
                    <button disabled={loading}type='submit'>Log In</button>
                </form>
                <p>Forgot Password?</p><Link >Click Here!</Link>
                <p>New to Netflix?</p> <Link to='/signup'>Sign Up Now!</Link>
            </div>
        </div>
  

    )
}

export default Login

