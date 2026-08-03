const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
{
    goalName: {
        type: String,
        required: true
    },

    targetAmount: {
        type: Number,
        required: true
    },

    monthlySaving: {
        type: Number,
        required: true
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Goal", goalSchema);