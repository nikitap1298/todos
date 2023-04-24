import React from "react"
import { createRoot } from "react-dom/client"
import App from "./components/app/App"

// For using Bootstrap inside components. Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css"

// Apply CSS
import "./components/app/app.css"
import "./components/header/header.css"
import "./styles/create-new-task.css"
import "./styles/task.css"

const rootElement = document.getElementById("root") as HTMLBaseElement
const root = createRoot(rootElement)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
