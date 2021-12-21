const { body } = require('express-validator');
const message = require('../constants/validatorMessages');

exports.validate = (method) => {
  switch (method) {
    case 'employeeReport': {
      return [
        body('name', message.NAME_SHORT).isLength({ min: 2 }),
        body('name', message.NAME_CONTAIN_NUM).isAlpha()
      ]
    }
  }
}