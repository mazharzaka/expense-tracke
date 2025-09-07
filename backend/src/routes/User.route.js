const UserController = require("../controllers/User.controller");
const express = require("express");
const routerUser = express.Router();
const { registerValidation } = require("../utils/Vaildation");
const passport = require("passport");
const { verifyToken } = require("../middleware/auth.middle");
const upload = require("../middleware/multer.middle");
require("../config/google");

routerUser.post("/register", upload.single("avatar"), async (req, res) => {
  console.log(registerValidation);
  const { error } = registerValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  await UserController.register(req, res);
});
routerUser.post("/login", async (req, res) => {
  await UserController.login(req, res);
});
routerUser.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

routerUser.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  UserController.loginByGoogle
);

routerUser.get("/profile/:id", verifyToken, UserController.getProfile);

module.exports = routerUser;
