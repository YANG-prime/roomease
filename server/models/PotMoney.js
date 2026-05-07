const mongoose = require("mongoose");

const potMoneySchema =
  new mongoose.Schema(
    {
      amount: {
        type: Number,
        required: true,
      },

      note: {
        type: String,
        required: true,
      },

      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "PotMoney",
  potMoneySchema
);