const mongoose = require('mongoose');
const dayjs = require('dayjs');
const Employee = require('./Employees');

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
  const today = dayjs().format('YYYY-MM-DD');
  return dayjs(today).isAfter(this.deadline);
});

TasksShema.pre('save', function(next) {
  Employee.findById(this.employee).exec((error, item) => {
    item.tasks.push(this);
    item.save(() => { next(); });
  });
});

module.exports = mongoose.model('Tasks', TasksShema); 