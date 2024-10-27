const { Link } = ReactRouterDOM
const { useEffect, useState, useRef } = React
// import { FaUser, FaLock,FaEnvelope,CiUser  } from "react-icons/fa"; 
// import { CiUser } from "react-icons/ci";
// import { FaBeer } from "@react-icons/all-files/fa/FaBeer";

// import { FaBeer } from 'react-icons/fa';
// import { FaBeer } from './lib/MyIcons';
import { IconBeer, IconHome, IconUser } from '../lib/Icons.js';



import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'

export function LoginSignup({ onSetUser, onToggleUser, onLogout }) {

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
            .then((user) => {
                console.log('user', user);

                onSetUser(user)
            })
            .then(() => { showSuccessMsg('Logged in successfully') })
            .catch((err) => { showErrorMsg('Oops try again', err) })
            .finally(() => {
                //! a test for me
                if (typeof onToggleUser === 'function') {
                    onToggleUser('')
                } else {
                    console.log('onToggleUser is not a function')
                }
            })
    }

    function signup(credentials) {
        userService.signup(credentials)
            .then(onSetUser)
            .then(() => { showSuccessMsg('Signed in successfully') })
            .catch((err) => { showErrorMsg('Oops try again', err) })
            .finally(() => {
                //! a test for me
                if (typeof onToggleUser === 'function') {
                    onToggleUser('')
                } else {
                    console.log('onToggleUser is not a function')
                }
            })
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
                        {/* <IconBeer style={{color: 'white'}}/> */}
                        <IconBeer color="white" />                    
                        <IconUser color="white" />
                        <IconHome color="white" />
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
                            {/* <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                            >
                                <path d="M19 3h-1V2c0-1.1-.9-2-2-2h-1c-1.1 0-2 .9-2 2v1H10V2c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v1H5c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 0H8V2h8v1zM5 5h14v16H5V5zm6 16c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2z" />
                            </svg> */}
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