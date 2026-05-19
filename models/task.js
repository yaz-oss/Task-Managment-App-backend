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

Task.TITLE_MAX_LENGTH = 20;
Task.DESCRIPTION_MAX_LENGTH = 150;

Task.validateText = ({ title, description }, { partial = false } = {}) => {
  const cleanedTitle =
    typeof title === "string" ? title.trim() : title;
  const cleanedDescription =
    typeof description === "string" ? description.trim() : description;

  if (!partial && (!cleanedTitle || !cleanedDescription)) {
    return {
      valid: false,
      message:
        "Title and description are required",
    };
  }

  if (cleanedTitle !== undefined) {
    if (!cleanedTitle) {
      return {
        valid: false,
        message:
          "Title is required",
      };
    }

    if (cleanedTitle.length > Task.TITLE_MAX_LENGTH) {
      return {
        valid: false,
        message:
          `Task name must be ${Task.TITLE_MAX_LENGTH} characters or less`,
      };
    }
  }

  if (cleanedDescription !== undefined) {
    if (!cleanedDescription) {
      return {
        valid: false,
        message:
          "Description is required",
      };
    }

    if (cleanedDescription.length > Task.DESCRIPTION_MAX_LENGTH) {
      return {
        valid: false,
        message:
          `Task description must be ${Task.DESCRIPTION_MAX_LENGTH} characters or less`,
      };
    }
  }

  return {
    valid: true,
    title:
      cleanedTitle,
    description:
      cleanedDescription,
  };
};

module.exports = Task;
