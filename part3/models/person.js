const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const url = process.env.MONGODB_URI

console.log('Connecting to Phonebook server')

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
	.then(() => {
		console.log('Connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message)
	})

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: [3,'Name must have atleast 3 characters'],
		required: true,
		unique: true,
	},
	number: {
		minlength: [8,'Number must have atleast 8 characters'],
		type: String,
		required: true
	},
})

personSchema.plugin(uniqueValidator)


personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Person', personSchema)