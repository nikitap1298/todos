import React from "react"
import { useTaskContext } from "../../context/TaskContext"
import Task from "./Task"

const Tasks = () => {
  const { tasks, completeTask } = useTaskContext()

  return (
    <div>
      {tasks.map((task, index) => (
        // Use "task.title" as a key attribute. Using "task" or "index" will create a bug
        <Task
          key={task.title}
          className={task.finished ? "selected-task" : "task"}
          task={task}
          onComplete={completeTask}
          taskIndex={index}
        />
      ))}
    </div>
  )
}

export default Tasks
