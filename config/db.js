import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

// Fonction utilitaire pour toutes les requêtes SQL
export async function query(sql, params = []) {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("Connexion à la base établie avec succès");

    const [rows] = await conn.query(sql, params);
    return [rows];
  } catch (err) {
    console.error("Erreur SQL:", sql, params, err.message);
    throw err;
  } finally {
    if (conn) conn.release();
  }
}
