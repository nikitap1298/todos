import React from "react"
import { ListContextProvider } from "../../context/ListContext"
import SideBar from "../side-bar/SideBar"
import Header from "../header/Header"
import { AlertContextProvider } from "../../context/AlertContext"
import { TaskContextProvider } from "../../context/TaskContext"
import CompletedTasksDropdown from "../completed-tasks-dropdown/CompletedTasksDropdown"
import Tasks from "../tasks/Tasks"
import AlertsComponent from "../alert/AlertsComponent"
import CreateNewTask from "../create-new-task/CreateNewTask"
import { useUserContext } from "../../context/UserContext"
import Authentification from "../authentification/Authentification"
import { ModalDeleteContextProvider } from "../../context/ModalDeleteContext"
import "./Todos.scss"

export default function Todos(): JSX.Element {
  const { userHasAccess } = useUserContext()

  return userHasAccess ? (
    <ListContextProvider>
      <ModalDeleteContextProvider>
        <SideBar />
        <div className="todos">
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
      </ModalDeleteContextProvider>
    </ListContextProvider>
  ) : (
    <Authentification />
  )
}
