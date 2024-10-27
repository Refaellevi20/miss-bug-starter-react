const { useState, useEffect } = React
import { bugService } from '../services/bug.service.js' 

export function BugFilter({ onSetFilter, filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
 const [isModalOpen, setIsModalOpen] = useState(false)

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
			<h3 className="filter-title">Filter</h3>
			<form onSubmit={onSubmitFilter} className="filter-form">
				<label htmlFor="title"><strong>Title:</strong></label>
				<input
					value={filterByToEdit.txt}
					onChange={handleChange}
					name="txt"
					id="title"
					type="text"
					placeholder="By Title"
					className="filter-input"
				/>
	<br />
				<label htmlFor="severity"><strong>Severity:</strong></label>
				<input
					value={filterByToEdit.severity}
					onChange={handleChange}
					name="severity"
					id="severity"
					type="number"
					placeholder="By Severity"
					className="filter-input"
				/>
	<br />
				<label htmlFor="labels"><strong>Labels:</strong></label>
				<input
					value={filterByToEdit.labels}
					onChange={handleChange}
					name="labels"
					id="labels"
					type="text"
					placeholder="By labels"
					className="filter-input"
				/>
	
				{/* <button type="submit" className="filter-button">Filter Bugs</button> */}
			</form>
		</section>
	)
}
