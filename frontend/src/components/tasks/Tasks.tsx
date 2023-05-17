import React from "react"
import { useTaskContext } from "../../context/TaskContext"
import Task from "./Task"
import { TaskInterface } from "../../lib/interfaces/task.interface"
import { v4 as uuidv4 } from "uuid"

export default function Tasks(): JSX.Element {
  const { tasks, updateTask, completeTask } = useTaskContext()

  return (
    <div>
      {tasks.map((task: TaskInterface) => (
        // Use "task.title" as a key attribute. Using "task" or "index" will create a bug
        <Task
          key={uuidv4()}
          className={task.finished ? "task selected-task" : "task"}
          task={task}
          onEdit={updateTask}
          onComplete={completeTask}
          taskId={task._id}
        />
      ))}
    </div>
  )
}
