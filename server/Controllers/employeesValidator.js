const { body } = require('express-validator')

exports.validate = (method) => {
  switch (method) {
    case 'create': {
      return [
        body('name', "name doesn't exists").exists()
      ]
    }
  }
}