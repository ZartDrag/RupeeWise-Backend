const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const Expense = require("../models/Expense");
const { body, validationResult } = require("express-validator");

//Get all the expenses of a user; Login Required
router.get("/getallexpenses", fetchuser, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//Add a new expense; Login Required
router.post(
  "/addexpense",
  fetchuser,
  body("title", "Title must not be empty").exists(),
  // password must be at least 6 chars long
  body("amount", "Amount must not be empty").exists(),
  async (req, res) => {
    try {
      const { title, type, amount, category, description, famMember } =
        req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const expense = new Expense({
        title,
        type,
        amount,
        category,
        description,
        famMember,
        user: req.user.id,
      });
      const savedExpense = await expense.save();

      res.json(savedExpense);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
