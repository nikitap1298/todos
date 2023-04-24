import React from "react"
import Header from "../header/Header"
import CreateNewTask from "../create-new-task/CreateNewTask"

const App = () => {
  return (
    <div className="app">
      <div style={{ width: "45%" }}>
        <Header />
        <CreateNewTask />
      </div>
    </div>
  )
}

export default App
