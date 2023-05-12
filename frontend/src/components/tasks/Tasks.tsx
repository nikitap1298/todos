import React from "react"
import { useTaskContext } from "../../context/TaskContext"
import Task from "./Task"
import { TaskInterface } from "../../lib/interfaces/task.interface"

export default function Tasks(): JSX.Element {
  const { tasks, updateTask, completeTask } = useTaskContext()

  return (
    <div>
      {tasks.map((task: TaskInterface, index: number) => (
        // Use "task.title" as a key attribute. Using "task" or "index" will create a bug
        <Task
          key={task.title}
          className={task.finished ? "selected-task" : "task"}
          task={task}
          onEdit={updateTask}
          onComplete={completeTask}
          taskIndex={index}
        />
      ))}
    </div>
  )
}
