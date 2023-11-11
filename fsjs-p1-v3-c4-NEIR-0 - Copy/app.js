const express = require('express')
const app = express()
const port = 3000
const controller = require("./Controllers/controller")
// routes
const author = require("./Routes/author")
const post = require("./Routes/post")

// set up
app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))

// homepage
app.get("/", controller.homepage)

// router use
app.use("/authors", author)
app.use("/posts", post)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})