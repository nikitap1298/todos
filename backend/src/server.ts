import express from "express"
import cors from "cors"
import { TaskInterface } from "./lib/interfaces/task.interface"

const app = express()
const port = 8000

const tasks: TaskInterface[] = []

app.use(cors())
app.use(express.json())

app.get("/tasks", (req, res) => {
  res.json(tasks)
})

app.listen(port, () => {
  console.log("Server is running on port " + port)
})
