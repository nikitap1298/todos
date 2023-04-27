import React from "react"
import Header from "./components/header/Header"
import AlertComponent from "./components/alert/AlertComponent"
import { TaskContextProvider } from "./context/TaskContext"
import Tasks from "./components/tasks/Tasks"
import CreateNewTask from "./components/create-new-task/CreateNewTask"
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
