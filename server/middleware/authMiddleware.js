const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "expenseiq_super_secret_jwt_key_2026";

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            console.error("Token verification error:", error.message);
            return res.status(401).json({
                message: "Not authorized, invalid token"
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            message: "Not authorized, no token provided"
        });
    }
};

module.exports = { protect };
