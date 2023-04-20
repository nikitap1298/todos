import React from "react"
import Header from "./Header"
import Task from "./Task"
import CreateNewTask from "./CreateNewTask"

const App = () => {
  return (
    <div className="app-div">
      <Header />
      <Task />
      <CreateNewTask />
    </div>
  )
}

export default App
