require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token("body", req => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/', (request, response) => {
    response.send('<h1>Welcom to the phonebook database</h1>')
})

app.get('/info', (request, response, next) => {
    Person.countDocuments({})
    .then(peopleNum => {
        console.log(peopleNum);
        const serverTime = new Date()
        const data = `<div>Phonebook has info for ${peopleNum} people</div>
        <div>${serverTime}</div>`
        response.send(data)
    })
    .catch(error => next(error))
})

app.get('/api/persons', (request, response, next) => {
    Person.find({})
    .then(people => {
        response.json(people)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(person => {
        response.json(person)
    })
    .catch(error => next(error))
})



app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    
    const body = request.body

    if (body.name === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })
    

    person.save()
    .then(savedPerson => {
        response.json(savedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    } 

    next(error)
}
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})