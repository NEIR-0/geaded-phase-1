const express = require('express')
const app = express()
const port = 3000
const Controllers = require("./Controllers/controller")

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

app.get("/", Controllers.homepage)
app.get("/shoes/add", Controllers.formShoes)
app.post("/shoes/add", Controllers.postShoes)
// 	/shoes/status/:id/available
app.get("/shoes/status/:id/available", Controllers.updateAvailable)

// /shoes/status/:id/discontinue
app.get("/shoes/status/:id/discontinue", Controllers.updateAvailable)

// /shoes/delete/:id
app.get("/shoes/delete/:id", Controllers.delete)




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})