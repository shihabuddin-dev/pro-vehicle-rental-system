import { pool } from "../../config/db";

const addBooking = async (payload: Record<string, unknown>) => {
  const { user_id, vehicle_id, start_date, end_date } = payload;

  // get rent price from single vehicle (table)
  const vehicle = await pool.query(
    `SELECT rental_price FROM vehicles WHERE vehicle_id=$1 AND status = 'available'`,
    [vehicle_id]
  );

  if (vehicle.rows.length === 0) {
    throw new Error("Vehicle not available");
  }

  // calculate days
  const days = Math.ceil(
    (new Date(end_date as string).getTime() -
      new Date(start_date as string).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (days <= 0) {
    throw new Error("End date must be after start date");
  }

  const total_cost = vehicle.rows[0].rental_price * days;

  // insert booking
  const result = await pool.query(
    `INSERT INTO bookings(user_id, vehicle_id, start_date, end_date, total_cost) VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [user_id, vehicle_id, start_date, end_date, total_cost]
  );

  if (!result.rows.length) {
  throw new Error("Booking failed");
}

  // update vehicle status
  await pool.query(
    `UPDATE vehicles SET status = 'rented' WHERE vehicle_id = $1`,
    [vehicle_id]
  );

  return result.rows[0];
};

const getAllBooking = async () => {
  const result = await pool.query(`
    SELECT
      b.booking_id,
      u.name AS customer_name,
      v.name AS vehicle_name,
      b.start_date,
      b.end_date,
      b.status
    FROM bookings b
    JOIN users u ON b.user_id = u.id
    JOIN vehicles v ON b.vehicle_id = v.vehicle_id
    ORDER BY b.booking_id
  `);

  return result;
};

export const bookingServices = {
  addBooking,
  getAllBooking
};
