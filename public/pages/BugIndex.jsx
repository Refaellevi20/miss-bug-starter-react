import { bugService } from '../services/bug.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { BugList } from '../cmps/BugList.jsx'
import { BugFilter } from '../cmps/BugFilter.jsx'
import { BugSort } from '../cmps/SortBy.jsx'
import { LoginRegister } from './LoginRegister.jsx'
// import {CarModal } from './CarModal'

const { Link, useSearchParams, NavLink } = ReactRouterDOM
const { useState, useEffect } = React

export function BugIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [bugs, setBugs] = useState([])
    const [filteredBugs, setFilteredBugs] = useState([])
    const [selectedLabel, setSelectedLabel] = useState(null)
    const [labels, setLabels] = useState([])
    const [filterBy, setFilterBy] = useState(bugService.getFilterFromParams(searchParams) || {})
    const [sortBy, setSortBy] = useState({ type: '', dir: 1 })
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedBugPrice, setSelectedBugPrice] = useState(0)
    const [isUserClicked, setIsUserClicked] = useState(false)
    const [action, setAction] = useState('')

    useEffect(() => {
        setSearchParams(filterBy)
        loadBugs()
    }, [filterBy, sortBy])

    function loadBugs() {
        bugService.query(filterBy, sortBy)
            .then((loadedBugs) => {
                if (loadedBugs.length === 0 && filterBy.pageIdx > 0) {
                    setFilterBy(prevFilter => ({ ...prevFilter, pageIdx: 0 }))
                } else {
                    setBugs(loadedBugs)
                    extractUniqueLabels(loadedBugs)
                    filterBugs(loadedBugs)
                }
            })
    }


    function extractUniqueLabels(bugs) {
        //* new set new arr
        //* redu
        const allLabels = new Set()
        bugs.forEach(bug => {
            if (bug.labels) {
                bug.labels.forEach(label => allLabels.add(label))
            }
        })
        setLabels([...allLabels])
    }

    function filterBugs(bugsToFilter) {
        let filtered = [...bugsToFilter]

        if (filterBy.label === 'no label') {
            filtered = filtered.filter(bug => bug.labels && bug.labels.includes('no label'))
        }
        if (filterBy.label === 'love') {
            filtered = filtered.filter(bug => bug.labels && bug.labels.includes('love'))
        }
        if (filterBy.label === 'low') {
            filtered = filtered.filter(bug => bug.labels && bug.labels.includes('low'))
        }
        if (filterBy.label === 'minor') {
            filtered = filtered.filter(bug => bug.labels && bug.labels.includes('minor'))
        }
        if (filterBy.label === 'issue') {
            filtered = filtered.filter(bug => bug.labels && bug.labels.includes('issue'))
        }
        if (filterBy.txt) {
            const regex = new RegExp(filterBy.txt, 'i')
            filtered = filtered.filter(bug => regex.test(bug.title) || regex.test(bug.description))
        }
        setFilteredBugs(filtered)
    }

    function filterBugsByLabel(label) {
        setSelectedLabel(label)
        setFilterBy(prevFilter => ({ ...prevFilter, label }))
        filterBugs(bugs)
        console.log(label)
    }

    function onRemoveBug(bugId) {
        bugService.remove(bugId)
            .then(() => {
                console.log('Deleted Successfully!')
                const updatedBugs = bugs.filter(bug => bug._id !== bugId)
                const deletedBug = bugs.find(bug => bug._id === bugId)
                setBugs(updatedBugs)
                filterBugs(updatedBugs)
                showSuccessMsg('Bug removed')
                //* or use local storage in utils or whatever
                const existingDeletedBugs = JSON.parse(localStorage.getItem('deletedBugs')) || []
                existingDeletedBugs.push(deletedBug)
                localStorage.setItem('deletedBugs', JSON.stringify(existingDeletedBugs))
            })
            .catch(err => {
                console.log('Error from onRemoveBug =>', err)
                showErrorMsg('Cannot remove bug')
            })
    }

    function onAddBug() {
        const bug = {
            title: prompt('Bug title?'),
            severity: +prompt('Bug severity?'),
        }
        bugService.save(bug)
            .then(savedBug => {
                console.log('Added Bug', savedBug)
                setBugs([...bugs, savedBug])
                filterBugs([...bugs, savedBug])
                showSuccessMsg('Bug added')
            })
            .catch(err => {
                console.log('Error from onAddBug ->', err)
                showErrorMsg('Cannot add bug')
            })
    }

    function onEditBug(bug) {
        const severity = +prompt('New severity?')
        const bugToSave = { ...bug, severity }
        bugService.save(bugToSave)
            .then(savedBug => {
                console.log('Updated Bug:', savedBug)
                const updatedBugs = bugs.map(currBug =>
                    currBug._id === savedBug._id ? savedBug : currBug
                )
                setBugs(updatedBugs)
                filterBugs(updatedBugs)
                showSuccessMsg('Bug updated')
            })
            .catch(err => {
                console.log('Error from onEditBug =>', err)
                showErrorMsg('Cannot update bug')
            })
    }

    function onSetFilter(fieldsToUpdate) {
        setFilterBy(prevFilter => {
            if (prevFilter.pageIdx !== undefined) prevFilter.pageIdx = 0
            return { ...prevFilter, ...fieldsToUpdate }
        })
    }

    function onSetSort(SortBy) {
        setSortBy(prevSort => ({ ...prevSort, ...SortBy }))
    }

    function onChangePage(diff) {
        if (filterBy.pageIdx === undefined) return
        let nextPageIdx = filterBy.pageIdx + diff
        console.log('nextPageIdx', nextPageIdx)

        if (nextPageIdx < 0) nextPageIdx = 0
        setFilterBy(prevFilter => ({ ...prevFilter, pageIdx: nextPageIdx }))
    }

    function onTogglePagination() {
        setFilterBy(prevFilter => ({
            ...prevFilter,
            pageIdx: filterBy.pageIdx === undefined ? 0 : undefined
        }))
    }

    function handleOpenModal(price) {
        setSelectedBugPrice(price)
        setIsModalOpen(true)
    }

    function handleCloseModal() {
        setIsModalOpen(false)
    }

    function onToggleUser(action) {
        setIsUserClicked(true)
        setAction(action)
    }

    function registerLink() {
        setAction('active')
    }

    function loginLink() {
        setAction('')
    }

    // if(bugId) return <div>lolo</div>

    return (
        <main className="bugs-app">
            <Link to="/bug/edit">add bug by new window</Link><br />
            <NavLink to="/deleted-bugs"><button className='View-Deleted'>View Deleted Bugs</button> </NavLink>
            <NavLink to="/login-register"><button className='View-Deleted'>login or sing up</button> </NavLink>
            <div className="button-container">
                <button className='log-in' onClick={() => onToggleUser('')}>Log in</button>
                {/* <button className='log-in' onClick={() => onToggleUser('')}>Log in / Sign up</button> */}
                <button className='sign-up' onClick={() => onToggleUser('active')}>Sign up</button>
            </div>
            
            {isUserClicked && (
                <div className="modal" onClick={() => setIsUserClicked(false)}>
                    <div className="modal-content" onClick={(ev) => ev.stopPropagation()}>
                    {/* <button className="close-button" onClick={() => onToggleUser('')}>×</button> */}
                        <LoginRegister onToggleUser={() => setIsUserClicked(false)} action={action} />
                    </div>
                    <button className="close-button" onClick={() => onToggleUser('')}>x</button> 
                </div>
            )}
            {/* <button onClick={onToggleUser}>Toggle Login/Register</button> */}
            {/* <Link to="/api/edit">edit bug</Link> */}
            <section className="info-actions">
                <h3 className="app-title">Bugs App</h3>
                <div className="filters-and-sorts">
                    <BugFilter filterBy={filterBy} onSetFilter={onSetFilter} className="bug-filter" />
                    <BugSort onSetSort={onSetSort} sortBy={sortBy} className="bug-sort" />
                </div>
                <button onClick={onAddBug} className="add-bug-button">Add Bug ⛐</button>
            </section>
            <section className="pagination-section">
                <div className="pagination">
                    <button onClick={() => onChangePage(-1)} className="pagination-button">-</button>
                    <span className="pagination-info">{filterBy.pageIdx + 1 || 'No Pagination'}</span>
                    <button onClick={() => onChangePage(1)} className="pagination-button">+</button>
                    <button onClick={onTogglePagination} className="toggle-pagination-button">Toggle Pagination</button>
                </div>
                <div className="label-buttons">
                    {labels.map(label => (
                        <button
                            key={label}
                            onClick={() => filterBugsByLabel(label)}
                            className={`label-button ${selectedLabel === label ? 'active' : ''}`}
                        >
                            {label}
                        </button>
                    ))}
                    <button onClick={() => filterBugsByLabel(null)} className="label-button">Show All</button>
                </div>
                <BugList bugs={filteredBugs} onRemoveBug={onRemoveBug} onEditBug={onEditBug} className="bug-list" />
            </section>
        </main>
    )
}



