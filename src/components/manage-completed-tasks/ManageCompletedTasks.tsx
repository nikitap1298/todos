import React, { useState, useEffect } from "react"
import { Button } from "react-bootstrap"
import { useTaskContext } from "../../context/TaskContext"
import "./ManageCompletedTasks.scss"

const ManageCompletedTasks = () => {
  const { tasks, deleteCompletedTasks } = useTaskContext()
  let [className, setClassName] = useState("manage-completed-tasks-hidden")

  useEffect(() => {
    if (tasks.some((element) => element.finished === true)) {
      setClassName("manage-completed-tasks")
    } else {
      setClassName("manage-completed-tasks-hidden")
    }
  }, [tasks])

  return (
    <div className={className}>
      <Button variant="secondary" size="sm" onClick={deleteCompletedTasks}>
        Delete completed tasks
      </Button>
    </div>
  )
}

export default ManageCompletedTasks
