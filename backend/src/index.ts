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
  createdAt: Date,
  finished: Boolean,
  finishedAt: Date,
})

const Task = mongoose.model("Task", tasksSchema)

app
  .route("/task/:_id")
  .get(async (req, res, next) => {
    try {
      const tasks = await Task.find({})
      res.json(tasks)
    } catch (error) {
      console.error(error)
      return next(error)
    }
  })
  .post(async (req, res, next) => {
    const task = new Task({
      title: req.body.title,
      createdAt: new Date(req.body.createdAt),
      finished: req.body.finished,
      finishedAt: req.body.finishedAt ? new Date(req.body.finishedAt) : null,
    })
    try {
      const newTask = await task.save()
      res.json(newTask)
    } catch (error) {
      console.error(error)
      return next(error)
    }
  })
  .put(async (req, res, next) => {
    const taskID = req.params._id

    try {
      const updatedTask = await Task.updateOne(
        {
          _id: taskID,
        },
        req.body
      )
      res.json(updatedTask)
    } catch (error) {
      console.error(error)
      return next(error)
    }
  })
  .delete(async (req, res, next) => {
    const taskID = req.params._id

    try {
      const deletedTask = await Task.deleteOne({
        _id: taskID,
      })
      res.json(deletedTask)
    } catch (error) {
      console.error(error)
      return next(error)
    }
  })

app.listen(port, () => {
  console.log("Server is running on port " + port)
})
