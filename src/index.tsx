import React from "react"
import { createRoot } from "react-dom/client"
import { App } from "./components/app/App"


const rootElement = document.getElementById("root") as HTMLBaseElement
const root = createRoot(rootElement)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
