const express = require('express')
const { createTaskValidator, updateTaskvalidator, deletTaskvalidator } = require('../utils/validators/taskValidator')

const { addTask, getTask, updateTask, deletTask, updateToDone } = require('../services/taskService')

const authService = require('../services/authService');

const router = express.Router();

// @desc check if user logged or not and get data of user such as userID .. from token
router.use(authService.protect)

router.route('/')
    .post(
        createTaskValidator,
        addTask)

    .get(getTask)


router.route('/:id')

    .put(
        updateTaskvalidator,
        updateTask)


    .delete(
        deletTaskvalidator,
        deletTask)

router.put(
    '/:id/done',
    updateToDone

);
module.exports = router