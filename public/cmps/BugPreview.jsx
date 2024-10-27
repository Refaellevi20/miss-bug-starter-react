
const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function BugPreview({ bug }) {
    const images = [
        "assets/img/image.png",
        "assets/img/bug-1.png",
        "assets/img/bug-2.png",
        "assets/img/bug-3.png",
        "assets/img/bug-4.png",    
        // "assets/img/logo.png"
    ]
    
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % images.length)
        }, 500)

        return () => clearInterval(intervalId)
    }, [])

    return (
        <article>
            <h4>{bug.title || "Unknown Bug"}</h4>
            <img 
                src={images[currentIndex]} 
                alt="Description" 
                style={{ width: '250px', height: '250px' }} 
            />
            <p>Severity: <span>{bug.severity}</span></p>
            {bug.labels && bug.labels.length > 0 && (
                <p>Labels: <span>{bug.labels.join('')}</span></p>
                
            )}
             {bug.creator && 
                <h4>
                    creator: <Link to={`/user/${bug.creator._id}`}>{bug.creator.fullname}</Link>
                </h4>
            }
        </article>
    )
}