import { query } from "../config/db.js";

const validRoles = ["owner", "tenant"];

class UserRepository {
  async getAllUsers() {
    const [rows] = await query(
      "SELECT id, avatar, role, lastname, firstname, phone, email FROM users"
    );
    return rows;
  }

  async getUserById(id) {
    const [rows] = await query(
      "SELECT id, avatar, role, lastname, firstname, phone, email FROM users WHERE id = ?",
      [id]
    );
    return rows[0];
  }

  async createUser({
    avatar,
    role,
    lastname,
    firstname,
    phone,
    email,
    password,
  }) {
    const [existing] = await query("SELECT id FROM users WHERE email = ?", [
      email,
    ]);
    if (existing.length) throw new Error("Email déjà utilisé");

    const [result] = await query(
      "INSERT INTO users (avatar, role, lastname, firstname, phone, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [avatar, role, lastname, firstname, phone, email, password]
    );

    return {
      id: Number(result.insertId),
      avatar,
      role,
      lastname,
      firstname,
      phone,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }

  async updateUser(id, update) {
    const { email, role } = update;

    if (email) {
      const [existingUser] = await query(
        "SELECT id FROM users WHERE email = ?",
        [email]
      );
      const isSameUser =
        existingUser.length && existingUser[0].id === parseInt(id);
      if (existingUser.length && !isSameUser)
        throw new Error("Email déjà utilisé");
    }

    if (role && !validRoles.includes(role)) throw new Error("Rôle invalide");

    const fields = [];
    const values = [];

    for (const key in update) {
      fields.push(`${key} = ?`);
      values.push(update[key]);
    }

    values.push(id);

    const [result] = await query(
      `UPDATE users SET ${fields.join(", ")} WHERE id = ?`,
      values
    );

    return result.affectedRows ? await this.getUserById(id) : null;
  }

  async deleteUser(id) {
    const [result] = await query("DELETE FROM users WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

export default new UserRepository();
