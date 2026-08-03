
const Expense = require("../models/Expense");

const addExpense = async (req, res) => {
    try {

        const expense = await Expense.create(req.body);

        res.status(201).json({
            message: "Expense Added",
            expense
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const getExpenses = async (req, res) => {
    try {

        const expenses = await Expense.find();

        res.status(200).json(expenses);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
const deleteExpense = async (req, res) => {
    try {

        await Expense.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Expense Deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
const getSummary = async (req, res) => {
    try {

        const expenses = await Expense.find();

        const totalExpenses = expenses.reduce(
            (sum, expense) => sum + expense.amount,
            0
        );

        const categoryTotals = {};

        expenses.forEach(expense => {

            if (!categoryTotals[expense.category]) {
                categoryTotals[expense.category] = 0;
            }

            categoryTotals[expense.category] += expense.amount;
        });

        let topCategory = "None";
        let highestAmount = 0;

        for (let category in categoryTotals) {

            if (categoryTotals[category] > highestAmount) {

                highestAmount = categoryTotals[category];
                topCategory = category;
            }
        }

        res.status(200).json({
            totalExpenses,
            totalTransactions: expenses.length,
            topCategory
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const getMoneyLeak = async (req, res) => {
    try {

        const expenses = await Expense.find();

        const categoryTotals = {};

        expenses.forEach(expense => {

            if (!categoryTotals[expense.category]) {
                categoryTotals[expense.category] = 0;
            }

            categoryTotals[expense.category] += expense.amount;
        });

        let highestCategory = "";
        let highestAmount = 0;

        for (let category in categoryTotals) {

            if (categoryTotals[category] > highestAmount) {

                highestAmount = categoryTotals[category];
                highestCategory = category;
            }
        }

        res.status(200).json({
            highestCategory,
            amount: highestAmount,
            message: `${highestCategory} is your biggest money leak`
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
const getPersonality = async (req, res) => {
    try {

        const expenses = await Expense.find();

        const categoryTotals = {};

        expenses.forEach(expense => {

            if (!categoryTotals[expense.category]) {
                categoryTotals[expense.category] = 0;
            }

            categoryTotals[expense.category] += expense.amount;
        });

        let highestCategory = "";
        let highestAmount = 0;

        for (let category in categoryTotals) {

            if (categoryTotals[category] > highestAmount) {

                highestAmount = categoryTotals[category];
                highestCategory = category;
            }
        }

        let personality = "Balanced Spender";

        switch (highestCategory.toLowerCase()) {

            case "food":
                personality = "Foodie";
                break;

            case "travel":
                personality = "Traveler";
                break;

            case "shopping":
                personality = "Shopaholic";
                break;

            case "education":
                personality = "Learner";
                break;

            case "entertainment":
                personality = "Fun Lover";
                break;
        }

        res.status(200).json({
            personality,
            reason: `Most spending is on ${highestCategory}`
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
const getPrediction = async (req, res) => {
    try {

        const expenses = await Expense.find();

        const totalSpent = expenses.reduce(
            (sum, expense) => sum + expense.amount,
            0
        );

        const nextMonthPrediction = totalSpent;

        const threeMonthPrediction = totalSpent * 3;

        res.status(200).json({
            monthlySpendRate: totalSpent,
            nextMonthPrediction,
            threeMonthPrediction,
            message: `At your current spending rate, you may spend ₹${threeMonthPrediction} in the next 3 months`
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    addExpense,
    getExpenses,
    deleteExpense,
    getSummary,
    getMoneyLeak,
    getPersonality,
    getPrediction
};