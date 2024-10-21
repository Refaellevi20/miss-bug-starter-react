
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'


const BASE_URL = '/api/bug/'
const STORAGE_KEY = 'bugDB'

// _createBugs()

export const bugService = {
    query,
    getById,
    save,
    remove,
    getEmptyBug,
    getDefaultFilter,
}


// function query() {
//     return storageService.query(STORAGE_KEY)
// }
// function getById(bugId) {
//     return storageService.get(STORAGE_KEY, bugId)
// }

// function remove(bugId) {
//     return storageService.remove(STORAGE_KEY, bugId)
// }

// function save(bug) {
//     if (bug._id) {
//         return storageService.put(STORAGE_KEY, bug)
//     } else {
//         return storageService.post(STORAGE_KEY, bug)
//     }
// }

//* sort later
function query(filterBy) {
    const queryParams = { ...filterBy, }
    return axios.get(BASE_URL, { params: queryParams })
        .then(res => res.data)
        .catch(err =>  console.log('err:', err))
}

function getById(bugId) {
    return axios.get(BASE_URL + bugId)
        .then(res => res.data)
        .catch(err => {
            console.log('err:', err)
        })
}

function remove(bugId) {
    return axios.get(BASE_URL + bugId + '/remove')
}

function save(bug) {
    const url = BASE_URL + 'save'
    let queryParams = `?title=${bug.title}&severity=${bug.severity}`
    if (bug._id) queryParams += `&_id=${bug._id}`
    return axios.get(url + queryParams).then(res => res.data)
    // if (bug._id) {
    //     return storageService.put(bug_KEY, bug)
    // } else {
    //     return storageService.post(bug_KEY, bug)
    // }
}

function getEmptyBug() {
    return { title: '', description: '', severity: 0,}
}

function getDefaultFilter() {
    return { txt: '', minSeverity: 0, severity: 0,}
}




// function _createBugs() {
//     let bugs = utilService.loadFromStorage(STORAGE_KEY)
//     if (!bugs || !bugs.length) {
//         bugs = [
//             {
//                 title: "Infinite Loop Detected",
//                 severity: 4,
//                 _id: "1NF1N1T3"
//             },
//             {
//                 title: "Keyboard Not Found",
//                 severity: 3,
//                 _id: "K3YB0RD"
//             },
//             {
//                 title: "404 Coffee Not Found",
//                 severity: 2,
//                 _id: "C0FF33"
//             },
//             {
//                 title: "Unexpected Response",
//                 severity: 1,
//                 _id: "G0053"
//             }
//         ]
//         utilService.saveToStorage(STORAGE_KEY, bugs)
//     }



// }
