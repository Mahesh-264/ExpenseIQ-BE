const Goal = require("../models/Goal");

const createGoal = async (req, res) => {
    try {
        const { goalName, targetAmount, monthlySaving } = req.body;

        if (!goalName || !targetAmount || !monthlySaving) {
            return res.status(400).json({
                message: "Please fill all goal fields"
            });
        }

        const monthsRequired = Math.ceil(
            targetAmount / monthlySaving
        );

        const goal = await Goal.create({
            userId: req.user.id,
            goalName,
            targetAmount: Number(targetAmount),
            monthlySaving: Number(monthlySaving)
        });

        res.status(201).json({
            goal,
            monthsRequired
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getGoals = async (req, res) => {
    try {
        const goals = await Goal.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(goals);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createGoal,
    getGoals
};