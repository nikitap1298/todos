import React from "react"
import { useTaskContext } from "../../context/TaskContext"
import Task from "./Task"

const Tasks = () => {
  const { tasks, deleteTask } = useTaskContext()

  return (
    <div>
      {tasks.map((task, index) => (
        <Task key={index} task={task} onDelete={deleteTask} taskIndex={index} />
      ))}
    </div>
  )
}

export default Tasks
