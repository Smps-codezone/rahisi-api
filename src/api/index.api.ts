const express = require("express")
const router = express.Router()

const{createCert, getAllCerts, getOneCert} = require("../controller/index.controller")

router
  .route("/")
  .post(createCert)
  .get(getAllCerts)
router
  .route("/:id")
  .get(getOneCert)

module.exports = router
export {}