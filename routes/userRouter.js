const asyncHandler = require("express-async-handler");
const express = require("express");
const { registerUser, loginUser, currentUser } = require("../Controllers/usercontroller.js")
const validatetoken = require("../middleware/validationtoken.js")
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validatetoken, currentUser);

module.exports = router;