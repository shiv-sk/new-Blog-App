const express = require("express");
const router = express.Router();
const validationMiddleware = require("../middleware/validation.middleware");
const userValidation = require("../validation/user.Validation");
const userController = require("../controller/user.controller");
const userLoginValidation = require("../validation/userlogin.validation");

//routes
router.route("/register").post(validationMiddleware(userValidation) , userController.registerUser);
router.route("/currentUser").get(userController.currentUser);
router.route("/login").post(validationMiddleware(userLoginValidation) , userController.loginuser);
router.route("/logout").post(userController.logoutUser);

module.exports = router