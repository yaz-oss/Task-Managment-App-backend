const User = require("../models/user");
const Task = require("../models/task");

exports.getUsers = async (req, res) => {

  try {

    const users = await User.findAll({
      include: [Task],
    });

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.deleteUser = async (req, res) => {

  try {

    const user =
    await User.findByPk(
      req.params.id
    );

    if (!user) {

      return res.status(404)
      .json({
        message: "User not found",
      });
    }

    await Task.destroy({
      where: {
        UserId: user.id,
      },
    });

    await user.destroy();

    res.json({
      message:
      "User deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.blockUser = async (req, res) => {

  try {

    const user =
    await User.findByPk(
      req.params.id
    );

    if (!user) {

      return res.status(404)
      .json({
        message: "User not found",
      });
    }

    user.blocked =
    !user.blocked;

    await user.save();

    res.json({
      message:
      user.blocked
      ? "User blocked"
      : "User unblocked",
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.assignTaskToUser = async (req, res) => {

  try {

    if (req.user.role !== "admin") {

      return res.status(403)
      .json({
        message: "Admin access only",
      });
    }

    const {
      userId,
      title,
      description,
    } = req.body;

    if (
      !userId ||
      !title ||
      !description
    ) {

      return res.status(400)
      .json({
        message:
        "User, title, and description are required",
      });
    }

    const user =
    await User.findByPk(userId);

    if (!user) {

      return res.status(404)
      .json({
        message: "User not found",
      });
    }

    if (user.role === "admin") {

      return res.status(400)
      .json({
        message:
        "Tasks can only be assigned to users",
      });
    }

    const task =
    await Task.create({
      title,
      description,
      completed: false,
      assignedTo: user.id,
      assignedBy: req.user.id,
      assignedByAdmin: true,
      UserId: user.id,
    });

    const assignedTask =
    await Task.findByPk(
      task.id,
      {
        include: [
          {
            model: User,
            attributes: [
              "id",
              "username",
              "email",
              "role",
            ],
          },
        ],
      }
    );

    res.status(201).json(
      assignedTask
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};
