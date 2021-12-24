const { body, check } = require('express-validator');
const message = require('../constants/validatorMessages');

exports.validate = (method) => {
  switch (method) {
    case 'create': {
      return [
        body('name', message.NAME_SHORT).isLength({ min: 2 }),
        body('name', message.NAME_LONG).isLength({ max: 40 }),
        body('name', message.NAME_CONTAIN_NUM).isAlpha('en-US', {ignore: ' '})
      ]
    }
    case 'createTask': {
      return [
        body('name', message.NAME_SHORT).isLength({ min: 2 }),
        body('name', message.NAME_LONG).isLength({ max: 15 }),
        body('deadline', message.DATE_PAST)
          .isAfter(new Date()
          .toDateString()),
        check('id', message.EMPLOYEE_ID)
          .trim()
          .exists()
          .isMongoId()
      ]
    }
    case 'validateEmployee': {
      return [
        check('id', message.EMPLOYEE_ID).isMongoId()
      ]
    }
    case 'validateMongoIdAndEmployee': {
      return [
        check('id', message.EMPLOYEE_ID).isMongoId(),
        check('taskId', message.TASK_ID).isMongoId()
      ]
    }
  }
}