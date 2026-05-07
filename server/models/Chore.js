const mongoose =
  require("mongoose");

const choreSchema =
  new mongoose.Schema({

    task: {
      type: String,
      required: true,
    },

    assignedTo: {
      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    group: {
      type:
        mongoose.Schema.Types.ObjectId,

      ref: "Group",

      required: true,
    },

    deadline: {
      type: String,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    points: {
      type: Number,
      default: 10,
    },

  });

module.exports =
  mongoose.model(
    "Chore",
    choreSchema
  );