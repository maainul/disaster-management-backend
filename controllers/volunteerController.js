import Volunteer from "../models/volunteer.js";
import { formatValidationErrors } from "../utils/errorFormatter.js";
import { validateVolunteer } from "../validations/volunteerValidation.js";

// Register Volunteer
export const registerVolunteer = async (req, res) => {
  try {
    const { error } = validateVolunteer(req.body);
    if (error) {
      return res.status(400).json(formatValidationErrors(error));
    }

    const { phoneNumber, email, nidNumber } = req.body;
    const errors = [];

    const phoneExists = await Volunteer.findOne({ where: { phoneNumber } });
    if (phoneExists) {
      errors.push({
        label: "phoneNumber",
        error: "Phone Number is already in use",
      });
    }
    const emailExists = await Volunteer.findOne({ where: { email } });
    if (emailExists) {
      errors.push({
        label: "email",
        error: "Email is already in use",
      });
    }
    const nidExists = await Volunteer.findOne({ where: { nidNumber } });
    if (nidExists) {
      errors.push({
        label: "nidNumber",
        error: "NID is already in use",
      });
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        error: errors,
      });
    }

    const newVolunteer = await Volunteer.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Volunteer successfully registered",
      data: newVolunteer,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to register volunteer",
      error: error.message,
    });
  }
};

// Get All Volunteers
export const getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.findAll();
    return res.status(200).json({
      success: true,
      data: volunteers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve volunteers",
      error: error.message,
    });
  }
};

// Get Single Volunteer
export const getVolunteerById = async (req, res) => {
  try {
    const volunteer = await Volunteer.findByPk(req.params.id);
    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: "Volunteer not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: volunteer,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve volunteer",
      error: error.message,
    });
  }
};

// Update Volunteer
export const updateVolunteer = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = validateVolunteer(req.body);
    if (error) {
      return res.status(400).json(formatValidationErrors(error));
    }

    const volunteer = await Volunteer.findByPk(id);
    if (!volunteer) {
      return res
        .status(404)
        .json({ success: false, message: "Volunteer not found" });
    }
    await volunteer.update(req.body);
    return res.status(200).json({
      success: true,
      message: "Volunteer updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update volunteer",
      error: error.message,
    });
  }
};
