const Employee = require('../Models/Employees');

async function employeeReport(req, res) {
  try {
    const employee = await Employee.findOne({ name: req.body.name });
    const currentDate = new Date();
    const yearAgo = new Date(new Date().setFullYear(new Date().getFullYear()-1));
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = { employeeReport };