const express = require("express");
const router = express.Router();

const {
    createGoal
} = require("../controllers/goalController");

router.post("/create", createGoal);

module.exports = router;