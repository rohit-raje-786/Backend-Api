const Tasks = require("../models/tasks");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTask = asyncWrapper(async (req, res) => {
  let tasks = await Tasks.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Tasks.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Tasks.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id:${taskID}`, 404));
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Tasks.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`No task with id:${taskID}`, 404));
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Tasks.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id:${taskID}`, 404));
  }
  res.status(200).json({ task });
});

module.exports = { getAllTask, createTask, getTask, updateTask, deleteTask };
