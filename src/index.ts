const express = require("express")
const cors = require("cors")
const app = express()



// db connection
require("./db/db")

// routes
const certsRouter = require("./api/index.api")
// //midlleware
app.use(cors())
app.use(express.json())



app.use("/rahisi/certs", certsRouter)

//server port
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`api running on ${port}`))
export{}