import React from "react"
import Header from "./components/header/Header"
import { AlertContextProvider } from "./context/AlertContext"
import AlertsComponent from "./components/alert/AlertsComponent"
import { TaskContextProvider } from "./context/TaskContext"
import CompletedTasksDropdown from "./components/completed-tasks-dropdown/CompletedTasksDropdown"
import Tasks from "./components/tasks/Tasks"
import CreateNewTask from "./components/create-new-task/CreateNewTask"
import "./App.scss"

export default function App(): JSX.Element {
  return (
    <div className="app">
      <div style={{ width: "55%", marginBottom: "25px" }}>
        <Header />
        <AlertContextProvider>
          <TaskContextProvider>
            <CompletedTasksDropdown />
            <Tasks />
            <AlertsComponent />
            <CreateNewTask />
          </TaskContextProvider>
        </AlertContextProvider>
      </div>
    </div>
  )
}
