import { signIn, signUp } from "../../controller/auth/index.authController";
import { verifyToken } from "../../middleware/auth.middleware";


const express = require("express");
const router = express.Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.post("/welcome/:userID", verifyToken, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
  });

module.exports = router;
export {};
