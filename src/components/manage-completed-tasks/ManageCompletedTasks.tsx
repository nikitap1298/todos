import React from "react"
import { Button } from "react-bootstrap"
import { useTaskContext } from "../../context/TaskContext"
import "./ManageCompletedTasks.scss"

const ManageCompletedTasks = () => {
  const { deleteCompletedTasks } = useTaskContext()

  return (
    <div className="manage-completed-tasks">
      <Button variant="secondary" size="sm" onClick={deleteCompletedTasks}>
        Delete Tasks
      </Button>
    </div>
  )
}

export default ManageCompletedTasks
