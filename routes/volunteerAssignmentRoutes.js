import express from "express";
import {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
} from "../controllers/volunteerAssignmentController.js";

const router = express.Router();

// Create a new volunteer assignment
router.post("/", createAssignment);

// Get all volunteer assignments
router.get("/", getAllAssignments);

// Get a specific volunteer assignment by ID
router.get("/:id", getAssignmentById);

// Update a volunteer assignment by ID
router.put("/:id", updateAssignment);

// Delete a volunteer assignment by ID
router.delete("/:id", deleteAssignment);

export default router;
