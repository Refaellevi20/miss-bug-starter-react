const { NavLink, Link } = ReactRouterDOM
const { useNavigate } = ReactRouter

const { useEffect, useState } = React

import { userService } from '../services/user.service.js'

import { UserMsg } from './UserMsg.jsx'
import { LoginSignup } from '../pages/LoginSignup.jsx'
import { LoginRegister } from '../pages/LoginRegister.jsx'


export function AppHeader() {
    const navigate = useNavigate()
    const [user, setUser] = useState(userService.getLoggedinUser())


    function onLogout() {
        userService.logout()
            .then(() => onSetUser(null))
            .catch(err => showErrorMsg('OOPs try again',err))
    }

    function onSetUser(user) {
        setUser(user)
        navigate('/bug')
    }

    return (
        <header className='container'>
            <UserMsg />
            <nav>
                {/* <NavLink to="/login-register">Login/Register</NavLink> */}
                <NavLink to="/">Home</NavLink>
                |<NavLink to="/bug">Bugs</NavLink> |
                <NavLink to="/about">About</NavLink>
            </nav>
            <h1>Bugs are for professionals</h1>
            {user ? (
                <section>
                    <Link to={`/user/${user._id}`}>Hello {user.fullname}</Link>
                    <button onClick={onLogout}>Logout</button>
                </section>
            ) : (
                <section>
                    {/* <Link to="/login-register">Login/Register</Link> */}
                    <LoginRegister user={user} onSetUser={onSetUser} onLogout={onLogout} />
                    {/* <LoginSignup onSetUser={onSetUser} onToggleUser={onToggleUser} /> */}

                    {/* <LoginSignup onSetUser={onSetUser} /> */}
                </section>
            )}
            <UserMsg />
        </header>
    )
}
