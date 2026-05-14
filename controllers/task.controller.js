const Task = require("../models/task.model");

let cacheData = null;
let cacheTime = null;


// Create Task
exports.createTask = async (req, res) => {

    try {

        const task = await Task.create(req.body);

        cacheData = null;

        res.json(task);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};


// Get Tasks
exports.getTasks = async (req, res) => {

    try {

        const now = Date.now();

        if (
            cacheData &&
            now - cacheTime < 60000
        ) {

            return res.json(cacheData);
        }

        const tasks = await Task.find();

        cacheData = tasks;
        cacheTime = now;

        res.json(tasks);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};


// Update Task
exports.updateTask = async (req, res) => {

    try {

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        cacheData = null;

        res.json(task);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};


// Delete Task
exports.deleteTask = async (req, res) => {

    try {

        await Task.findByIdAndDelete(req.params.id);

        cacheData = null;

        res.json({
            message: "Deleted"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};