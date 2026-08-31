const Expense = require("../models/Expense");

// ADD EXPENSE
const addExpense = async (req, res) => {
    try {
        const { title, amount, category, date } = req.body;

        if (!title || !amount || !category) {
            return res.status(400).json({
                message: "Please provide title, amount, and category"
            });
        }

        const expense = await Expense.create({
            userId: req.user.id,
            title: title.trim(),
            amount: Number(amount),
            category,
            date: date ? new Date(date) : new Date()
        });

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

// GET ALL EXPENSES FOR CURRENT USER
const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1, createdAt: -1 });

        res.status(200).json(expenses);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// DELETE EXPENSE (Only if owned by current user)
const deleteExpense = async (req, res) => {
    try {
        const deleted = await Expense.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!deleted) {
            return res.status(404).json({
                message: "Expense not found or unauthorized"
            });
        }

        res.status(200).json({
            message: "Expense Deleted",
            id: req.params.id
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// GET SUMMARY
const getSummary = async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id });

        const totalExpenses = expenses.reduce(
            (sum, expense) => sum + Number(expense.amount || 0),
            0
        );

        const categoryTotals = {};

        expenses.forEach(expense => {
            if (!categoryTotals[expense.category]) {
                categoryTotals[expense.category] = 0;
            }
            categoryTotals[expense.category] += Number(expense.amount || 0);
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
            topCategory,
            categoryTotals
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// GET MONEY LEAK
const getMoneyLeak = async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id });

        if (!expenses.length) {
            return res.status(200).json({
                highestCategory: "None",
                amount: 0,
                message: "No expenses recorded yet"
            });
        }

        const categoryTotals = {};

        expenses.forEach(expense => {
            if (!categoryTotals[expense.category]) {
                categoryTotals[expense.category] = 0;
            }
            categoryTotals[expense.category] += Number(expense.amount || 0);
        });

        let highestCategory = "None";
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
            message: `${highestCategory} is your biggest money leak (₹${highestAmount})`
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// GET PERSONALITY
const getPersonality = async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id });

        if (!expenses.length) {
            return res.status(200).json({
                personality: "Smart Saver",
                badge: "🌱",
                reason: "No expenses tracked yet. Keep saving!"
            });
        }

        const categoryTotals = {};

        expenses.forEach(expense => {
            if (!categoryTotals[expense.category]) {
                categoryTotals[expense.category] = 0;
            }
            categoryTotals[expense.category] += Number(expense.amount || 0);
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
        let badge = "⚖️";

        switch (highestCategory.toLowerCase()) {
            case "food":
                personality = "Foodie";
                badge = "🍔";
                break;
            case "transport":
                personality = "Commuter";
                badge = "🚗";
                break;
            case "shopping":
                personality = "Shopaholic";
                badge = "🛍️";
                break;
            case "bills":
                personality = "Responsible Adult";
                badge = "💡";
                break;
            case "entertainment":
                personality = "Fun Lover";
                badge = "🎬";
                break;
            case "health":
                personality = "Health Conscious";
                badge = "🏥";
                break;
            case "education":
                personality = "Learner";
                badge = "📚";
                break;
            default:
                personality = "Balanced Spender";
                badge = "⚖️";
        }

        res.status(200).json({
            personality,
            badge,
            highestCategory,
            amount: highestAmount,
            reason: `Most spending is on ${highestCategory} (₹${highestAmount})`
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// GET PREDICTION
const getPrediction = async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id });

        const totalSpent = expenses.reduce(
            (sum, expense) => sum + Number(expense.amount || 0),
            0
        );

        const nextMonthPrediction = totalSpent;
        const threeMonthPrediction = totalSpent * 3;

        res.status(200).json({
            monthlySpendRate: totalSpent,
            nextMonthPrediction,
            threeMonthPrediction,
            message: expenses.length
                ? `At your current spending rate, you may spend ₹${threeMonthPrediction.toLocaleString()} in the next 3 months`
                : "Add expenses to generate 3-month predictive financial forecasts"
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