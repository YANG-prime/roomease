const express = require("express");

const bcrypt = require("bcryptjs");

const router = express.Router();

const Group = require("../models/Group");

const User = require("../models/User");

const authMiddleware =
  require("../middleware/authMiddleware");


// CREATE GROUP
router.post(
  "/create",
  authMiddleware,
  async (req, res) => {

    try {

      const {
        name,
        groupId,
        password,
      } = req.body;

      const existingGroup =
        await Group.findOne({
          groupId,
        });

      if (existingGroup) {

        return res.status(400).json({
          message:
            "Group ID already exists",
        });

      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      const newGroup =
        new Group({
          name,

          groupId,

          password:
            hashedPassword,

          owner: req.user.id,

          members: [req.user.id],

          pendingRequests: [],
        });

      const savedGroup =
        await newGroup.save();

      await User.findByIdAndUpdate(
        req.user.id,
        {
          group:
            savedGroup._id,
        }
      );

      res.status(201).json({
        message:
          "Group created successfully",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });

    }
  }
);


// JOIN GROUP
router.post(
  "/join",
  authMiddleware,
  async (req, res) => {

    try {

      const {
        groupId,
        password,
      } = req.body;

      const group =
        await Group.findOne({
          groupId,
        });

      if (!group) {

        return res.status(404).json({
          message:
            "Group not found",
        });

      }

      const isMatch =
        await bcrypt.compare(
          password,
          group.password
        );

      if (!isMatch) {

        return res.status(400).json({
          message:
            "Invalid password",
        });

      }

      if (
        group.members.some(
          (member) =>
            member.toString() ===
            req.user.id
        )
      ) {

        return res.status(400).json({
          message:
            "Already a member",
        });

      }

      if (
        group.pendingRequests.some(
          (request) =>
            request.toString() ===
            req.user.id
        )
      ) {

        return res.status(400).json({
          message:
            "Request already pending",
        });

      }

      group.pendingRequests.push(
        req.user.id
      );

      await group.save();

      res.json({
        message:
          "Join request sent",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });

    }
  }
);


// GET MY GROUP
router.get(
  "/my-group",
  authMiddleware,
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user.id
        );

      if (!user.group) {

        return res.json(null);

      }

      const group =
        await Group.findById(
          user.group
        )
          .populate(
            "owner",
            "name email"
          )
          .populate(
            "members",
            "name email"
          );

      if (!group) {

        return res.json(null);

      }

      res.json(group);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });

    }
  }
);


// GET PENDING REQUESTS
router.get(
  "/pending",
  authMiddleware,
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user.id
        );

      if (!user.group) {

        return res.json([]);

      }

      const group =
        await Group.findById(
          user.group
        ).populate(
          "pendingRequests",
          "name email"
        );

      if (!group) {

        return res.json([]);

      }

      res.json(
        group.pendingRequests
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });

    }
  }
);


// APPROVE MEMBER
router.put(
  "/approve/:userId",
  authMiddleware,
  async (req, res) => {

    try {

      const owner =
        await User.findById(
          req.user.id
        );

      if (!owner.group) {

        return res.status(400).json({
          message:
            "No group found",
        });

      }

      const group =
        await Group.findById(
          owner.group
        );

      if (!group) {

        return res.status(404).json({
          message:
            "Group not found",
        });

      }

      if (
        group.owner.toString() !==
        req.user.id
      ) {

        return res.status(403).json({
          message:
            "Only owner can approve",
        });

      }

      if (
        group.members.some(
          (member) =>
            member.toString() ===
            req.params.userId
        )
      ) {

        return res.status(400).json({
          message:
            "User already member",
        });

      }

      group.members.push(
        req.params.userId
      );

      group.pendingRequests =
        group.pendingRequests.filter(
          (id) =>
            id.toString() !==
            req.params.userId
        );

      await group.save();

      await User.findByIdAndUpdate(
        req.params.userId,
        {
          group: group._id,
        }
      );

      res.json({
        message:
          "Member approved",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });

    }
  }
);


// REMOVE MEMBER
router.put(
  "/remove/:userId",
  authMiddleware,
  async (req, res) => {

    try {

      const owner =
        await User.findById(
          req.user.id
        );

      const group =
        await Group.findById(
          owner.group
        );

      if (!group) {

        return res.status(404).json({
          message:
            "Group not found",
        });

      }

      if (
        group.owner.toString() !==
        req.user.id
      ) {

        return res.status(403).json({
          message:
            "Only owner can remove members",
        });

      }

      if (
        req.params.userId ===
        req.user.id
      ) {

        return res.status(400).json({
          message:
            "Owner cannot remove self",
        });

      }

      group.members =
        group.members.filter(
          (member) =>
            member.toString() !==
            req.params.userId
        );

      await group.save();

      await User.findByIdAndUpdate(
        req.params.userId,
        {
          group: null,
        }
      );

      res.json({
        message:
          "Member removed",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });

    }
  }
);

module.exports = router;