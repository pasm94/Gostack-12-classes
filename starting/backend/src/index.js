const express = require('express')
const cors = require('cors')
const { uuid, isUuid } = require('uuidv4')

const app = express()

app.use(cors())
app.use(express.json())



const projects = [] /* never use in production, each time you start the project you will set the value*/


function logRequests(request, response, next) {
    const { method, url } = request

    const logLabel = `[${method.toUpperCase()}] ${url}`

    console.time(logLabel)

    next() // next middleware

    console.timeEnd(logLabel)

}

function validateProjectId(request, response, next) {
    const { id } = request.params

    if (!isUuid(id)) {
        return response.status(400).json({ error: 'Invalid project ID.' })
    }

    return next()
}

app.use(logRequests)
app.use('/projects/:id', validateProjectId)


// when I use the method get I have a route
app.get('/projects', (request, response) => {
    const { title } = request.query /* destructuring */

    const results = title
        ? projects.filter(project => project.title.includes(title))  /* will check if the search title is contained in the text */
        : projects
    return response.json(results)
})

app.post('/projects', (request, response) => {
    const { title, owner } = request.body

    const project = { id: uuid(), title, owner }

    projects.push(project)

    return response.json(project) /* display only the newly created project*/
})

app.put('/projects/:id', (request, response) => { /* need the id because it will att only 1 project*/
    const { id } = request.params
    const { title, owner } = request.body

    const projectIndex = projects.findIndex(project => project.id == id)

    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Project not found.' })
    }

    const project = {
        id,
        title,
        owner,
    }

    projects[projectIndex] = project

    return response.json(project)
})

app.delete('/projects/:id', (request, response) => { /* need the id because it will att only 1 project*/
    const { id } = request.params

    const projectIndex = projects.findIndex(project => project.id == id)

    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Project not found.' })
    }

    projects.splice(projectIndex, 1)

    return response.status(204).send()
})

app.listen(3333, () => {
    console.log('🚀 Back-end started')
}) /* will run on port 3333, */

