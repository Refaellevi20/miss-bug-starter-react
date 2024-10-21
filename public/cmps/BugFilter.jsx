const { useState, useEffect } = React
import { bugService } from '../services/bug.service.js' 

export function BugFilter({ onSetFilter, filterBy }) {
    const [localFilterBy, setLocalFilterBy] = useState(filterBy)

    useEffect(() => {
        setLocalFilterBy(filterBy)
    }, [filterBy])

    useEffect(() => {
        onSetFilter(localFilterBy)
    }, [localFilterBy])

    function handleChange({ target }) {
        const { value, name: field } = target
        setLocalFilterBy((prevFilter) => ({
            ...prevFilter,
            [field]: value === '' ? undefined : value,
        }))
    }

    return (
        <section className="filter">
            <h3>Filter</h3>
            <label>
                <span>Text: </span>
                <input
                    type="text"
                    name="txt"
                    value={localFilterBy.txt}
                    onChange={handleChange}
                />
            </label>
            <label>
                <span>severity: </span>
                <input
                    type="number"
                    name="Severity"
                    min="0"
                    value={localFilterBy.Severity || ''}
                    onChange={handleChange}
                />
            </label>
        </section>
    )
}

//!
// const { useState, useEffect } = React
// import { bugService } from '../services/bug.service.js' 

// export function BugFilter(props) {
//     const [localFilterBy, setLocalFilterBy] = useState(filterBy)
//     // function onChangeFilterBy(ev) {
//     //     const { maxSeverity, minSeverity, createdAfter, createdBefore } = props.filterBy
//     //     const name = ev.target.name
//     //     let value = ev.target.value
//     //     if (['createdAfter', 'createdBefore'].includes(name)) {
//     //         value = new Date(value).getTime()
//     //     }
//     //     if (name === 'minSeverity' && maxSeverity < value) value = maxSeverity
//     //     else if (name === 'maxSeverity' && value < minSeverity) value = minSeverity
//     //     else if (name === 'createdAfter' && createdBefore < value) value = createdBefore
//     //     else if (name === 'createdBefore' && value < createdAfter) value = createdAfter
//     //     const newFilterBy = { [name]: value }
//     //     props.onSetFilterBy(newFilterBy)
//     // }



//     useEffect(() => {
//         setLocalFilterBy(filterBy)
//     }, [filterBy])

//     useEffect(() => {
//         onSetFilter(localFilterBy)
//     }, [localFilterBy])

//     function handleChange({ target }) {
//         const { value, name: field } = target
//         setLocalFilterBy((prevFilter) => ({
//             ...prevFilter,
//             [field]: value === '' ? undefined : value,
//         }))
//     }

//     return (
//         <section className="filter">
//             <h3>Filter</h3>
//             <label>
//                 <span>Text: </span>
//                 <input
//                     type="text"
//                     name="txt"
//                     value={localFilterBy.txt}
//                     onChange={handleChange}
//                 />
//             </label>
//             {/* <label>
//                 <span>Created after: </span>
//                 <input
//                     type="datetime-local"
//                     name="createdAfter"
//                     value={new Date(props.filterBy.createdAfter).toISOString().slice(0, -8)}
//                     onChange={onChangeFilterBy}
//                 />
//             </label>
//             <label>
//                 <span>Created before: </span>
//                 <input
//                     type="datetime-local"
//                     name="createdBefore"
//                     value={new Date(props.filterBy.createdBefore).toISOString().slice(0, -8)}
//                     onChange={onChangeFilterBy}
//                 />
//             </label>
//             <label>
//                 <span>Min severity: </span>
//                 <input
//                     type="number"
//                     name="minSeverity"
//                     min="0"
//                     max={props.filterBy.maxSeverity || Infinity}
//                     value={props.filterBy.minSeverity}
//                     onChange={onChangeFilterBy}
//                 />
//             </label>
//             <label>
//                 <span>Max severity: </span>
//                 <input
//                     type="number"
//                     name="maxSeverity"
//                     min={props.filterBy.minSeverity || 0}
//                     value={props.filterBy.maxSeverity}
//                     onChange={onChangeFilterBy}
//                 />
//             </label> */}
//         </section>
//     )
// }