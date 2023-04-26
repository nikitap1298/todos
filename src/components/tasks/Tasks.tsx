import React from "react"
import { useTaskContext } from "../../context/TaskContext"
import Task from "./Task"

const Tasks = () => {
  const { tasks, deleteTask } = useTaskContext()

  return (
    <div>
      {tasks.map((task, index) => (
        // Use "task" as a key attribute. Using "index" will create a bug
        <Task key={task} task={task} onDelete={deleteTask} taskIndex={index} />
      ))}
    </div>
  )
}

export default Tasks
