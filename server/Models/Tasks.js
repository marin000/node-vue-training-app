const mongoose = require('mongoose');

const TasksShema = new mongoose.Schema({
  name: {
    type: String,
    required: "Task must have a name!"
  },
  deadline: String,
  completed: Boolean,
  employee: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employees"
    }
}, { timestamps: true }
);

module.exports = mongoose.model('Tasks', TasksShema); 