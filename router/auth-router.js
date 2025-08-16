const authcontroller = require("../controllers/auth-controller");
const express = require("express");
const validate = require("../middleware/validate-middleware");
const { signupSchema, loginSchema } = require("../validators/auth-validator");
const authMiddleware = require("../middleware/auth-middleware");

const router = express.Router();

router.route("/").get(authcontroller.home);

router.post("/register", validate(signupSchema), authcontroller.register);
router.post("/login",validate(loginSchema), authcontroller.login);

// router.route("/user").get(authcontroller.user);

router.route("/user").get(authMiddleware, authcontroller.user);


module.exports = router;
