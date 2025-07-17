const mongoose = require("mongoose");

const userWalletSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    balance: { type: Number, default: 0 },
    currency: { type: String, default: "USD" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserWallet", userWalletSchema);
