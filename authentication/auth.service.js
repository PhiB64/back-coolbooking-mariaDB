import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { query } from "../config/db.js";

export async function findUserByEmail(email) {
  const [rows] = await query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0] || null;
}

export async function getUserContextById(id) {
  const [rows] = await query(
    "SELECT id, firstname, role, avatar FROM users WHERE id = ?",
    [id]
  );
  return rows[0] || null;
}

export async function authenticate(email, password) {
  const user = await findUserByEmail(email);
  if (!user) return null;

  const isValid = await argon2.verify(user.password, password);
  if (!isValid) return null;

  return user;
}

export function generateToken(userId, expiresIn = "1d") {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn });
}

export function verifyJwt(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
