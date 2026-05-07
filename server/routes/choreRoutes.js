const express =
  require("express");

const router =
  express.Router();

const Chore =
  require("../models/Chore");

const User =
  require("../models/User");

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );


// GET CHORES
router.get(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      // CURRENT USER
      const user =
        await User.findById(
          req.user.id
        );

      // GET ONLY GROUP CHORES
      const chores =
        await Chore.find({
          group:
            user.group,
        })
          .populate(
            "assignedTo",
            "name email"
          );

      res.json(chores);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });

    }
  }
);


// ADD CHORE
router.post(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      const {
        task,
        assignedTo,
        deadline,
        points,
      } = req.body;

      // CURRENT USER
      const user =
        await User.findById(
          req.user.id
        );

      // USER HAS NO GROUP
      if (!user.group) {

        return res.status(400).json({
          message:
            "You are not in a group",
        });

      }

      // CREATE CHORE
      const newChore =
        new Chore({
          task,

          assignedTo,

          group:
            user.group,

          deadline,

          points:
            points || 10,
        });

      const savedChore =
        await newChore.save();

      res.status(201).json(
        savedChore
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });

    }
  }
);


// UPDATE CHORE
router.put(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      // CURRENT USER
      const user =
        await User.findById(
          req.user.id
        );

      // FIND CHORE
      const chore =
        await Chore.findOne({
          _id:
            req.params.id,

          group:
            user.group,
        });

      if (!chore) {

        return res.status(404).json({
          message:
            "Chore not found",
        });

      }

      const wasCompleted =
        chore.completed;

      // UPDATE CHORE
      const updatedChore =
        await Chore.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      // GIVE REWARD POINTS
      if (
        !wasCompleted &&
        req.body.completed === true
      ) {

        await User.findByIdAndUpdate(
          chore.assignedTo,
          {
            $inc: {
              rewardPoints:
                chore.points,
            },
          }
        );

      }

      // REMOVE REWARD POINTS
      if (
        wasCompleted &&
        req.body.completed === false
      ) {

        await User.findByIdAndUpdate(
          chore.assignedTo,
          {
            $inc: {
              rewardPoints:
                -chore.points,
            },
          }
        );

      }

      res.json(
        updatedChore
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });

    }
  }
);


// DELETE CHORE
router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      // CURRENT USER
      const user =
        await User.findById(
          req.user.id
        );

      // DELETE ONLY GROUP CHORE
      const deletedChore =
        await Chore.findOneAndDelete({
          _id:
            req.params.id,

          group:
            user.group,
        });

      if (!deletedChore) {

        return res.status(404).json({
          message:
            "Chore not found",
        });

      }

      res.json({
        message:
          "Chore deleted",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });

    }
  }
);

module.exports =
  router;