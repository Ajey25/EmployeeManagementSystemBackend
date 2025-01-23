import express from "express";
import {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
} from "../controllers/employeeController.js";
import { validateEmployee } from "../middleware/validation.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getAllEmployees);
router.get("/:id",verifyToken, getEmployeeById);
router.post("/", verifyToken, validateEmployee, addEmployee);
router.put("/:id", verifyToken, validateEmployee, updateEmployee);
router.delete("/:id", verifyToken, deleteEmployee);

export default router;
