import express from "express"
import cors from "cors"

const app = express()
const port = 8000

app.use(cors())
app.use(express.json())

const jsonToSend = [
  {
    user: {
        firstName: "Nikita",
        lastName: "129873",
    },
    email: "nik.pishchugin@gmail.com",
    github: "www.github.com/nikitap1298",
    city: "Berlin",
    country: "Germany",
  }
]

app.get("/", (req, res) => {
  res.json(jsonToSend)
})

app.listen(port, () => {
  console.log("Server is running on port " + port)
})
