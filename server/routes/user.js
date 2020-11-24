const express = require("express");
const userController = require("../controller/user");
const auth = require("./middleware/auth");
const uploadImage = require("./middleware/uploadImage");
const resizeDP = require("./middleware/resizeDP");

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.post("/login-with-facebook", userController.loginWithFacebook);
router.delete("/signout", auth, userController.signout);
router.get("/is-authorized", auth, userController.isAuthorized);
router.get("/user-profile", auth, userController.getUserProfile);
router.get("/users", auth, userController.findUsers);
router.patch(
  "/change-dp",
  auth,
  uploadImage,
  resizeDP,
  userController.changeDP
);
router.patch("/remove-dp", auth, userController.removeDP);

module.exports = router;
