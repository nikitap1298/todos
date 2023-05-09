import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import { ConnectOptions } from "mongoose"
import { TaskInterface } from "./lib/interfaces/task.interface"

const app = express()
const port = 8000

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

// MongoDB
const url = "mongodb://localhost:27017/todos"
mongoose.connect(url, {
  useNewUrlParser: true,
} as ConnectOptions)

const tasksSchema = new mongoose.Schema({
  title: String,
  createdAt: String,
  finished: Boolean,
  finishedAt: String,
})

const Tasks = mongoose.model("Tasks", tasksSchema)

app
  .route("/tasks")
  .get((req, res) => {
    Tasks.find({}).then((tasks) => {
      res.json(tasks)
      console.log(tasks)
      tasks = tasks
    })
  })
  .post((req, res) => {
    const dataArray = req.body
    dataArray.forEach((element: TaskInterface) => {
      Tasks.find({}).then((tasks) => {
        const exists = tasks.some((task) => {
          return (
            task.title === element.title && task.createdAt === element.createdAt
          )
        })

        if (!exists) {
          const task = new Tasks({
            title: element.title,
            createdAt: element.createdAt,
            finished: element.finished,
            finishedAt: element.finishedAt,
          })
          task.save()
        }
      })
    })
  })
  .put((req, res) => {
    const updatedArray = req.body
  })

app.listen(port, () => {
  console.log("Server is running on port " + port)
})
