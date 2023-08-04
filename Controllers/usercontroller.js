const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel.js");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed password:", hashedPassword);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User created: ${newUser}`);


  if (newUser) {
    res.status(201).json({ _id: newUser._id, email: newUser.email });
  } else {
    res.status(400);
    throw new Error("Failed to create user");
  }
  res.json({ message: "Register the user" });
});

const loginUser = asyncHandler(async (req, res) => {
  // Code for user login
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(404);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accesstoken = jwt.sign({
      user: {
        username: user.username,
        email: user.email,
        id: user.id,
      },
    },

      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "2m" }
    );
    res.json({ accesstoken });
  }
  else {
    res.status(401);
    throw new Error("email or passwordnot valid");
  }

});

const currentUser = asyncHandler(async (req, res) => {
  // Code for retrieving current user information
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
