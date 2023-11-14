const express = require('express')
const app = express()
const port = 3000
const Controllers = require("./Controllers/controller")
// route
const productionHouses = require("./Routes/productionsHouse")
const movie = require("./Routes/movie")


app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:true}))

app.get("/", Controllers.homepage)

app.use("/production-houses", productionHouses)
app.use("/movies", movie)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})