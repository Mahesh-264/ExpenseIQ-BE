const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
    createGoal,
    getGoals
} = require("../controllers/goalController");

router.use(protect);

router.post("/create", createGoal);
router.get("/all", getGoals);

module.exports = router;