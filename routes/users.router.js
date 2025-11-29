import express from "express";
import multer from "multer";
import userController from "../users/users.controller.js";
import { verifyToken } from "../authentication/auth.middleware.js";
import { login, logout } from "../authentication/auth.controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // stockage temporaire

router.get("/dashboard", verifyToken, (req, res) => {
  res.send(`Bienvenue dans votre espace, ${req.user.firstname}`);
});
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/register", upload.single("avatar"), userController.createUser);
router.post("/login", upload.none(), login);

router.post("/logout", logout);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
