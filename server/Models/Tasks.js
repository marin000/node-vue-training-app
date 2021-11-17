const mongoose = require('mongoose');

var TasksShema = new mongoose.Schema({
  name: {
    type: String,
    required: "Task must have a name!"
  },
  deadline: Date,
  finished: Boolean,
  employee: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employees"
    }
});

module.exports = mongoose.model('Tasks', TasksShema); 