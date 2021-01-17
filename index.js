const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

morgan.token("body", req => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


const HIGH_NUMBER = 100000;

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    },
]

app.get('/', (request, response) => {
    response.send('<h1>Welcom to the phonebook database</h1>')
})

app.get('/info', (request, response) => {
    const serverTime = new Date()
    const data = `<div>Phonebook has info for ${persons.length} people</div>
    <div>${serverTime}</div>`
    response.send(data)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    return Math.floor(Math.random() * HIGH_NUMBER);
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    const duplicateName = persons
      .map((person) => person.name)
      .includes(body.name);

    if(duplicateName){
        return response.status(400).json({ 
            error: 'name must be unique' 
        })
    } else if (!body.name || !body.number) {
        return response.status(400).json({ 
        error: 'information missing' 
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    response.json(person)
})



const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})