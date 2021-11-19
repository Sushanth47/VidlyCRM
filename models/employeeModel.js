const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    token: { type: String },
    password: { type: String, required: true },
    isEmployee: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", EmployeeSchema);
exports.Employee = Employee;
