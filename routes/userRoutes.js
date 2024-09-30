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

  adminMiddleware,
  secretaryMiddleware,
  directorMiddleware,
  assistdirectorMiddleware,
  getUsers
);
router.post(
  "/",

  adminMiddleware,
  secretaryMiddleware,
  createUser
);
router.put(
  "/:id",

  adminMiddleware,
  secretaryMiddleware,
  updateUser
);
router.delete(
  "/:id",

  adminMiddleware,
  secretaryMiddleware,
  deleteUser
);

module.exports = router;
