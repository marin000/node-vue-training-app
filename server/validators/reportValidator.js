const { body } = require('express-validator');
const message = require('../constants/validatorMessages');

exports.validate = (method) => {
  switch (method) {
    case 'employeeReport': {
      return [
        body('id', message.EMPLOYEE_ID).isMongoId()
      ]
    }
    case 'tasksReport': {
      return [
        body('id', message.EMPLOYEE_ID).isMongoId(),
        body('date', message.DATE_VALID).isISO8601()
      ]
    }
  }
}