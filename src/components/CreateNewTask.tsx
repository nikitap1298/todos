import React from "react"
import { Form } from "react-bootstrap"
import { Button } from "react-bootstrap"

const CreateNewTask: React.FC = () => {
  return (
    <div className="create-new-task-div">
      <Form className="create-new-task-form">
        <Form.Control type="text" placeholder="Add some task" size="lg" />
        <Button variant="secondary" size="lg">
          Add
        </Button>{" "}
      </Form>
    </div>
  )
}

export default CreateNewTask
