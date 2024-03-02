const express = require('express')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const notesRouter = require('./controllers/notes')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const errorHandler = (error, request, response, next) => {
    console.error('in the errorHandler', error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({
            error: 'malformatted id'
        })
    }

    next(error)
}

app.use(express.json())

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)

app.use(errorHandler)

const start = async () => {
    await connectToDatabase()
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

start()