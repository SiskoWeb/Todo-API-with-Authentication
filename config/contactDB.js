const mongoose = require('mongoose')


//
const dbContact = () => {
    mongoose.connect("mongodb+srv://siskodb:sisko007SP@cluster0.2pdvdr6.mongodb.net/todolist?retryWrites=true&w=majority")
        .then(() => {
            console.log('conected')
        })

}

module.exports = dbContact