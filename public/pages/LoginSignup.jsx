const { Link } = ReactRouterDOM
const { useEffect, useState,useRef } = React
// import { FaUser, FaLock,FaEnvelope,CiUser  } from "react-icons/fa"; 
// import { CiUser } from "react-icons/ci";



import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js' 

export function LoginSignup({ onSetUser,onToggleUser}) {

    const [isSignup, setIsSignUp] = useState(false)
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())

    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        isSignup ? signup(credentials) : login(credentials)
    }

    function login(credentials) {
        userService.login(credentials)
            .then(onSetUser)
            .then(() => { showSuccessMsg('Logged in successfully') })
            .catch((err) => { showErrorMsg('Oops try again',err) })
    }

    function signup(credentials) {
        userService.signup(credentials)
            .then(onSetUser)
            .then(() => { showSuccessMsg('Signed in successfully') })
            .catch((err) => { showErrorMsg('Oops try again',err) })
    }

    return (
        <div>
            <div className={`wrapper ${isSignup ? 'active' : ''}`}>
            {/* <button className="close-button" onClick={() => onToggleUser('')}>x</button>  */}
            {/* <Link to="/bug" className="close-button">×</Link>    */}
                {/* login Form */}
                <div className={`form-box login ${!isSignup ? 'active' : ''}`}>
                    <form onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <div className='input-box'>
                            <input
                                type="text"
                                name="username"
                                value={credentials.username}
                                placeholder='Username'
                                onChange={handleChange}
                                required
                                autoFocus
                            />
                        </div>
                        <div className='input-box'>
                            <input
                                type="password"
                                name="password"
                                value={credentials.password}
                                placeholder='Password'
                                onChange={handleChange}
                                required
                                autoComplete="off"
                                
                            />
                            {/* <i className="fa-solid fa-lock"></i> */}
                            {/* <CiUser /> */}
                        </div>
                        <div className='remember-forgot'>
                            <label className="remember-me">
                                <input type="checkbox" />
                                Remember me
                            </label>
                            <Link to="#">Forgot password?</Link>
                        </div>
                        <button type='submit'>Login</button>
    
                        <div className='register-link'>
                            <p className='no-defult'>Don't have an account?
                                <Link to="#" onClick={() => setIsSignUp(true)}> Register </Link>
                            </p>
                        </div>
                    </form>
                </div>
    
                {/* signup Form */}
                <div className={`form-box register ${isSignup ? 'active' : ''}`}>
                    <form onSubmit={handleSubmit}>
                        <h1>Registration</h1>
                        <div className='input-box'>
                            <input
                                type="text"
                                name="username"
                                value={credentials.username}
                                placeholder='Username'
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='input-box'>
                            <input
                                type="text"
                                name="fullname"
                                value={credentials.fullname}
                                placeholder='Full name'
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='input-box'>
                            <input
                                type="password"
                                name="password"
                                value={credentials.password}
                                placeholder='Password'
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='remember-forgot'>
                            <label className='remember'>
                                <input type="checkbox" />
                                I agree to the terms & conditions
                            </label>
                        </div>
                        <button className="register-button" type='submit'>Register</button>
    
                        <div className='register-link'>
                            <p className='no-defults'>Already have an account?
                                <Link to="#" onClick={() => setIsSignUp(false)}> Login </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}    