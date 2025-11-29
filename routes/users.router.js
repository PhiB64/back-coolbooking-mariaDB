import express from "express";
import multer from "multer";
import userController from "../users/users.controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Routes utilisateurs CRUD
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/register", upload.single("avatar"), userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
