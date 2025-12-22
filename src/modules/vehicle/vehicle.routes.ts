import { Router } from "express";
import { vehicleControllers } from "./vehicle.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/add-vehicle", auth("Admin"), vehicleControllers.addVehicle);
router.get("/get-all-vehicle", vehicleControllers.getAllVehicle);
router.get('/get-single-vehicle/:vehicle_id', vehicleControllers.getSingleVehicle);
router.put("/update-single-vehicle/:vehicle_id", auth("Admin"), vehicleControllers.updateSingleVehicle);
router.delete('/delete-single-vehicle/:vehicle_id', auth("Admin"), vehicleControllers.deleteSingleVehicle)

export const vehicleRoutes = router;
