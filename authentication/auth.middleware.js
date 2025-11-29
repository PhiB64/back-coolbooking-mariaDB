import { getUserContextById, verifyJwt } from "./auth.service.js";

export async function verifyToken(req, res, next) {
  const token = req.cookies?.token;
  if (!token) return res.status(401).send("Accès interdit, token manquant.");

  try {
    const decoded = verifyJwt(token);
    const user = await getUserContextById(decoded.id);
    if (!user)
      return res.status(401).send("Utilisateur non trouvé ou supprimé.");
    req.user = user;
    return next();
  } catch (err) {
    console.error("Erreur lors de la vérification du token:", err.message);
    return res.status(403).send("Token invalide ou expiré.");
  }
}
