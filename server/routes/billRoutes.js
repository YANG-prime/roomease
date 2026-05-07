const express = require("express");

const router = express.Router();

const Bill = require("../models/Bill");

const authMiddleware = require(
  "../middleware/authMiddleware"
);


// GET ALL BILLS
router.get(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      const bills = await Bill.find({
        user: req.user.id,
      });

      res.json(bills);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);


// CREATE BILL
router.post(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      const newBill = new Bill({
        title: req.body.title,

        amount: req.body.amount,

        dueDate: req.body.dueDate,

        user: req.user.id,
      });

      const savedBill =
        await newBill.save();

      res.status(201).json(savedBill);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);


// UPDATE BILL
router.put(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const updatedBill =
        await Bill.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );

      res.json(updatedBill);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);


// DELETE BILL
router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      await Bill.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message: "Bill deleted",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);

module.exports = router;