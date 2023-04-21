import React from "react"
import Header from "./Header"
import CreateNewTask from "./CreateNewTask"

const App = () => {
  return (
    <div className="app-div">
      <div style={{ width: "45%" }}>
        <Header />
        <CreateNewTask />
      </div>
    </div>
  )
}

export default App
