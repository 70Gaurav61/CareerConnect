import express from "express";
import { login, logout, register, updateProfile, getProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload, multipleUpload } from "../middlewares/multer.js";
 
const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/update-profile").put(isAuthenticated,multipleUpload,updateProfile);
router.route("/profile").get(isAuthenticated, getProfile);

export default router;