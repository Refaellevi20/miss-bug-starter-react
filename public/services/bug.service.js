
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
    getFilterFromParams,
    // sortByDefault,
}

//* sort later
function query(filterBy,sortBy) {
    const queryParams = { ...filterBy,...sortBy }
    return axios.get(BASE_URL, { params: queryParams })
        .then(res => res.data)
        .catch(err =>  console.log('err:', err))
}

//! another way but i need here also a func for the sortBy for the Default
// function query(filterBy = getDefaultFilter(), sortBy = sortByDefault()) {
//     const params = { ...filterBy, ...sortBy }
//     return axios.get(BASE_URL, { params })
//         .then(res => res.data)
// }

// function sortByDefault() {
//     return { createdAt: '', severity: 0}

// }

function getById(bugId) {
    return axios.get(BASE_URL + bugId)
        .then(res => res.data)
        .catch(err => {
            console.log('err:', err)
        })
}

function remove(bugId) {
    return axios.delete(BASE_URL + bugId).then(res => res.data)   
}

function save(bug) {
    console.log(bug)
    if (bug._id) {
        return axios.put(BASE_URL, bug).then(res => res.data)
    } else {
        return axios.post(BASE_URL, bug).then(res => res.data)
            
    }
}

function getEmptyBug() {
    return { title: '', description: '', severity: 0,labels: []}
}

function getDefaultFilter() {
    return { txt: '', minSeverity: 0, severity: 0, labels: []}
}

function getFilterFromParams(searchParams = {}) {
   const defaultFilter = getDefaultFilter()
   return {
    txt: searchParams.get('txt') || defaultFilter.txt,
    txt: searchParams.get('severity') || defaultFilter.severity,
    // txt: searchParams.get('description') || defaultFilter.description,
    txt: searchParams.get('labels') || defaultFilter.labels,
   }
}


