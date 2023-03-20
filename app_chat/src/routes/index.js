const { Router } = require("express");
const router = Router();

// ---------Importaciones
const userRouter = require("./user");
const messageRouter = require("./message");
const authRouter = require("./auth")
const conversationRouter = require("./conversation");
const emailRouter = require("./email")

// --------- Routes
router.use("/user", userRouter);
router.use("/message", messageRouter);
router.use("/auth", authRouter);
router.use("/conversation", conversationRouter);
router.use("/email", emailRouter);

module.exports = router;
