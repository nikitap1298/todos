import React from "react"
import Header from "./Header"
import CreateNewTask from "./CreateNewTask"

const App = () => {
  const appStyle: {
    width: string
  } = {
    width: "45%",
  }

  return (
    <div className="app-div">
      <div style={appStyle}>
        <Header />
        <CreateNewTask />
      </div>
    </div>
  )
}

export default App
