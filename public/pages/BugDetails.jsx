const { useState, useEffect } = React
const { Link, useParams } = ReactRouterDOM

import { bugService } from '../services/bug.service.js' 
import { showErrorMsg } from '../services/event-bus.service.js'


export function BugDetails() {

    const [bug, setBug] = useState(null)
    const { bugId } = useParams()

    useEffect(() => {
        bugService.getById(bugId)
            .then(bug => {
                setBug(bug)
            })
            .catch(err => {
                showErrorMsg('Cannot load bug')
            })
    }, [])

    if (!bug) return <h1 className="loading">Loading...</h1>;

    return (
        <div className="bug-details">
            <h3 className="bug-title">Bug Details 🐛</h3>
            <h4 className="bug-subtitle">{bug.title}</h4>
            <p className="bug-severity">
                Severity: <span>{bug.severity}</span>
            </p>
            {bug.labels && bug.labels.length > 0 && (
                <p className="bug-labels">
                    Labels: <span>{bug.labels.join(', ')}</span>
                </p>
            )}
            <Link to="/bug" className="back-link">Back to List</Link>
        </div>
    )
}

