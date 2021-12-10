const express = require("express")
const session = require("express-session")
const path = require("path")
const Connector = require("./connector")

const app = express()

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
const indexRouter = require("./routes/indexRoute")

app.use("/", indexRouter)

//app.use("/style.css", (req, res) => res.sendFile(path.join(__dirname, "style.css")))

app.use("/js/:res", (req, res) => res.sendFile(path.join(__dirname, "src/js", req.params.res)))
app.use("/img/:res", (req, res) => res.sendFile(path.join(__dirname, "src/img", req.params.res)))
app.use("/css/:res", (req, res) => res.sendFile(path.join(__dirname, "src/css", req.params.res)))


//Open the server
app.listen(3000, () => console.log("App started on port 3000"))