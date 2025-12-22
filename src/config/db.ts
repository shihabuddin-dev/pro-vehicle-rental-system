import { Pool } from "pg";
import config from ".";

// DB
export const pool = new Pool({
  connectionString: `${config.connection_str}`,
});
//  ssl:{rejectUnauthorized:false}

const initDb = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password TEXT NOT NULL, 
        phone VARCHAR(15) NOT NULL, 
        role VARCHAR(50) NOT NULL CHECK (role IN('Admin','Customer'))
        )`);

  await pool.query(`
        CREATE TABLE IF NOT EXISTS vehicles(
        vehicle_id SERIAL PRIMARY KEY,	
        name VARCHAR(100) NOT NULL,
        type VARCHAR(15) NOT NULL CHECK (type IN('car','bike','truck')),
        model INT NOT NULL,
        registration_number VARCHAR(15)	UNIQUE NOT NULL,
        rental_price INT NOT NULL,
        status VARCHAR(50) NOT NULL CHECK (status IN('available', 'rented', 'maintenance'))
        )`);

  console.log("DB connection success");
};

export default initDb;
