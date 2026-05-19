const Task =
require("../models/task");

const User =
require("../models/user");

const getTasks =
async (req, res) => {

  try {

    const tasks =
      await Task.findAll({

        where: {
          UserId:
            req.user.id,
        },

        include: [
          {
            model: User,
            attributes: [
              "id",
              "username",
              "email",
            ],
          },
        ],
      });

    res.json(tasks);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Server error",
    });
  }
};

const createTask =
async (req, res) => {

  try {

    const task =
      await Task.create({

        title:
          req.body.title,

        description:
          req.body.description,

        status:
          req.body.status || "todo",

        completed:
          false,

        assignedTo:
          req.user.id,

        assignedBy:
          req.user.id,

        assignedByAdmin:
          false,

        UserId:
          req.user.id,
      });

    const newTask =
      await Task.findByPk(
        task.id,
        {
          include: User,
        }
      );

    res.json(newTask);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Server error",
    });
  }
};

const updateTask =
async (req, res) => {

  try {

    const task =
      await Task.findOne({

        where: {
          id:
            req.params.id,

          UserId:
            req.user.id,
        },
      });

    if (!task) {

      return res.status(404)
      .json({
        message:
          "Task not found",
      });
    }

    const updates = {};

    if (req.body.title !== undefined) {
      updates.title =
        req.body.title;
    }

    if (req.body.description !== undefined) {
      updates.description =
        req.body.description;
    }

    if (req.body.status !== undefined) {
      updates.status =
        req.body.status;
    }

    if (req.body.completed !== undefined) {
      updates.completed =
        req.body.completed;
    }

    await task.update(updates);

    const updatedTask =
      await Task.findByPk(
        task.id,
        {
          include: User,
        }
      );

    res.json(
      updatedTask
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Server error",
    });
  }
};

const deleteTask =
async (req, res) => {

  try {

    const task =
      await Task.findOne({

        where: {
          id:
            req.params.id,

          UserId:
            req.user.id,
        },
      });

    if (!task) {

      return res.status(404)
      .json({
        message:
          "Task not found",
      });
    }

    await task.destroy();

    res.json({
      message:
        "Task deleted",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Server error",
    });
  }
};

const adminGetAllTasks =
async (req, res) => {

  try {

    const tasks =
      await Task.findAll({

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
      });

    res.json(tasks);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Server error",
    });
  }
};

module.exports = {

  getTasks,

  createTask,

  updateTask,

  deleteTask,

  adminGetAllTasks,
};
