import express from "express";
import multer from "multer";
import { login, logout } from "../authentication/auth.controller.js";
import { verifyToken } from "../authentication/auth.middleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Routes d'authentification
router.post("/login", upload.none(), login);
router.post("/logout", logout);

// Route protégée exemple (dashboard)
router.get("/dashboard", verifyToken, (req, res) => {
  res.send(`Bienvenue dans votre espace, ${req.user.firstname}`);
});

export default router;
