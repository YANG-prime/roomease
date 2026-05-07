const mongoose =
  require("mongoose");

const userSchema =
  new mongoose.Schema({

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    rewardPoints: {
      type: Number,
      default: 0,
    },

    group: {
      type:
        mongoose.Schema.Types.ObjectId,

      ref: "Group",

      default: null,
    },

  });

module.exports =
  mongoose.model(
    "User",
    userSchema
  );