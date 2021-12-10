const express = require("express")
const session = require("express-session")
const path = require("path")
const Connector = require("./connector")

const app = express()


await Connector.authenticate()
    .then(() => console.log("Database connected"))
    .catch((err) => ("Connection to database failed\nTrace: " + err))

//Set the rendering engine for the web pages
app.set("view engine", "pug")

//Set middlewares to parse into req.body the body and the url encoded parameters of the requests
app.use(express.json())
app.use(express.urlencoded())

//Set a middleware to open session to the user
app.use(session({
    secret: "SESSION_SECRET",
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 2600000000
    }
}))

//Register the routes of the app
//const tripRouter = require("./routes/tripRoute")

//app.use("/trip", tripRouter)

app.use("/style.css", (req, res) => res.sendFile(path.join(__dirname, "style.css")))

//Open the server
app.listen(3000, () => console.log("App started on port 3000"))