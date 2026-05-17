const express =
require("express");

const router =
express.Router();

const {
  getUsers,
  deleteUser,
  blockUser,
  assignTaskToUser,
} = require(
  "../controllers/adminController"
);

const authMiddleware =
require("../middleware/authMiddleware");

router.get(
  "/users",
  authMiddleware,
  getUsers
);

router.delete(
  "/user/:id",
  authMiddleware,
  deleteUser
);

router.put(
  "/user/:id/block",
  authMiddleware,
  blockUser
);

router.post(
  "/task/assign",
  authMiddleware,
  assignTaskToUser
);

module.exports =
router;
