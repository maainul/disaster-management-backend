import express from 'express';
import {
  createDonation,
  getTotalDonations,
  getDonationStats,
  getAllDonations,
} from "../controllers/donationController.js";

const router = express.Router();

// Route for creating a donation
router.post('/', createDonation);

// Route for get all donation
router.get("/", getAllDonations);

// Route for fetching total donations
router.get('/total', getTotalDonations);

// Route for fetching donation statistics (for the chart)
router.get('/stats', getDonationStats);

export default router;
