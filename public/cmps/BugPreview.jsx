
export function BugPreview({ bug }) {
    
    return (
        <article>
            <h4>{bug.title || "Unknown Bug"}</h4>
            <img src="assets/img/image.png" alt="Description" style={{width: '250px', height: '250px'}} />
            {/* <img src="https://via.placeholder.com/150/assets/img/image.png"/> */}

           
            {/* <img src="https://images.unsplash.com/photo-1561437008-1a7e0e8f148b"/> */}
            {/* <img src="https://via.placeholder.com/150/0000FF/FFFFFF?text=P" className="img-logo3" alt="Profile" /> */}

            
            <p>Severity: <span>{bug.severity}</span></p>
            {bug.labels && bug.labels.length > 0 && (
                <p>Labels: <span>{bug.labels.join(', ')}</span></p>
            )}
        </article>
    )
}