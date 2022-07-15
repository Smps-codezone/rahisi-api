const jwt = require("jsonwebtoken");
const LoginSession = require("../schemas/loginSession.schema");
let ObjectId = require("mongoose").Types.ObjectId;

export const verifyToken = async (req: any, res: any, next: any) => {
  const { userID } = req.params;
  if (ObjectId.isValid(new ObjectId(userID)) === false) {
    return res.status(400).json({
      message: "Invalid userID",
    });
  }
  const loggedInUser = await LoginSession.findOne({ user_id: userID });
  const token = loggedInUser.token;
  console.log(token);
  let TOKEN_KEY = "edbvfyuevwfguvwgufvwg";
  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }
  jwt.verify(token, TOKEN_KEY, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
    req.userId = decoded.newUser_id;
    next();
  });
};


