const { DataTypes } =
require("sequelize");

const sequelize =
require("../config/db");

const Task =
sequelize.define("Task", {

  title: {
    type:
      DataTypes.STRING,
  },

  description: {
    type:
      DataTypes.TEXT,
  },

  status: {
    type:
      DataTypes.STRING,

    defaultValue:
      "todo",
  },

  completed: {
    type:
      DataTypes.BOOLEAN,

    defaultValue:
      false,
  },

  assignedTo: {
    type:
      DataTypes.INTEGER,

    allowNull: true,
  },

  assignedBy: {
    type:
      DataTypes.INTEGER,

    allowNull: true,
  },

  assignedByAdmin: {
    type:
      DataTypes.BOOLEAN,

    defaultValue:
      false,
  },
});

module.exports = Task;
