import React, { useState, useEffect } from "react"
import { DropdownButton, Dropdown } from "react-bootstrap"
import { useTaskContext } from "../../context/TaskContext"
import "./ManageCompletedTasks.scss"

const ManageCompletedTasks = () => {
  const { tasks, showOrHideCompletedTasks, deleteCompletedTasks } =
    useTaskContext()
  let [buttonTitle, setButtonTitle] = useState("task")

  // Check if objects in "tasks" contains "finished === true"
  const finishedIsTrue = tasks.filter((element) => element.finished === true)

  useEffect(() => {
    if (tasks.some((element) => element.finished === true)) {
      if (finishedIsTrue.length <= 1) {
        setButtonTitle("task")
      } else {
        setButtonTitle("tasks")
      }
    }
  }, [tasks, finishedIsTrue])

  return (
    <div className="manage-completed-tasks">
      <DropdownButton title="Edit" size="sm">
        <Dropdown.Item eventKey="1" onClick={showOrHideCompletedTasks}>
          Show / hide completed {buttonTitle}
        </Dropdown.Item>
        <Dropdown.Item eventKey="2" onClick={deleteCompletedTasks}>
          Delete completed {buttonTitle}
        </Dropdown.Item>
      </DropdownButton>
      {/* <Button variant="secondary" size="sm" onClick={deleteCompletedTasks}>
        {buttonTitle}
      </Button> */}
    </div>
  )
}

export default ManageCompletedTasks
