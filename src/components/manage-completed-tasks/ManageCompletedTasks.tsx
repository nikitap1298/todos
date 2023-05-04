import React, { useState, useEffect } from "react"
import { DropdownButton, Dropdown } from "react-bootstrap"
import { useTaskContext } from "../../context/TaskContext"
import "./ManageCompletedTasks.scss"

const CompletedTasksDropdown = () => {
  const { showCompletedTasks, showOrHideCompletedTasks, deleteCompletedTasks } = useTaskContext()

  return (
    <div className="manage-completed-tasks">
      <DropdownButton variant="secondary" title="Edit" size="sm">
        <Dropdown.Item eventKey="1" onClick={showOrHideCompletedTasks}>
          {showCompletedTasks? "Hide completed tasks" : "Show completed tasks"}
        </Dropdown.Item>
        <Dropdown.Item eventKey="2" onClick={deleteCompletedTasks}>
          Delete completed tasks
        </Dropdown.Item>
      </DropdownButton>
    </div>
  )
}

export default CompletedTasksDropdown
