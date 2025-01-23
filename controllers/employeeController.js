import Employee from "../models/Employee.js";
import crypto from "crypto";

const generateEmployeeId = () => {
  return crypto.randomBytes(5).toString("hex").toUpperCase();
};

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addEmployee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNo,
      position,
      salary,
      department,
    } = req.body;
    const employee = new Employee({
      firstName,
      lastName,
      email,
      phoneNo,
      position,
      salary,
      department,
      employeeId: generateEmployeeId(),
    });
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findOne({ employeeId: id });
    if (!employee) {  // If employee doesn't exist, return an error response
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params; // Extract employee id from the URL parameters
    const updatedData = req.body; // Get the updated data from the request body

    // Find employee by custom employeeId and update with new data, returning the updated employee
    const updatedEmployee = await Employee.findOneAndUpdate(
      { employeeId: id }, // Query by employeeId, not _id
      updatedData,
      {
        new: true, // Return the updated document
        runValidators: true, // Ensure the updated data passes schema validation
      }
    );

    // If employee doesn't exist, return an error response
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(updatedEmployee); // Send back the updated employee details
  } catch (err) {
    res.status(400).json({ message: err.message }); // Send error message in case of failure
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await Employee.findOneAndDelete({ employeeId: id });
    res.status(200).send("Employee deleted");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
