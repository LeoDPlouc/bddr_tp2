const { Op } = require("sequelize")

const Trip = require("../models/trip")
const User = require("../models/user")
const Booking = require("../models/creature")

module.exports.tripPost = async function (req, res, next) {

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

module.exports.tripGet = function (req, res, next) {
    res.render("trip")
}

module.exports.bookingPost = async function (req, res, next) {
    //Fetch the information of the trip and the driver
    var trip = (await Trip.findByPk(req.params.id)).dataValues
    var driver = (await User.findByPk(trip.driverId)).dataValues

    //Compute the number of seat available
    var seatsAvailable = await Booking.sum("seats", { where: { TripId: trip.id } }).catch((err) => console.log())
    trip.seatsAvailable = trip.seats - seatsAvailable

    //Verify that the user doesn't book more seats than availbable
    if (trip.seatsAvailable < req.body.seats)
        res.render("booking", { trip: trip, mine: req.session.user.id == trip.driverId, driver: driver, errors: { seats: "There's not enough seats available" } })
    else {
        //The errors are checked in the next page so we cache the information required to rerender the page
        req.session.booking = { seats: req.body.seats, UserId: req.session.user.id, TripId: trip.id }
        req.session.bookingPage = { trip: trip, mine: req.session.user.id == trip.driverId, driver: driver, errors: errors }

        res.redirect("/pay")
    }


}

module.exports.bookingGet = async function (req, res, next) {
    //Fetch the information of the trip and the driver
    var trip = (await Trip.findByPk(req.params.id)).dataValues
    var driver = (await User.findByPk(trip.driverId)).dataValues

    //Compute the number of seat available
    var seatsAvailable = await Booking.sum("seats", { where: { TripId: trip.id } })
    trip.seatsAvailable = trip.seats - seatsAvailable

    res.render("booking", { trip: trip, mine: req.session.user.id == trip.driverId, driver: driver })
}