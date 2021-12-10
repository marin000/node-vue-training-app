const { body } = require('express-validator')

exports.validate = (method) => {
  switch (method) {
    case 'logValidate': {
      return [
        body('count', 'count must be number').isNumeric(),
        body('sort', 'only asc or desc').isIn(['asc', 'desc']),
        body('level', 'level is not valid')
          .isIn(['fatal', 'error', 'warn', 'info', 'debug', 'trace']),
        body('message', 'message must not contain numbers').isAlpha()
      ]
    }
  }
}