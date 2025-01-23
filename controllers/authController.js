import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Employee from "../models/Employee.js";
import { v4 as uuidv4 } from "uuid"; // Import UUID for unique ID generation

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Generate a unique employeeId
    const employeeId = uuidv4();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new employee document
    const newUser = new Employee({
      ...req.body,
      employeeId, // Include the generated employeeId
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with the created user data (excluding the password)
    const { password: _, ...userWithoutPassword } = newUser.toObject(); // Exclude password from response
    res.status(201).json(userWithoutPassword);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Employee.findOne({ email });
    if (!user) return res.status(404).send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const forgotPassword = async (req, res) => {
  // Implement forgot password logic
  res.status(200).send("Forgot password functionality coming soon");
};
