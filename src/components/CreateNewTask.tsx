import React from "react"
import { Form } from "react-bootstrap"
import { Button } from "react-bootstrap"

const CreateNewTask: React.FC = () => {
  return (
    <div className="create-new-task-div">
      <Form.Control type="text" placeholder="Add some task" readOnly />
      <Button variant="secondary" size="sm">
        Add
      </Button>{" "}
    </div>
  )
}

export default CreateNewTask
