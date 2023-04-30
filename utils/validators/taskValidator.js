const { check  } = require('express-validator');
const validatorMiddleware = require('../../middleware/validatorMiddlewar')

exports.createTaskValidator = [
    check('task').notEmpty().withMessage('name task required')
    .isLength({min:2}).withMessage('task name should be longer')
    .isLength({max:32}).withMessage('task name should be shorter'),validatorMiddleware
]
exports.updateTaskvalidator = [
    check('id').isMongoId()
    .withMessage('invalid task id format')
    ,validatorMiddleware

]

exports.deletTaskvalidator = [
    check('id').isMongoId()
    .withMessage('invalid task id format')
    ,validatorMiddleware

]

