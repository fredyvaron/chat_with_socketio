const { Router } = require("express");
const { getMessagesByUsaer, deleteMessage, readMessage } = require("../controller/Message.Controller");
const router = Router();

router.put("/read/:id", readMessage)
router.get("/:id", getMessagesByUsaer);
router.delete("/:id", deleteMessage);


module.exports = router;
