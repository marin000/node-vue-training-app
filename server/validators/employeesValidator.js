const { body, check } = require('express-validator')

exports.validate = (method) => {
  switch (method) {
    case 'create': {
      return [
        body('name', 'name is too short').isLength({ min: 2 }),
        body('name', 'name is too long').isLength({ max: 20 }),
        body('name', 'name must not contain numbers').isAlpha()
      ]
    }
    case 'createTask': {
      return [
        body('name', 'name is too short').isLength({ min: 2 }),
        body('name', 'name is too long').isLength({ max: 15 }),
        body('deadline', 'the date cannot be in the past')
          .isAfter(new Date()
          .toDateString()),
        check('id', 'Employee Id is not selected or valid.')
          .trim()
          .exists()
          .isMongoId()
      ]
    }
    case 'validateEmployee': {
      return [
        check('id', 'Employee Id is not valid.').isMongoId()
      ]
    }
    case 'validateMongoIdAndEmployee': {
      return [
        check('id', 'Employee Id is not valid.').isMongoId(),
        check('taskId', 'Task Id is not valid.').isMongoId()
      ]
    }
  }
}