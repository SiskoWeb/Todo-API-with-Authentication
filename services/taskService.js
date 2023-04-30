const tasktModel = require('../models/taskModel')
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError')
const Task = require('../models/taskModel')



// @desc    Add Task to todolist
// @route   POST /api/v1/list
// @access  Private/User
exports.addTask = asyncHandler(async (req, res, next) => {

    const { task } = req.body

    newtask = await Task.create({
        user: req.user._id,
        task
    });
    res.status(200).json({ data: newtask })

})



// @desc    get Task to todolist
// @route   GET /api/v1/list
// @access  Private/User
exports.getTask = asyncHandler(async (req, res) => {

    //1) filter task by userid{get only task belong this userID}
    const tasks = await Task.find({ user: req.user._id })


    if (!tasks) {
        return next(
            new ApiError(`There is no task for this user id : ${req.user._id}`, 404)
        );
    }

    res.status(200).json({
        status: 'success',
        result: tasks.length,
        data: tasks,
    });
})



// @desc    mark task is done
// @route   PUT /api/v1/list
// @access  Private/User
exports.updateTask = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const { task } = req.body

    const newTask = await Task.findByIdAndUpdate(
        { _id: id },
        { task },
        { new: true }
    );
    if (!newTask) {
        return next(new ApiError(`no task in this id: ${id}`, 404))
    }
    newTask.save()
    res.status(200).json({ data: newTask })
})




// @desc    mark task is done
// @route   PUT /api/v1/list
// @access  Private/User
exports.updateToDone = asyncHandler(async (req, res, next) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
        return next(
            new ApiError(
                `There is no such a task with this id:${req.params.id}`,
                404
            )
        );
    }

    // update order to paid
    task.status = true;


    const updatedTask = await task.save();

    res.status(200).json({ status: 'success', data: updatedTask });
});


// @desc    delete task from todolist
// @route   DELETE /api/v1/list
// @access  Private/User
exports.deletTask = asyncHandler(async (req, res, next) => {
    const { id } = req.params

    const deletedTask = await tasktModel.findByIdAndDelete({ _id: id })
    if (!deletedTask) {
        next(new ApiError(`no task with this id : ${id}`, 404))
    }
    res.status(200).json({ data: deletedTask })
})