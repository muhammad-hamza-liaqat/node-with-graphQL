const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    wallet: { type: mongoose.Schema.Types.ObjectId, ref: "UserWallet" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
