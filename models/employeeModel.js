const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    password: { type: String, required: true },
    isEmployee: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", EmployeeSchema);
exports.Employee = Employee;
