import { pool } from "../../config/db";

const addVehicle = async (payload: Record<string, unknown>) => {
  const { name, type, model, registration_number, rental_price, status } =
    payload;
  const result = await pool.query(
    `INSERT INTO vehicles(name, type, model, registration_number, rental_price, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
    [name, type, model, registration_number, rental_price, status]
  );
  return result;
};

const getAllVehicle = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);
  return result;
};

const getSingleVehicle = async (id: string) => {
  const result= await pool.query(`SELECT * FROM vehicles WHERE vehicle_id=$1`, [id]);
  return result
};

const updateSingleVehicle = async (
  payload: Record<string, unknown>,
  id: string
) => {
  const { name, type, model, registration_number, rental_price, status } =
    payload;
  const result = await pool.query(
    `UPDATE vehicles SET name=$1, type=$2, model=$3, registration_number=$4, rental_price=$5, status=$6 WHERE vehicle_id=$7 RETURNING *`,
    [name, type, model, registration_number, rental_price, status, id]
  );
  return result;
};

const deleteSingleVehicle = async (id: string) => {
  const result = await pool.query(
    `DELETE FROM vehicles WHERE vehicle_id=$1 RETURNING *`,
    [id]
  );
  return result;
};

export const vehicleServices = {
  addVehicle,
  getAllVehicle,
  getSingleVehicle,
  updateSingleVehicle,
  deleteSingleVehicle,
};
