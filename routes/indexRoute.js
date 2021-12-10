const { Router } = require("express")

const { indexGet, indexPost} = require("../controllers/indexController")

const router = Router()

router.route("/")
    .post(indexPost)
    .get(indexGet)

module.exports = router