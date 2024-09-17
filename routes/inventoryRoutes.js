import { Router } from "express";
import {
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  getAllInventoryItems,
  getInventoryItem,
} from "../controllers/inventoryController.js";

const router = Router();

// Inventory routes
router.post("/", createInventoryItem); // Create an inventory item
router.put("/:id", updateInventoryItem); // Update an inventory item
router.delete("/:id", deleteInventoryItem); // Delete an inventory item
router.get("/", getAllInventoryItems); // Get all inventory items
router.get("/:id", getInventoryItem); // Get single inventory item

export default router;
