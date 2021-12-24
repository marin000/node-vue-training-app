const mongoose = require('mongoose');
const moment = require('moment');
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

TasksShema.virtual('isExpired').get(function() {
  const today = moment().format('YYYY-MM-DD');
  return moment(today).isAfter(this.deadline);
});

module.exports = mongoose.model('Tasks', TasksShema); 