import InventoryItem from "../models/inventoryItem.js";
import { validateInventoryItem } from "../validations/inventoryItemValidation.js";
import { formatValidationErrors } from "../utils/errorFormatter.js";

// Create Inventory Item
export const createInventoryItem = async (req, res) => {
  try {
    const { error } = validateInventoryItem(req.body);
    if (error) {
      return res.status(400).json(formatValidationErrors(error));
    }

    const { name, type, quantity, unit, addedBy } = req.body;

    const newItem = await InventoryItem.create({
      name,
      type,
      quantity,
      unit,
      addedBy,
    });

    return res.status(201).json({
      success: true,
      message: "Inventory item created successfully",
      data: newItem,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create inventory item",
      error: error.message,
    });
  }
};

// Update Inventory Item
export const updateInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = validateInventoryItem(req.body);
    if (error) {
      return res.status(400).json(formatValidationErrors(error));
    }

    const updatedItem = await InventoryItem.update(req.body, { where: { id } });

    if (updatedItem[0] === 0) {
      return res.status(404).json({
        success: false,
        message: "Inventory item not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Inventory item updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update inventory item",
      error: error.message,
    });
  }
};

// Delete Inventory Item
export const deleteInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await InventoryItem.destroy({ where: { id } });

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: "Inventory item not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Inventory item deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete inventory item",
      error: error.message,
    });
  }
};

// Get All Inventory Items
export const getAllInventoryItems = async (req, res) => {
  try {
    const items = await InventoryItem.findAll();
    return res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch inventory items",
      error: error.message,
    });
  }
};

// Get Single Inventory Item
export const getInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await InventoryItem.findOne({ where: { id } });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Inventory item not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch inventory item",
      error: error.message,
    });
  }
};
