const { Router } = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { loginUser, registerUser } = require("../controller/Auth.Controller");
const multer = require("multer");
const storage = multer({
  dest: 'avatar'
})
const router = Router();

router.post("/register", storage.single("image"), registerUser);
router.post("/login", (req, res) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
      const token = jwt.sign({ user }, process.env.KEY_SECRET);
      res.status(200).json({ user, token });
    });
  })(req, res);
});
/* router.post(
  "/login",
  passport.authenticate("local", { failRedirect: "/login" }),
  (err, req, res, next) => {
    if (err) next(err);
    console.log("¡Ha iniciado sesión!");
  }
); */

module.exports = router;
