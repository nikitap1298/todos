import React from "react"
import { createRoot } from "react-dom/client"
import App from "./components/App"

// For using Bootstrap inside components. Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css"

const rootElement = document.getElementById("root") as HTMLBaseElement
const root = createRoot(rootElement)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
