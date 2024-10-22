import { bugService } from "./services/bug.service.js"
import { loggerService } from "./services/logger.service.js"
import { pdfService } from "./services/pdf.service.js"

import express from 'express'
import cookieParser from 'cookie-parser'


const app = express()
const PORT = 3020

app.use(express.static("public"))
app.use(cookieParser())
app.use(express.json())

app.get('/api/bug', (req, res) => {
    // console.log('hi from get api')

    const filterBy = {
        txt: req.query.txt || '',
        severity: +req.query.severity || 0,
        description: req.query.description || '',
        labels: req.query.labels ? req.query.labels : [],
        pageIdx: req.query.pageIdx
    }

    //* defult is 1 insted of undifind or idk
    const sortBy = {
        type: req.query.type || '',
        dir: +req.query.dir || 1
    }

    bugService.query(filterBy, sortBy)
        .then(bugs => {
            // pdfService.buildBugPDF(bugs)
            res.send(bugs)
        })
        .catch(err => {
            loggerService.error('Cannot get bugs', err)
            res.status(500).send('Cannot get bugs')
        })
})

// add
app.post("/api/bug", (req, res) => {
    console.log("req.body:", req.body)
    const bugToSave = req.body
    bugService
      .save(bugToSave)
      .then((bug) => res.send(bug))
      .catch((err) => {
        loggerService.error("Cannot save bug", err)
        res.status(400).send("Cannot save bug")
      })
  })

//* UPDATE 
app.put('/api/bug', (req, res) => {
    const bugToSave = {
        //^only the severity
        //^ 
        _id: req.body._id,
        title: req.body.title || '',
        //* i can do it also with a libry of Number
        severity: +req.body.severity || 0,
        description: req.body.description || '',
        labels: req.body.labels || '',
    }

    bugService.save(bugToSave)
        .then(savedBug => res.send(savedBug))
        .catch(err => {
            loggerService.error('Cannot save bug', err)
            res.status(500).send('Cannot save bug')
        })
})

//* READ
app.get("/api/bug/:bugId", (req, res) => {
    // bugId = req.params.id
    const { bugId } = req.params
    const { visitedBugs = [] } = req.cookies
    console.log(visitedBugs)

    if (!visitedBugs.includes(bugId)) {
        if (visitedBugs.length >= 3) return res.status(401).send('Wait for a bit')
        //* if not already present push to the arr
        else visitedBugs.push(bugId)
        console.log(bugId)
    }

    //* Reset cookies after 10 seconds
    res.cookie('visitedBugs', visitedBugs, { maxAge: 5000 * 2 })

    bugService.getById(bugId)
        .then(bug => res.send(bug))
        .catch(err => {
            loggerService.error(err)
            res.status(400).send("Cannot get bug")
        })
})


//* REMOVE
app.delete('/api/bug/:id', (req, res) => {
    // const { bugId } = req.params
    const bugId = req.params.id
    bugService.remove(bugId)
        .then(() => res.send(`bug ${bugId} removed successfully!`))
        .catch(err => {
            loggerService.error('Cannot remove bug', err)
            res.status(500).send('Cannot remove bug')
        })
})


// const port = 3040
// app.listen(port, () =>
//     loggerService.info(`Server listening on port http://127.0.0.1:${port}/`)
// )

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
