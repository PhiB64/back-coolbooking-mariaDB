import { query } from "../config/db.js";

class RentalRepository {
  async createRental(data) {
    const { title, location, beds, price, description, images } = data;
    try {
      const [result] = await query(
        `INSERT INTO rentals (title, location, beds, price, description, images)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [title, location, beds, price, description, JSON.stringify(images)]
      );
      const [rows] = await query(`SELECT * FROM rentals WHERE id = ?`, [
        result.insertId,
      ]);
      return rows[0];
    } catch (error) {
      throw new Error(`Erreur lors de la création du bien : ${error.message}`);
    }
  }

  async getAllRentals() {
    try {
      const [rows] = await query(`SELECT * FROM rentals`);
      return rows;
    } catch (error) {
      throw new Error(
        `Erreur lors de la récupération des biens : ${error.message}`
      );
    }
  }

  async getRentalById(id) {
    try {
      const [rows] = await query(`SELECT * FROM rentals WHERE id = ?`, [id]);
      if (rows.length === 0) throw new Error("Bien non trouvé");
      return rows[0];
    } catch (error) {
      throw new Error(
        `Erreur lors de la récupération du bien : ${error.message}`
      );
    }
  }

  async updateRental(id, data) {
    const { title, location, beds, price, description, images } = data;
    try {
      const [result] = await query(
        `UPDATE rentals SET title = ?, location = ?, beds = ?, price = ?, description = ?, images = ?
         WHERE id = ?`,
        [title, location, beds, price, description, JSON.stringify(images), id]
      );
      if (result.affectedRows === 0)
        throw new Error("Bien non trouvé pour mise à jour");
      const [rows] = await query(`SELECT * FROM rentals WHERE id = ?`, [id]);
      return rows[0];
    } catch (error) {
      throw new Error(
        `Erreur lors de la mise à jour du bien : ${error.message}`
      );
    }
  }

  async deleteRental(id) {
    try {
      const [result] = await query(`DELETE FROM rentals WHERE id = ?`, [id]);
      if (result.affectedRows === 0)
        throw new Error("Bien non trouvé pour suppression");
      return { id };
    } catch (error) {
      throw new Error(
        `Erreur lors de la suppression du bien : ${error.message}`
      );
    }
  }
}

export default new RentalRepository();
