const mongoose = require('mongoose');
const moment = require('moment');
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
  const today = moment().format('YYYY-MM-DD');
  return moment(today).isAfter(this.deadline);
});

TasksShema.pre('remove', function(next) {
  Employee.findById(this.employee).exec((error, item) => {
    var index = item.tasks.indexOf(item.tasks.find(e => e._id == this._id));
    item.tasks.splice(index, 1);
    item.save(() => { next(); });
  });
});

TasksShema.pre('save', function(next) {
  Employee.findById(this.employee).exec((error, item) => {
    item.tasks.push(this);
    item.save(() => { next(); });
  });
});

module.exports = mongoose.model('Tasks', TasksShema); 