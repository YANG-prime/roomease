const express = require("express");

const router = express.Router();

const PotMoney = require(
  "../models/PotMoney"
);

const authMiddleware = require(
  "../middleware/authMiddleware"
);


// GET ALL CONTRIBUTIONS
router.get(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      const contributions =
        await PotMoney.find({
          user: req.user.id,
        });

      res.json(contributions);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);


// ADD CONTRIBUTION
router.post(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      const newContribution =
        new PotMoney({
          amount: req.body.amount,

          note: req.body.note,

          user: req.user.id,
        });

      const savedContribution =
        await newContribution.save();

      res.status(201).json(
        savedContribution
      );

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);


// DELETE CONTRIBUTION
router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      await PotMoney.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Contribution deleted",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);

module.exports = router;