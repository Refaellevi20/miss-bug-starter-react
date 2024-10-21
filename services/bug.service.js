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


function query(filterBy = { txt: '', severity: 0, labels: [] }, sortBy = { type: '', description: '' }) {
    let bugsToReturn = bugs

    // if (!Array.isArray(filterBy.labels)) {
    //     filterBy.labels = []
    // }

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
        const regex = new RegExp(filterBy.labels, 'i'); // Match any label
        bugsToReturn = bugsToReturn.filter(bug => Array.isArray(bug.labels) && bug.labels.some(label => regex.test(label)))
    }
    //Sort
    if (sortBy.type === 'createdAt') {
        bugs.sort((a, b) => (+sortBy.dir) * (a.createdAt - b.createdAt))
    } else if (sortBy.type === 'severity') {
        bugs.sort((a, b) => (+sortBy.dir) * (a.severity - b.severity))
    }

    return Promise.resolve(bugsToReturn)
}

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
    bugs.splice(bugIdx, 1)
    return _saveBugsToFile()
}

function save(bugToSave) {
    if (bugToSave._id) {
        const bugIdx = bugs.findIndex(bug => bug._id === bugToSave._id)
        bugs[bugIdx] = bugToSave
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