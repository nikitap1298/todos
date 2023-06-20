import React from "react"
import { ListContextProvider } from "../../context/ListContext"
import SideBar from "../side-bar/SideBar"
import Header from "../header/Header"
import Toasts from "../toast/Toasts"
import { TaskContextProvider } from "../../context/TaskContext"
import CompletedTasksDropdown from "../completed-tasks-dropdown/CompletedTasksDropdown"
import Tasks from "../tasks/Tasks"
import CreateNewTask from "../create-new-task/CreateNewTask"
import { ModalDeleteContextProvider } from "../../context/ModalDeleteContext"
import "./Todos.scss"

export default function Todos(): JSX.Element {
  return (
    <>
      <ListContextProvider>
        <ModalDeleteContextProvider>
          <SideBar />
          <div className="todos">
            <div style={{ width: "55%", marginBottom: "25px" }}>
              <Header />
              <TaskContextProvider>
                <Toasts global={false} />
                <CompletedTasksDropdown />
                <Tasks />
                <CreateNewTask />
              </TaskContextProvider>
            </div>
          </div>
        </ModalDeleteContextProvider>
      </ListContextProvider>
    </>
  )
}
