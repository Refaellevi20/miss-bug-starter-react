// import './idx.css'
// import { FaUser, FaLock,FaEnvelope  } from "react-icons/fa"; 
// import './assets/style/cmp/LoginRegister.css';
// import './LoginRegister.css';

import { LoginSignup } from "./LoginSignup.jsx"

// import '../assets/styles/LoginRegister.css';
// const { useEffect, useState, useRef } = React
const { Link } = ReactRouterDOM

export function LoginRegister({ onToggleUser, action, registerLink, loginLink,user,onSetUser  }) {
    // const emailRef = useRef()
    // const passwordRef = useRef()

    // const [action, setAction] = useState('')


    // function registerLink() {
    //     setAction('active')
    // }

    // function loginLink() {
    //     setAction('')
    // }

    return (
        <section>
            {user ? (
                <section>
                    {/* <Link to={`/user/${user._id}`}>Hello {user.fullname}</Link>
                    <button onClick={onLogout}>Logout</button> */}
                </section>
            ) : (
                <section>
                    <LoginSignup onSetUser={onSetUser} />
                </section>
            )}
        </section>


        //         <div>
        //             <div className={`wrapper ${action}`}>
        //             <button className="close-button" onClick={() => onToggleUser('')}>×</button>
        //             <div className={`form-box login ${action === '' ? 'active' : ''}`}>
        //                     <form action=''>
        //                         <h1>Login</h1>
        //                         <div className='input-box'>
        //                             <input type="text" placeholder='Username' required />
        //                             {/* <FaUser className='icon' /> */}
        //                         </div>
        //                         <div className='input-box'>
        //                             <input type="password" placeholder='Password' required />
        //                             {/* <FaLock className='icon' /> */}
        //                         </div>
        //                         <div className='remember-forgot'>
        //                             <label className="remember-me">
        //                                 <input type="checkbox" />
        //                                 Remember me
        //                             </label>
        //                             <Link to="#">Forgot password?</Link>
        //                         </div>
        //                         <button type='submit'>Login</button>

        //                         <div className='register-link'>
        //                             <p className='no-defult'>Don't have an account?
        //                                 <Link to="#" onClick={registerLink}> Register </Link>
        //                                 {/* <Link to="#" onClick={() => action === 'active' ? onToggleUser('') : onToggleUser('active')}> Register </Link> */}
        //                                 {/* <Link to="#" onClick={() => onToggleUser('active')}> Register </Link> */}
        //                                 {/* <Link to="#" onClick={() => onToggleUser('signup')}> Register </Link> */}
        //                             </p>
        //                         </div>
        //                     </form>
        //                 </div>

        //                 <div className={`form-box register ${action === 'active' ? 'active' : ''}`}>
        //                     <form action=''>
        //                         <h1>Registration</h1>
        //                         <div className='input-box'>
        //                             <input type="text" placeholder='Username' required />
        //                             {/* <FaUser className='icon' /> */}
        //                         </div>
        //                         <div className='input-box'>
        //                             <input type="email" placeholder='Email'  ref={emailRef} required />
        //                             {/* <FaEnvelope className='icon' /> */}
        //                         </div>
        //                         <div className='input-box'>
        //                             <input type="password" placeholder='Password' ref={passwordRef} required />
        //                             {/* <FaLock className='icon' /> */}
        //                         </div>
        //                         <div className='remember-forgot'>
        //                             <label className='remember'>
        //                                 <input type="checkbox" />
        //                                 I agree to the terms & conditions
        //                             </label>
        //                         </div>
        //                         <button className="register-button" type='submit'>Register</button>

        //                         <div className='register-link'>
        //                             <p className='no-defults'>Already have an account?
        //                             {/* <Link to="/login">Log In</Link> */}
        //                                 <Link to="#" onClick={loginLink}> Login </Link>
        //                                 {/* <Link to="#" onClick={() => onToggleUser('login')}> Login </Link> */}
        //                             </p>
        //                         </div>
        //                     </form>
        //                 </div>

        //             </div>

        //             <div>
        //                 {/* <Link to="/bug" className="back-link">Back to List</Link> */}
        //             </div>
        //         </div>

    )
}