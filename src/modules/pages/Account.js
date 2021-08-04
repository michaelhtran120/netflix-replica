import React, { useRef, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import background from '../../images/heist-background.jpeg'
import '../../css/account.css'


const Account = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmedRef = useRef()
    const { currentUser, updatePassword, updateEmail } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function handleSubmit(e){
        e.preventDefault(e)
        if(passwordRef.current.value !== passwordConfirmedRef.current.value) {
            return setError('Passwords do not match')
        }
        const promises = []
        setLoading(true)
        setError('')

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if(passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises)
            .then(()=>{
                history.push('/browse')
            })
            .catch((error)=>{
                setError(error.message)
            })
            .finally(()=>{
                setLoading(false)
            })
    }
    return (
        <div className='account-page'>
            <img src={background} alt={background} className='account-background'/>
            <div className='account-container'>
                <h2 className='account-title'>
                    Update Account Information
                </h2>
                {error && <p className='account-error-msg'>{error}</p>}
                <form class='account-form-container' onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input 
                        type='text'    
                        name='email' 
                        required ref={emailRef} 
                        placeholder='Email'
                        defaultValue={currentUser.email}
                        autoComplete='off'
                    />
                    <label>Password</label>
                    <input 
                        type='password' 
                        name='password' 
                        placeholder='Leave blank to keep the same password'
                        ref={passwordRef} 
                    />
                    <label>Confirm Password</label>
                    <input 
                        type='password' 
                        name='confirmPassword' 
                        placeholder='Leave blank to keep the same password'
                        ref={passwordConfirmedRef}
                    />
                    <button disabled={loading}type='submit'>Update</button>
                    </form>
                    <Link to='/browse' className="cancel-link" >Cancel</Link>
                </div>

        </div>
  

    )
}
export default Account
