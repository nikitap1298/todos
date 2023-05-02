import React from "react"
import Header from "./components/header/Header"
import ManageCompletedTasks from "./components/manage-completed-tasks/ManageCompletedTasks"
import { AlertContextProvider } from "./context/AlertContext"
import AlertsComponent from "./components/alert/AlertsComponent"
import { TaskContextProvider } from "./context/TaskContext"
import Tasks from "./components/tasks/Tasks"
import CreateNewTask from "./components/create-new-task/CreateNewTask"
import "./App.scss"

const App = () => {
  return (
    <div className="app">
      <div style={{ width: "55%", marginBottom: "25px" }}>
        <Header />
        <AlertContextProvider>
          <TaskContextProvider>
            <ManageCompletedTasks />
            <Tasks />
            <AlertsComponent />
            <CreateNewTask />
          </TaskContextProvider>
        </AlertContextProvider>
      </div>
    </div>
  )
}

export default App
