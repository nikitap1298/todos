import React, { useEffect, useState, useContext } from "react"
import { localStorageTasksKey } from "../constants/constants"

const TaskContext = React.createContext({
    tasks: [],
    addTask: (newTask: string) => { },
    deleteTask: (index: number) => { },
})

export const TaskContextProvider = ({ children }: any) => {
    let [tasks, setTasks] = useState([])

    useEffect(() => {
        const tasksArrayLocalStorage = JSON.parse(
            localStorage.getItem(localStorageTasksKey)
        )
        if (tasksArrayLocalStorage) {
            setTasks(tasksArrayLocalStorage)
        }
    }, [])

    const addTask = (newTask: string) => { }
    const deleteTask = (index: number) => { }

    return <TaskContext.Provider value={{ tasks, addTask, deleteTask }}>
        {children}
    </TaskContext.Provider>
}
export const useTaskContext = (): any => useContext(TaskContext) as any

// export const CreateNewTaskContext = React.createContext({
//   addNewTask: (_newTask: string) => {},
// })
