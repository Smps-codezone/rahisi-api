const Users = require("../../schemas/users.schema");
const LoginSession = require("../../schemas/loginSession.schema")
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let TOKEN_KEY = "edbvfyuevwfguvwgufvwg";

export const signUp = asyncHandler(async (req: any, res: any) => {
  const { name, email, password, phoneNumber, confirmPassword } = req.body;
  if (!name || !email || !password || !phoneNumber) {
    return res.status(400).json({
      message: "Please provide all the required fields",
    });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({
      message: "password must be the same",
    });
  }
  const user = await Users.findOne({ email: email });
  if (user) {
    return res.status(400).json({ msg: "User already exists" });
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return Error(err);
    }
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) {
        return Error(err);
      }
      const newUser = await Users.create({
        name: name,
        email: email,
        password: hash,
        phoneNumber: phoneNumber,
      });
      if (!newUser) {
        return res.status(500).json({
          success: false,
          message: "User could not be created",
        });
      }
      const createToken = jwt.sign(
        { newUser_id: newUser._id, email },
        TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      newUser.token = createToken;
      newUser.save();
      return res.status(200).json({
        success: true,
        data: newUser,
      });
    });
  });
});

export const signIn = asyncHandler(async (req: any, res: any) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide all the required fields",
    });
  }
  const user = await Users.findOne({ email: email });
  if (!user) {
    return res.status(400).json({ msg: "User does not exist" });
  }
  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      return Error(err);
    }
    if (result) {
      const createToken = jwt.sign({ newUser_id: user._id, email }, TOKEN_KEY, {
        expiresIn: "2h",
      });
      user.token = createToken;
      const newLogginSession = new LoginSession({
        email: email,
        password: password,
        user_id: user._id,
        token: createToken,
      });
      newLogginSession.save();
      return res.status(200).json({
        success: true,
        data: newLogginSession,
      });
    }
    return res.status(400).json({ msg: "Invalid password" });
  });
});
