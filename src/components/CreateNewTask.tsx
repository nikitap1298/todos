import React from "react"
import { Button } from "react-bootstrap"

const CreateNewTask: React.FC = () => {
  return (
    <div className="create-new-task-div">
      <input type="text" placeholder="Add some task" />
      <Button variant="primary">Primary</Button>{" "}
    </div>
  )
}

export default CreateNewTask
