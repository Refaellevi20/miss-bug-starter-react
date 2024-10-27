// import './idx.css'
// import { FaUser, FaLock,FaEnvelope  } from "react-icons/fa"; 
// import './assets/style/cmp/LoginRegister.css';
// import './LoginRegister.css';

import { LoginSignup } from "./LoginSignup.jsx"

// import '../assets/styles/LoginRegister.css';
// const { useEffect, useState, useRef } = React
const { Link } = ReactRouterDOM

export function LoginRegister({ onToggleUser, action, registerLink, loginLink,user,onSetUser,setUser,onLogout   }) {
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
                    <Link to={`/user/${user._id}`}>Hello {user.fullname}</Link>
                    <button onClick={onLogout}>Logout</button>
                </section>
            ) : (
                <section>
                    <LoginSignup onSetUser={onSetUser} onToggleUser={onToggleUser} />
                </section>
            )}
        </section>
    )
}