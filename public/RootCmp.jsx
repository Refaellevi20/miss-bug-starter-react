const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { Home } from './pages/Home.jsx'
import { BugIndex } from './pages/BugIndex.jsx'
import { BugDetails } from './pages/BugDetails.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BugEdit } from './pages/BugEdit.jsx'
import { DeletedBugs } from './cmps/DeletedBugs.jsx'
import { LoginRegister } from './pages/LoginRegister.jsx' 

export function App() {
    return (
        <Router>
            <div className='main-app'>
                <AppHeader />
                <main className='container'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/bug" element={<BugIndex />} />
                        <Route path="/bug/:bugId" element={<BugDetails />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/bug/edit/" element={<BugEdit />} />
                        <Route path="/bug/edit/:bugId" element={<BugEdit />} />
                        <Route path="/deleted-bugs" element={<DeletedBugs />} /> 
                        <Route path="/login-register" element={<LoginRegister />} /> 
                    </Routes>
                </main>
                <AppFooter />
            </div>
        </Router>
    )
}
