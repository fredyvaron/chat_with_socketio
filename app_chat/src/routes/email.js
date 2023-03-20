const { Router } = require("express");
const { sendMail } = require("../controller/Email.Controller");

const router = Router();

router.post("/", sendMail)

module.exports = router