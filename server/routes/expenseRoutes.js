const express = require("express");
const router = express.Router();

const {
    addExpense,
    getExpenses,
    deleteExpense,
    getSummary,
    getMoneyLeak,
    getPersonality,
    getPrediction
} = require("../controllers/expenseController");

router.post("/add", addExpense);
router.get("/all", getExpenses);
router.delete("/delete/:id", deleteExpense);
router.get("/summary", getSummary);
router.get("/moneyleak", getMoneyLeak);
router.get("/personality", getPersonality);
router.get("/prediction", getPrediction);
module.exports = router;