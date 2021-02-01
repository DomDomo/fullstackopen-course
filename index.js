require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')
const { count } = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token("body", req => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/', (request, response) => {
    response.send('<h1>Welcom to the phonebook database</h1>')
})

app.get('/info', (request, response) => {
    Person.countDocuments({}).then(peopleNum => {
        console.log(peopleNum);
        const serverTime = new Date()
        const data = `<div>Phonebook has info for ${peopleNum} people</div>
        <div>${serverTime}</div>`
        response.send(data)
    })  
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
        response.json(people)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    
    const body = request.body

    if (body.name === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })
    

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})



const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})