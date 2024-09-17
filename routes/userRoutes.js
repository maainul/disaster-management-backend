import { Router } from "express";
import {
  getAllUsers,
  getUserInfo,
  loggedInCtrl,
  loginUserCtrl,
  logoutCtrl,
  registerUser,
} from "../controllers/userController.js";

const router = Router();

router.get("/", getAllUsers);
router.get("/logout", logoutCtrl);
router.get("/loggedin", loggedInCtrl);
router.get("/:id", getUserInfo);

router.post("/register", registerUser);
router.post("/login", loginUserCtrl);

export default router;
