const { useEffect, useState } = React
const { Link, useSearchParams,NavLink } = ReactRouterDOM


export function DeletedBugs() {
    const [deletedBugs, setDeletedBugs] = useState(JSON.parse(localStorage.getItem('deletedBugs')) || [])

    useEffect(() => {
        setDeletedBugs(JSON.parse(localStorage.getItem('deletedBugs')) || [])
    }, [])

    function permanentlyDeleteBug(index) {
        const updatedDeletedBugs = deletedBugs.filter((_, i) => i !== index)
        setDeletedBugs(updatedDeletedBugs)
        localStorage.setItem('deletedBugs', JSON.stringify(updatedDeletedBugs))
    }

    return (
        <section className="home">
        <section className="deleted-bugs-section">
            <h3>Deleted Bugs for good</h3>
            <div className="deleted-bug-list">
                {deletedBugs.length === 0 ? (
                    <p>No deleted bugs found.</p>
                ) : (
                    deletedBugs.map((bug, index) => (
                        <div key={bug._id} className="bug-item">
                            <span>{bug.title}</span>
                            <button className="delete-button" onClick={() => permanentlyDeleteBug(index)}>
                                Delete Permanently
                            </button>
                        </div>
                    ))
                )}
            </div>
            <Link to="/bug" className="back-link">List</Link>
        </section>
        </section>
    )
}