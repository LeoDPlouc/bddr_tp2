const { Router } = require("express")

const { authentication } = require("../middlewares/authenticationMiddleware")

const { tripGet, tripPost, bookingGet, bookingPost } = require("../controllers/tripController")

const router = Router()

router.route("/")
    .post(authentication, tripPost)
    .get(authentication, tripGet)

router.route("/:id")
    .post(authentication, bookingPost)
    .get(authentication, bookingGet)

module.exports = router