import Crisis from "../models/crisis.js";
import Volunteer from "../models/volunteer.js";
import VolunteerAssignment from "../models/volunteerAssignment.js";
import { formatValidationErrors } from "../utils/errorFormatter.js";
import { volunteerAssignmentValidation } from "../validations/volunteerAssignmentValidation.js";

export const createAssignment = async (req, res) => {
  try {
    const { error } = volunteerAssignmentValidation(req.body);
    if (error) {
      return res.status(400).json(formatValidationErrors(error));
    }

    const { volunteerId, crisisId, task } = req.body;

    const errors = [];

    // Check if Volunteer exists
    const volunteerExists = await Volunteer.findByPk(volunteerId);
    if (!volunteerExists) {
      errors.push({
        label: "volunteerId",
        error: "volunteer Id Not Found",
      });
    }

    // Check if Crisis exists
    const crisisExists = await Crisis.findByPk(crisisId);
    if (!crisisExists) {
      errors.push({
        label: "crisisId",
        error: "crisis Id Not Found",
      });
    }
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        error: errors,
      });
    }
    // Create new volunteer assignment
    const newAssignment = await VolunteerAssignment.create({
      volunteerId,
      crisisId,
      task,
    });

    return res.status(201).json({
      success: true,
      message: "Volunteer assigned successfully",
      data: newAssignment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create volunteer assignment",
      error: error.message,
    });
  }
};

// Get All Assignments
export const getAllAssignments = async (req, res) => {
  try {
    const assignments = await VolunteerAssignment.findAll();
    return res.status(200).json({
      success: true,
      data: assignments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve assignments",
      error: error.message,
    });
  }
};

// Get Assignment by ID
export const getAssignmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const assignment = await VolunteerAssignment.findByPk(id);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: assignment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve assignment",
      error: error.message,
    });
  }
};

// Update Assignment
export const updateAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const { volunteerId, crisisId, task } = req.body;

    const [updated] = await VolunteerAssignment.update(
      { volunteerId, crisisId, task },
      { where: { id } }
    );

    if (updated) {
      const updatedAssignment = await VolunteerAssignment.findByPk(id);
      return res.status(200).json({
        success: true,
        message: "Assignment updated successfully",
        data: updatedAssignment,
      });
    }

    return res.status(404).json({
      success: false,
      message: "Assignment not found",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update assignment",
      error: error.message,
    });
  }
};

// Delete Assignment
export const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await VolunteerAssignment.destroy({ where: { id } });

    if (deleted) {
      return res.status(200).json({
        success: true,
        message: "Assignment deleted successfully",
      });
    }

    return res.status(404).json({
      success: false,
      message: "Assignment not found",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete assignment",
      error: error.message,
    });
  }
};
