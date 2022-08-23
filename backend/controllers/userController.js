const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    console.log(`Please Enter all the Feilds`.red.bold.underline);
    return res.status(400).json({ message: "Please Enter all the Feilds" });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    console.log(`User already exist`.red.bold.underline);
    return res.status(400).json({ message: "User already exists!!" });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      message: "Successfully Resgitered!!!",
      token: generateToken(user._id),
    });

    console.log(
      `${user.name} Registered Successfully with email ${user.email}!!`.green
        .bold.underline
    );
  } else {
    res.status(400);
    throw new Error("User not found");
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      message: "Successfully Logged In!!!",
      token: generateToken(user._id),
    });
    console.log(`${user.name} Signed In Successfully!!`.cyan.bold.underline);
  } else {
    console.log(`Invalid Email or Password`.red.bold.underline);
    return res.status(401).json({ message: "Invalid Email or Password" });
  }
};

module.exports = { registerUser, authUser };
