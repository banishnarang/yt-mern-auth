const express = require("express");
const router = express.Router();

// import controllers
const {
	register,
	login,
	logout,
	getLoggedInUser,
} = require("../controllers/user");

// import middlewares
const { userRegisterValidator, userById } = require("../middlewares/user");
const { verifyToken } = require("../middlewares/auth");

// api routes
router.post("/register", userRegisterValidator, register);
router.post("/login", login);
router.get("/logout", logout);

router.get("/user", verifyToken, userById, getLoggedInUser);

module.exports = router;
