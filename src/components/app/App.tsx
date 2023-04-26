import React from "react"
import Header from "../header/Header"
import AlertComponent from "../alert/AlertComponent"
import { TaskContextProvider } from "../../context/TaskContext"
import Tasks from "../tasks/Tasks"
import CreateNewTask from "../create-new-task/CreateNewTask"
import "./App.scss"

const App = () => {
  return (
    <div className="app">
      <div style={{ width: "45%" }}>
        <Header />
        <TaskContextProvider>
          <Tasks />
          <AlertComponent />
          <CreateNewTask />
        </TaskContextProvider>
      </div>
    </div>
  )
}

export default App
