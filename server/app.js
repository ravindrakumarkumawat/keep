const express = require('express')
const cors = require('cors')
const { connectDB } = require('./db/connectDb')

const listsRouter = require('./routes/lists')
const taskRouter = require('./routes/tasks')
const userRouter = require('./routes/userRouter')

const app = express()
const port = process.env.PORT || 5000

// Database connecting
connectDB()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/users', userRouter)
app.use('/lists', listsRouter)
app.use('/lists/:id/tasks', taskRouter)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

