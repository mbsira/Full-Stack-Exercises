const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb://fullstackkkopen:${password}@ac-oj8lr61-shard-00-00.xvwz6wp.mongodb.net:27017,ac-oj8lr61-shard-00-01.xvwz6wp.mongodb.net:27017,ac-oj8lr61-shard-00-02.xvwz6wp.mongodb.net:27017/phonebook?ssl=true&replicaSet=atlas-lulkzj-shard-0&authSource=admin&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({ name, number })

  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log('invalid number of arguments given')
  mongoose.connection.close()
}