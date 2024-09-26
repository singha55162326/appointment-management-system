const jwt = require("jsonwebtoken");

// Authenticate user
const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token)
        return res
            .status(401)
            .json({ message: "No token, authorization denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

// Admin check
const adminMiddleware = (req, res, next) => {
    if (req.user.role !== "Admin")
        return res.status(403).json({ message: "Admin access only" });
    next();
};
const secretaryMiddleware = (req, res, next) => {
    if (req.user.role !== "Secretary")
        return res.status(403).json({ message: "Secretary access only" });
    next();
};
const directorMiddleware = (req, res, next) => {
    if (req.user.role !== "Director")
        return res.status(403).json({ message: "Director access only" });
    next();
};

const assistdirectorMiddleware = (req, res, next) => {
    if (req.user.role !== "Assistant Director")
        return res
            .status(403)
            .json({ message: "AssistantDirector access only" });
    next();
};

module.exports = {
    authMiddleware,
    adminMiddleware,
    secretaryMiddleware,
    directorMiddleware,
    assistdirectorMiddleware,
};
