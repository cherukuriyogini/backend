const Task = require("../models/task.model");

let cacheData = null;
let cacheTime = null;


// Create Task
exports.createTask = async (req, res) => {

    const task = await Task.create(req.body);

    // clear cache
    cacheData = null;

    res.json(task);
};


// Get All Tasks with Cache
exports.getTasks = async (req, res) => {

    const now = Date.now();

    // use cache if less than 60 sec old
    if (
        cacheData &&
        now - cacheTime < 60000
    ) {

        return res.json(cacheData);
    }

    const tasks = await Task.find();

    // save cache
    cacheData = tasks;
    cacheTime = now;

    res.json(tasks);
};


// Update Task
exports.updateTask = async (req, res) => {

    const task = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    // clear cache
    cacheData = null;

    res.json(task);
};


// Delete Task
exports.deleteTask = async (req, res) => {

    await Task.findByIdAndDelete(req.params.id);

    // clear cache
    cacheData = null;

    res.json({
        message: "Deleted"
    });
};