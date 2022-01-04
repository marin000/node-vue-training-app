const mongoose = require('mongoose');
const cloudinary = require("cloudinary").v2;
const { getImgOptions } = require('../constants/cloudinary');

const EmployeesShema = new mongoose.Schema({
  name: {
    type: String,
    required: "Employee must have a name!"
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/, 
    'Please fill a valid email address']
  },
  phone: String,
  age: Number,
  pet: String,
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tasks' }],
  image: {
    type: String,
    get: transformImg
  }
}, {timestamps: true, toJSON: { getters: true }}
);

function transformImg(image) {
  if(image) {
    return cloudinary.image(image, getImgOptions);
  }
}

module.exports = mongoose.model('Employees', EmployeesShema); 