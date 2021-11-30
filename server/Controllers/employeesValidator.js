const { body } = require('express-validator')

exports.validate = (method) => {
  switch (method) {
    case 'create': {
      return [
        body('name', 'name is too short').isLength({ min: 2}),
        body('name', 'name must not contain numbers').isAlpha()
      ]
    }
    case 'createTask': {
      return [
        body('name', 'name is too short').isLength({ min: 2})
      ]
    }
  }
}