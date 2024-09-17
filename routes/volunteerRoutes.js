import express from "express";
import {
  registerVolunteer,
  getAllVolunteers,
  getVolunteerById,
  updateVolunteer,
} from "../controllers/volunteerController.js";

const router = express.Router();

router.post("/register", registerVolunteer);
router.get("/", getAllVolunteers);
router.get("/:id", getVolunteerById);
router.put("/:id", updateVolunteer);

export default router;
