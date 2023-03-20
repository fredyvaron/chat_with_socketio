const { Router } = require("express");
const {
  getUser,
  getUserById,
  updateUserById,
  searchByName,
} = require("../controller/User.Controller");
const { validateToken } = require("../middleware/jwt");
const multer = require("multer");
const storage = multer({
  dest: "avatar",
});
const router = Router();

console.log("user");
router.get("/", validateToken, getUser);
router.get("/:id", getUserById);
router.put("/:id", validateToken,storage.single("image"), updateUserById);
router.get("/search/user/:name", searchByName);

module.exports = router;
