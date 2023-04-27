import React, { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import "./Task.scss"
import { PriorityEnum } from "../../enums/PriorityEnum"

interface TaskInterface {
  title: string
  priority: PriorityEnum
  createdAt: Date
  finished: boolean
  finishedAt: Date
}

interface TaskProps {
  task: string
  onDelete: (index: number) => void
  taskIndex: number
}

const Task = (props: TaskProps) => {
  const { task, onDelete, taskIndex } = props

  return (
    <div className="task">
      <div>
        <h1>{task}</h1>
        <div>
          <p>Date</p>
          <Form>
            <Form.Check
              type="checkbox"
              label=""
              onChange={() => onDelete(taskIndex)}
            />
          </Form>
        </div>
      </div>
      <hr></hr>
    </div>
  )
}

export default Task
