import React, { useState, useEffect } from "react"
import { DropdownButton, Dropdown } from "react-bootstrap"
import { useTaskContext } from "../../context/TaskContext"
import "./ManageCompletedTasks.scss"

const ManageCompletedTasks = () => {
  const { showCompletedTasks, showOrHideCompletedTasks, deleteCompletedTasks } =
    useTaskContext()
  let [firstButtonTitle, setFirstButtonTitle] = useState("")

  useEffect(() => {
    if (showCompletedTasks) {
      setFirstButtonTitle("Hide completed tasks")
    } else {
      setFirstButtonTitle("Show completed tasks")
    }
  }, [showCompletedTasks])

  return (
    <div className="manage-completed-tasks">
      <DropdownButton variant="secondary" title="Edit" size="sm">
        <Dropdown.Item eventKey="1" onClick={showOrHideCompletedTasks}>
          {firstButtonTitle}
        </Dropdown.Item>
        <Dropdown.Item eventKey="2" onClick={deleteCompletedTasks}>
          Delete completed tasks
        </Dropdown.Item>
      </DropdownButton>
    </div>
  )
}

export default ManageCompletedTasks
