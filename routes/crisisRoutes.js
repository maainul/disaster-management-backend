import express from "express";
import {
  createCrisis,
  updateCrisis,
  getAllCrises,
  getCrisisById,
} from "../controllers/crisisController.js";

const router = express.Router();

router.post("/create", createCrisis); 
router.put("/:id", updateCrisis); 
router.get("/list", getAllCrises);
router.get("/:id", getCrisisById);

export default router;
