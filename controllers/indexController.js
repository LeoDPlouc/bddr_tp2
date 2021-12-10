const { Op } = require("sequelize")

module.exports.indexPost = async function (req, res, next) {

    //Parse the frequency from the post request body
    var frequency = ""
    if (req.body.monday) frequency += "Mon"
    if (req.body.tuesday) frequency += "Tue"
    if (req.body.wednesday) frequency += "Wed"
    if (req.body.thursday) frequency += "Thu"
    if (req.body.friday) frequency += "Fri"
    if (req.body.saturday) frequency += "Sat"
    if (req.body.sunday) frequency += "Sun"

    req.body.frequency = frequency
    req.body.driverId = req.session.user.id

    await Trip.create(req.body)
        .then((succ) => res.redirect("/"))
        .catch((err) => {
            errors = {}
            //Extract the error messages from the Sequelize error
            err.errors.forEach(element => {
                errors[element.path] = element.message
            })
            res.render("trip", { errors: errors })
        })
}

module.exports.indexGet = function (req, res, next) {
    res.render("index")
}