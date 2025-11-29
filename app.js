import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import des routers
import auth_router from "./routes/auth.router.js";
import users_router from "./routes/users.router.js";
import rentals_router from "./routes/rentals.router.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Liste des origines autorisées
const allowedOrigins = [
  "http://localhost:5173",
  "https://coolbookingreact.netlify.app",
];

// Configuration CORS
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Origin not allowed by CORS"));
      }
    },
    credentials: true, // autorise cookies / headers d’auth
  })
);

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/auth", auth_router);
app.use("/users", users_router);
app.use("/rentals", rentals_router);

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error("Erreur attrapée :", err.message);
  res.status(400).json({ message: err.message });
});

// Lancement du serveur
app.listen(port, () => {
  console.log(`Backend MariaDB connecté sur http://localhost:${port}`);
});
