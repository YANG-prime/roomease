const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/User");


// REGISTER
router.post(
  "/register",
  async (req, res) => {

    try {

      let {
        name,
        email,
        password,
      } = req.body;

      // CLEAN EMAIL
      email =
        email
          .trim()
          .toLowerCase();

      // CHECK EXISTING USER
      const existingUser =
        await User.findOne({
          email,
        });

      if (existingUser) {

        return res.status(400).json({
          message:
            "User already exists",
        });

      }

      // HASH PASSWORD
      const salt =
        await bcrypt.genSalt(10);

      const hashedPassword =
        await bcrypt.hash(
          password,
          salt
        );

      // CREATE USER
      const user =
        new User({
          name,
          email,
          password:
            hashedPassword,
        });

      await user.save();

      res.status(201).json({
        message:
          "User registered successfully",
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


// LOGIN
router.post(
  "/login",
  async (req, res) => {

    try {

      let {
        email,
        password,
      } = req.body;

      // CLEAN EMAIL
      email =
        email
          .trim()
          .toLowerCase();

      // FIND USER
      const user =
        await User.findOne({
          email,
        });

      if (!user) {

        return res.status(400).json({
          message:
            "Invalid credentials",
        });

      }

      // CHECK PASSWORD
      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {

        return res.status(400).json({
          message:
            "Invalid credentials",
        });

      }

      // CREATE TOKEN
      const token =
        jwt.sign(
          {
            id: user._id,
          },
          "secretkey",
          {
            expiresIn: "7d",
          }
        );

      // RESPONSE
      res.json({
        token,

        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
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

module.exports = router;