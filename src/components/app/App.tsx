import React, { useEffect, useState } from "react"
import Header from "../header/Header"
import AlertComponent from "../alert/AlertComponent"

import { TaskContextProvider } from "../../context/TaskContext"
import Tasks from "../task/Tasks"

import CreateNewTask from "../create-new-task/CreateNewTask"
import "./App.scss"

const AlertContext = React.createContext({ title: "", message: "" })
const CreateNewTaskContext = React.createContext({
  addNewTask: (_newTask: string) => {},
})

const App = () => {
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  // const renderTaskComponent = tasksArray.map((task) => (
  //   <TaskContext.Provider
  //     key={task}
  //     value={{
  //       task: task,
  //       onDelete: deleteTask,
  //       arrayIndex: tasksArray.indexOf(task),
  //     }}
  //   >
  //     <Task />
  //   </TaskContext.Provider>
  // ))

  return (
    <div className="app">
      <div style={{ width: "45%" }}>
        <Header />
        <TaskContextProvider>
          <Tasks />
          {showAlert ? (
            <AlertContext.Provider
              value={{
                title: "This task already exists:",
                message: alertMessage,
              }}
            >
              <AlertComponent />
            </AlertContext.Provider>
          ) : null}
          <CreateNewTask />
        </TaskContextProvider>
      </div>
    </div>
  )
}

export { App, AlertContext, CreateNewTaskContext }
