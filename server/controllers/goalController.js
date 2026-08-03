const Goal = require("../models/Goal");

const createGoal = async (req, res) => {
    try {

        const { goalName, targetAmount, monthlySaving } = req.body;

        const monthsRequired = Math.ceil(
            targetAmount / monthlySaving
        );

        const goal = await Goal.create({
            goalName,
            targetAmount,
            monthlySaving
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

module.exports = {
    createGoal
};