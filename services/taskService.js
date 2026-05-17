const Task = require("../models/task");

const createTask = async (title, description) => {
  return await Task.create({ title, description });
};

const getTasks = async () => {
  return await Task.findAll({ order: [["id", "DESC"]] });
};

const getTaskById = async (id) => {
  return await Task.findByPk(id);
};

const updateTask = async (id, title, description) => {
  const task = await Task.findByPk(id);
  if (!task) return null;
  task.title = title;
  task.description = description;
  await task.save();
  return task;
};

const deleteTask = async (id) => {
  const task = await Task.findByPk(id);
  if (!task) return null;
  await task.destroy();
  return { message: "Task deleted" };
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};