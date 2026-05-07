const mongoose =
  require("mongoose");

const groupSchema =
  new mongoose.Schema({

    name: {
      type: String,
      required: true,
    },

    groupId: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    owner: {
      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User",
    },

    members: [
      {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",
      },
    ],

    pendingRequests: [
      {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",
      },
    ],

  });

module.exports =
  mongoose.model(
    "Group",
    groupSchema
  );