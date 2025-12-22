import { Router } from "express";
import { userControllers } from "./user.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/auth/register", userControllers.createUser);
router.get("/get-all-users", auth("Admin"), userControllers.getAllUser);
router.get("/get-single-users/:user_id", auth("Admin", "Customer"), userControllers.getSingleUser);
router.put("/update-single-user/:user_id", auth("Admin", "Customer"), userControllers.updateSingleUser);
router.delete("/delete-single-user/:user_id", auth("Admin"), userControllers.deleteSingleUser)

export const userRoutes = router;
