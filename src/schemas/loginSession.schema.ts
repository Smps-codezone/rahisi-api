const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const session = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const LoginSession = mongoose.model("LoginSession", session);
module.exports = LoginSession;
