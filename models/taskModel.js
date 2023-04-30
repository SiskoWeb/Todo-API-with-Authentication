const mongoose = require('mongoose')

const listSchema = mongoose.Schema({
    task: {
        type: String,
        required: [true, 'Task Required'],
        trim: true, // if name has space it will remove it
        unique: [true, 'Task must be unique'],
        minlength: [2, 'Category to short'],
        maxlength: [32, 'Category to long'],

    },
    status: {
        type: Boolean,
        default: false,

    },
     //bring user id from db  {who did this action}
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },

}
    , { timestamps: true }
)


//2 create model 
const tasktModel = mongoose.model('tasks', listSchema)
module.exports = tasktModel