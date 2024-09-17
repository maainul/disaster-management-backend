import Crisis from "../models/crisis.js";
import { validateCrisis } from "../validations/validateCrisis.js";
import { formatValidationErrors } from "../utils/errorFormatter.js";

// Create a new Crisis
export const createCrisis = async (req, res) => {
  try {
    const { error } = validateCrisis(req.body);
    if (error) {
      return res.status(400).json(formatValidationErrors(error));
    }

    const { title, location, severity, description, status } = req.body;
    const newCrisis = await Crisis.create({
      title,
      location,
      severity,
      description,
      status,
    });

    return res.status(201).json({
      success: true,
      message: "Crisis created successfully",
      data: newCrisis,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create crisis",
      error: error.message,
    });
  }
};

// Update a Crisis
export const updateCrisis = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = validateCrisis(req.body);
    if (error) {
      return res.status(400).json(formatValidationErrors(error));
    }

    const crisis = await Crisis.findByPk(id);
    if (!crisis) {
      return res
        .status(404)
        .json({ success: false, message: "Crisis not found" });
    }

    await crisis.update(req.body);
    return res.status(200).json({
      success: true,
      message: "Crisis updated successfully",
      data: crisis,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update crisis",
      error: error.message,
    });
  }
};

// Get All Crises
export const getAllCrises = async (req, res) => {
  try {
    const crises = await Crisis.findAll();
    return res.status(200).json({
      success: true,
      data: crises,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve crises",
      error: error.message,
    });
  }
};

// Get a Single Crisis
export const getCrisisById = async (req, res) => {
  try {
    const { id } = req.params;
    const crisis = await Crisis.findByPk(id);
    if (!crisis) {
      return res
        .status(404)
        .json({ success: false, message: "Crisis not found" });
    }

    return res.status(200).json({
      success: true,
      data: crisis,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve crisis",
      error: error.message,
    });
  }
};
