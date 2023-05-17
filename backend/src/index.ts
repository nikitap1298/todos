import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import { ConnectOptions } from "mongoose"

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

// List API
const listSchema = new mongoose.Schema({
  title: String,
})

const List = mongoose.model("List", listSchema)

app
  .route("/list/:listId")
  .get(async (req, res, next) => {
    try {
      const lists = await List.find({})
      res.json(lists)
    } catch (error) {
      console.error(error)
      return next(error)
    }
  })
  .post(async (req, res, next) => {
    const list = new List({
      title: req.body.title,
    })
    try {
      const newList = await list.save()
      res.json(newList)
    } catch (error) {
      console.error(error)
      return next(error)
    }
  })
  .put(async (req, res, next) => {
    const listId = req.params.listId

    try {
      const updatedList = await List.updateOne(
        {
          _id: listId,
        },
        req.body
      )
      res.json(updatedList)
    } catch (error) {
      console.error(error)
      return next(error)
    }
  })
  .delete(async (req, res, next) => {
    const listId = req.params.listId
    try {
      const deletedList = await List.deleteOne({
        _id: listId,
      })
      const deletedTasks = await Task.deleteMany({
        listId: listId,
      })
      res.json({ deletedList, deletedTasks })
    } catch (error) {
      console.error(error)
      return next(error)
    }
  })

// Task API
const tasksSchema = new mongoose.Schema({
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "List",
  },
  title: String,
  createdAt: Date,
  finished: Boolean,
  finishedAt: Date,
})

const Task = mongoose.model("Task", tasksSchema)

app
  .route("/task/:taskId")
  .get(async (req, res, next) => {
    try {
      // const tasks = await Task.find({}).populate("list", "title").select("title list")
      const tasks = await Task.find({})
      res.json(tasks)
    } catch (error) {
      console.error(error)
      return next(error)
    }
  })
  .post(async (req, res, next) => {
    const task = new Task({
      listId: req.body.listId,
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
    const taskId = req.params.taskId

    try {
      const updatedTask = await Task.updateOne(
        {
          _id: taskId,
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
    const taskId = req.params.taskId

    try {
      const deletedTask = await Task.deleteOne({
        _id: taskId,
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
