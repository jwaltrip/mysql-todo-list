require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
// setup sequelize connection instance
require("./database/connection")

const app = express()

// import routes
// const userRoutes = require("./routes/UserRoute");
const testDbRoute = require("./routes/TodosRoute2")

// setup middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// setup routes
// app.use('/api/users', userRoutes);
app.use("/api", testDbRoute)

// set the backend server port
const port = process.env.PORT || 5000

// a catchall route if any API calls aren't used, then serve the index.html built by react
// this needs to be after all other routes
// used for when deoployed to Heroku
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"))
})

app.listen(port, () => {
  console.log(`Backend server running and listening on port ${port}`)
})

module.exports = app
