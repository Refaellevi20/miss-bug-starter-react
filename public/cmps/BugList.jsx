const { Link } = ReactRouterDOM

import { BugPreview } from './BugPreview.jsx'
import { userService } from '../services/user.service.js'


export function BugList({ bugs, onRemoveBug, onEditBug }) {
    const user = userService.getLoggedinUser()

    function isCreator(bug) {
        if (!user) return false
        if (!bug.creator) return true
        return user.isAdmin || bug.creator._id === user._id
    }

    if (!bugs) return <img src="assets/img/svg/loading.svg" alt="Loading..." className="loading-spinner" />

    return (
        <ul className="bug-list">
            {bugs.map((bug) => (
                <li className="bug-preview" key={bug._id}>
                    <BugPreview bug={bug} />
                    {isCreator(bug) && (
                        <div className="remove-edit-button" >
                            <button className="remove-button"
                                onClick={() => onRemoveBug(bug._id)}>x</button>
                            {/* <button className="edit-button"
                                onClick={() => onEditBug(bug)}>Edit</button> */}
                            <button className="edit-button">
                                <Link to={`/bug/edit/${bug._id}`}>Edit</Link>
                            </button>
                        </div>
                    )}
                    <Link to={`/bug/${bug._id}`}>Details</Link>
                </li>
            ))
            }
        </ul >
    )
}
