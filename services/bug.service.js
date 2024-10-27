import fs from 'fs'
import { utilService } from './util.service.js'
import { loggerService } from './logger.service.js'



export const bugService = {
    query,
    getById,
    remove,
    save
}

const bugs = utilService.readJsonFile('data/bug.json')
const PAGE_SIZE = 3

//!definition of new RegExp
//*Use Regex for searching words/phrases in text.
//* Use Simple Comparison for checking numbers.
//* This approach helps you efficiently filter data based on its type
//* in filterBy.severity it is very simple so that is why i do not need => new RegExp

//~ i could active here  getDefaultFilter⬇️ as a pointer
function query(filterBy = { txt: '', severity: 0, labels: [] }, sortBy = { type: '' , dir: 1 }) {
    let bugsToReturn = bugs

    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        bugsToReturn = bugsToReturn.filter(bug => regex.test(bug.title))
    }
    if (filterBy.severity) {
        bugsToReturn = bugsToReturn.filter(bug => bug.severity >= filterBy.severity)
    }
    if (filterBy.description) {
        const regex = new RegExp(filterBy.description, 'i')
        bugsToReturn = bugsToReturn.filter(bug => regex.test(bug.description))
    }
    if (filterBy.labels.length > 0) {
        const regex = new RegExp(filterBy.labels, 'i')
        //^ or to use with else if
        //* promise only Array becouse it is only an Array the label
        //* with no Array isArray he doesnot know what to look for so
        //* runtime errors when the variable might be of a different type (e.g., undefined, null, or an object)
        //! safe belt
        bugsToReturn = bugsToReturn.filter(bug => Array.isArray(bug.labels) && bug.labels.some(label => regex.test(label)))
    }

    //*SortBy
    if (sortBy.type === 'createdAt') {
        bugs.sort((a, b) => (+sortBy.dir) * (a.createdAt - b.createdAt))
    } else if (sortBy.type === 'severity') {
        bugs.sort((a, b) => (+sortBy.dir) * (a.severity - b.severity))
    } else if (sortBy.type === 'title') {
        bugs.sort((a, b) => {
            const titleA = a.title || ''
            const titleB = b.title || ''
            return sortBy.dir * titleA.localeCompare(titleB)
        })
    }
    // else {
    //     bugs.sort((a, b) => sortBy.dir * (a[sortBy.type] - b[sortBy.type]))
    // }

    if (filterBy.pageIdx !== undefined) {
        const pageIdx = +filterBy.pageIdx
        const startIdx = pageIdx * PAGE_SIZE
        bugsToReturn = bugsToReturn.slice(startIdx, startIdx + PAGE_SIZE)
    }
    //! or 
    // if (filterBy.pageIdx !== undefined) {

    //     const startIdx = +filterBy.pageIdx * PAGE_SIZE // 0,3,6
    //     bugs = bugs.slice(startIdx, startIdx + PAGE_SIZE)
    // }

    return Promise.resolve(bugsToReturn)
}

//! or this way
// function query(filterBy) {
//     return Promise.resolve(bugs)
//         .then(bugs => {
//             if (filterBy.txt) {
//                 const regex = new RegExp(filterBy.txt, 'i')
//                 bugsToReturn = bugsToReturn.filter(bug => regex.test(bug.title))
//             }
//             return bugs
//         })
// }



// function query() {
//     return Promise.resolve(bugs)
// }

function getById(bugId) {
    const bug = bugs.find(bug => bug._id === bugId)
    if (!bug) return Promise.reject('Cannot find bug', bugId)
    return Promise.resolve(bug)
}

//*SortBy
//  if (sortBy.type === 'createdAt') {
//     bugs.sort((a, b) => (+sortBy.dir) * (a.createdAt - b.createdAt))
// } else if (sortBy.type === 'severity') {
//     bugs.sort((a, b) => (+sortBy.dir) * (a.severity - b.severity))
// }


function remove(bugId) {
    const bugIdx = bugs.findIndex(bug => bug._id === bugId)
    if (bugIdx < 0) return Promise.reject('Cannot find bug', bugId)
        const bug = bugs[bugIdx]
    if (!loggedinUser.isAdmin &&
        bug.creator._id !== loggedinUser._id) {
        return Promise.reject('Not your bug')
    }
    bugs.splice(bugIdx, 1)
    return _saveBugsToFile()
}

function save(bugToSave,loggedinUser) {
    if (bugToSave._id) {
        const bugIdx = bugs.findIndex(bug => bug._id === bugToSave._id)
        bugs[bugIdx] = { ...bugs[bugIdx], ...bugToSave }
        if (!loggedinUser.isAdmin &&
            bugToUpdate.creator._id !== loggedinUser._id) {
            return Promise.reject('Not your bug')
        }
    } else {
        bugToSave._id = utilService.makeId()
        bugToSave.createdAt = Date.now()
        bugToSave.labels = bugToSave.labels?.length ? bugToSave.labels : ['no label']
        bugs.unshift(bugToSave)
    }

    return _saveBugsToFile().then(() => bugToSave)
}


function _saveBugsToFile() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(bugs, null, 4)
        fs.writeFile('data/bug.json', data, (err) => {
            if (err) {
                loggerService.error('Cannot write to bugs file', err)
                return reject(err)
            }
            console.log('The file was saved!yup yap')
            resolve()
        })
    })
}