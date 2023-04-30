const mongoose = require('mongoose')
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({

    name: {
        type: String,

    }, slug: {
        type: String,
        lowercase: true
    },
    email: {
        type: String,
        required: [true, 'email required'],
        lowercase: true,
        uniqe: true,
    },
    password: {
        type: String,
        required: [true, "passowrd requierd"],
        minlegth: [6, 'to short password'],

    },

},
    { timestamps: true }
)



// @desc middleware mongoose 
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    // Hashing user password
    this.password = await bcrypt.hash(this.password, 12);
    next();
});



const userModel = mongoose.model('User', userSchema)

module.exports = userModel