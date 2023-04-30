const express = require('express')
const app = express()
const dotenv = require('dotenv')

const dbContact = require('./config/contactDB')
const ApiError = require('./utils/apiError')
const taskRoute = require('./routes/taskRoute')
const authRoute = require('./routes/authRoute')
const globalError = require('./middleware/errorMiddleware')


dotenv.config({path:'./config.env'})

app.use(express.json())

// contact db
dbContact()


// endpoint task
app.use('/api/v1/list' , taskRoute )
app.use('/api/v1/auth' , authRoute )



// handle error if  user enter url not found
app.all('*' , (req , res , next)=>{
next( new ApiError(`cant find this url  ${req.originalUrl}` , 400))
})



 // midelware handel error global  inide express = every error will handle 
app.use(globalError)

const PORT = process.env.PORT || 3000;


const servier = app.listen(PORT, () => {
    console.log('server work')
})


// Events => list =? callback(err)  handle any error outside  express like mongoose ...
process.on('unhandledRejection', (err) => {
    console.error(`UnhandledRejection Errors ${err.name} | ${err.message}`)
    servier.close(() => {
        console.error(`ShuttDown...`)

        process.exit(1)

    })
})
