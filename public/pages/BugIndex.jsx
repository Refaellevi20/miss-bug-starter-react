import { bugService } from '../services/bug.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { BugList } from '../cmps/BugList.jsx'
import { BugFilter } from '../cmps/BugFilter.jsx'
import { BugSort } from '../cmps/SortBy.jsx'


const { Link, useSearchParams } = ReactRouterDOM
const { useState, useEffect } = React

export function BugIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [bugs, setBugs] = useState(null)
    const [filterBy, setFilterBy] = useState(bugService.getDefaultFilter())
    const [sortBy, setSortBy] = useState({ type: '', dir: 1 })

    useEffect(() => {
        loadBugs()
    }, [filterBy,sortBy])

    function loadBugs() {
        bugService.query(filterBy, sortBy)
            .then((bugs) => setBugs(bugs))
    }



    function onRemoveBug(bugId) {
        bugService
            .remove(bugId)
            .then(() => {
                console.log('Deleted Succesfully!')
                const bugsToUpdate = bugs.filter((bug) => bug._id !== bugId)
                setBugs(bugsToUpdate)
                showSuccessMsg('Bug removed')
            })
            .catch((err) => {
                console.log('Error from onRemoveBug ->', err)
                showErrorMsg('Cannot remove bug')
            })
    }

    function onAddBug() {
        const bug = {
            title: prompt('Bug title?'),
            severity: +prompt('Bug severity?'),
        }
        bugService
            .save(bug)
            .then((savedBug) => {
                console.log('Added Bug', savedBug)
                setBugs([...bugs, savedBug])
                showSuccessMsg('Bug added')
            })
            .catch((err) => {
                console.log('Error from onAddBug ->', err)
                showErrorMsg('Cannot add bug')
            })
    }

    function onEditBug(bug) {
        const severity = +prompt('New severity?')
        const bugToSave = { ...bug, severity }
        bugService
            .save(bugToSave)
            .then((savedBug) => {
                console.log('Updated Bug:', savedBug)
                const bugsToUpdate = bugs.map((currBug) =>
                    currBug._id === savedBug._id ? savedBug : currBug
                )
                setBugs(bugsToUpdate)
                showSuccessMsg('Bug updated')
            })
            .catch((err) => {
                console.log('Error from onEditBug ->', err)
                showErrorMsg('Cannot update bug')
            })
    }

    function onSetFilterBy(newFilterBy) {
        setFilterBy(newFilterBy)
    }

    function onSetSort(SortBy) {
        setSortBy(prevSort => ({ ...prevSort, ...SortBy}))
    }

    return (
        <main>
            <section className='info-actions'>
                <h3>Bugs App</h3>
                <BugFilter filterBy={filterBy} onSetFilter={onSetFilterBy} /> {/* Use onSetFilter */}
                <BugSort onSetSort={ onSetSort } sortBy={ sortBy } />
                <button onClick={onAddBug}>Add Bug ⛐</button>
            </section>
            <main>
            <button><Link to="/bug/edit">Add Bug ⛐</Link></button>
            <button><Link to="/bug/edit/:bugId">edit Bug ⛐</Link></button>
                <BugList bugs={bugs} onRemoveBug={onRemoveBug} onEditBug={onEditBug} />
            </main>
        </main>
    )
}
