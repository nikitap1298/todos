import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { TaskInterface } from "./lib/interfaces/task.interface"

const app = express()
const port = 8000

let tasks: TaskInterface[] = []

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

app.get("/tasks", (req, res) => {
  res.json(tasks)
})

app.post("/tasks", (req, res) => {
  const dataArray = req.body

  dataArray.forEach((element: TaskInterface) => {
    const exists = tasks.some((task) => {
      return (
        task.title === element.title && task.createdAt === element.createdAt
      )
    })

    if (!exists) {
      tasks.push(element)
    }
  })

  console.log(tasks)
})

app.listen(port, () => {
  console.log("Server is running on port " + port)
})
