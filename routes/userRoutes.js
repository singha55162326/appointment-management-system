const express = require("express");
const {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
} = require("../controllers/userController");
const {
    authMiddleware,
    adminMiddleware,
    secretaryMiddleware,
    directorMiddleware,
    assistdirectorMiddleware,
} = require("../middleware/authMiddleware");
const router = express.Router();

router.get(
    "/",
    authMiddleware,
    adminMiddleware,
    secretaryMiddleware,
    directorMiddleware,
    assistdirectorMiddleware,
    getUsers
);
router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    secretaryMiddleware,
    createUser
);
router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    secretaryMiddleware,
    updateUser
);
router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    secretaryMiddleware,
    deleteUser
);

module.exports = router;
