import Crisis from "../models/crisis.js";
import Donation from "../models/donation.js";
import { formatValidationErrors } from "../utils/errorFormatter.js";
import { validateDonation } from "../validations/validateDonation.js";

// Create a Donation
export const createDonation = async (req, res) => {
  try {
    const { error } = validateDonation(req.body);
    if (error) {
      return res.status(400).json(formatValidationErrors(error));
    }
    const { donorName, email, phone, amount, crisisId } = req.body;

    // check if crisis exists
    if (crisisId) {
      const crisisExists = await Crisis.findByPk(crisisId);
      if (!crisisExists) {
        return res.status(400).json({
          success: false,
          error: [{ label: "crisisId", error: "Crisis not found" }],
        });
      }
    }

    const newDonation = await Donation.create({
      donorName,
      email,
      phone,
      amount,
      crisisId,
    });
    return res.status(200).json({
      success: true,
      message: "Donation successfully made",
      data: newDonation,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to process the donation",
      error: error.message,
    });
  }
};

// Get Total Donations
export const getTotalDonations = async (req, res) => {
  try {
    const totalAmount = await Donation.sum("amount");
    return res.status(200).json({
      success: true,
      totalDonations: totalAmount,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve total donations",
      error: error.message,
    });
  }
};

// Get Donations with Chart Data
export const getDonationStats = async (req, res) => {
  try {
    const donations = await Donation.findAll();
    // Process chart data here (group by date, etc.)
    return res.status(200).json({
      success: true,
      data: donations,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve donation stats",
      error: error.message,
    });
  }
};
