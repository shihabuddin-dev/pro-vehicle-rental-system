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
        registration_number VARCHAR(20)	UNIQUE NOT NULL,
        rental_price INT NOT NULL,
        status VARCHAR(50) NOT NULL CHECK (status IN('available', 'rented', 'maintenance'))
        )`);

  // await pool.query(`
  //       CREATE TABLE IF NOT EXISTS bookings(
  //       booking_id SERIAL PRIMARY KEY,
  //       user_id INT REFERENCES users(id) ON DELETE CASCADE,
  //       vehicle_id INT REFERENCES vehicles(vehicle_id) ON DELETE CASCADE,
  //       start_date DATE NOT NULL,
  //       end_date DATE NOT NULL,
  //       status VARCHAR(15) NOT NULL CHECK (type IN('completed','confirmed','pending')),
  //       total_cost NUMERIC(10,0) NOT NULL CHECK (total_price > 0)
  //     )
  //     `);

  console.log("DB connection success");
};

export default initDb;
