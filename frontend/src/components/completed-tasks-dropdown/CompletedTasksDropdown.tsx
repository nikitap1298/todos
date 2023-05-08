import React from "react"
import { DropdownButton, Dropdown } from "react-bootstrap"
import { useTaskContext } from "../../context/TaskContext"
import "./CompletedTasksDropdown.scss"

export default function CompletedTasksDropdown(): JSX.Element {
  const { showCompletedTasks, showOrHideCompletedTasks, deleteCompletedTasks } =
    useTaskContext()

  return (
    <div className="completed-tasks-dropdown">
      <DropdownButton variant="secondary" title="Edit" size="sm">
        <Dropdown.Item eventKey="1" onClick={showOrHideCompletedTasks}>
          {showCompletedTasks ? "Hide completed tasks" : "Show completed tasks"}
        </Dropdown.Item>
        <Dropdown.Item eventKey="2" onClick={deleteCompletedTasks}>
          Delete completed tasks
        </Dropdown.Item>
      </DropdownButton>
    </div>
  )
}
