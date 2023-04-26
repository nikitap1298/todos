import React from 'react'
import { useTaskContext } from '../../context/TaskContext'
import Task from './Task'

export default function Tasks() {
    const {tasks, deleteTask} = useTaskContext()
  return (
    <div>
        {tasks.map((task,index) =><Task key={index} taskIndex={index} task={task} onDelete={deleteTask}/>)}
    </div>
  )
}