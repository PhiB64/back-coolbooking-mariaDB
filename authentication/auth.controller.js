import { authenticate, generateToken } from "./auth.service.js";

export async function login(req, res) {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    const user = await authenticate(email, password);
    if (!user) {
      return res
        .status(401)
        .json({ message: "Utilisateur introuvable ou mot de passe incorrect" });
    }

    const token = generateToken(user.id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    return res.status(200).json({
      id: user.id,
      firstname: user.firstname,
      role: user.role,
      avatar: user.avatar,
    });
  } catch (err) {
    console.error("Erreur dans login:", err.message);
    return res.status(500).json({ message: "Erreur interne" });
  }
}

export async function logout(req, res) {
  res.clearCookie("token", { httpOnly: true });
  return res.status(200).send("Utilisateur déconnecté");
}
