const { useState, useEffect } = React
import { bugService } from '../services/bug.service.js' 

export function BugFilter({ onSetFilter, filterBy }) {
    // const [localFilterBy, setLocalFilterBy] = useState(filterBy)
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)


    // useEffect(() => {
    //     setLocalFilterBy(filterBy)
    // }, [filterBy])

    // useEffect(() => {
    //     onSetFilter(localFilterBy)
    // }, [localFilterBy])

    // function handleChange({ target }) {
    //     const { value, name: field } = target
    //     setLocalFilterBy((prevFilter) => ({
    //         ...prevFilter,
    //         [field]: value === '' ? undefined : value,
    //     }))
    // }

    useEffect(() => {
		onSetFilter(filterByToEdit)
	}, [filterByToEdit])

	function onSubmitFilter(ev) {
		ev.preventDefault()
		onSetFilter(filterByToEdit)
	}

    function handleChange({ target }) {
		const field = target.name
		
		const value = target.type === 'number' ? +target.value || '' : target.value
		setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
	}

    return (
        <section className="filter">
            <h3>Filter</h3>
            <form onSubmit={onSubmitFilter}></form>
        	<label htmlFor="title">Title:</label>
				<input
					value={filterByToEdit.txt}
					onChange={handleChange}
					name="txt"
					id="title"
					type="text"
					placeholder="By Title"
				/>

				<label htmlFor="severity">Severity:</label>
				<input
					value={filterByToEdit.severity}
					onChange={handleChange}
					name="severity"
					id="severity"
					type="number"
					placeholder="By Severity"
				/>

				<label htmlFor="labels">Labels:</label>
				<input
					value={filterByToEdit.labels}
					onChange={handleChange}
					name="labels"
					id="labels"
					type="text"
					placeholder="By labels"
				/>

				{/* <button>Filter Bugs</button> */}
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

{/* <label htmlFor="severity">Severity:</label>
				<input
					value={filterByToEdit.severity}
					onChange={handleChange}
					name="severity"
					id="severity"
					type="number"
					placeholder="By Severity"
				/> */}