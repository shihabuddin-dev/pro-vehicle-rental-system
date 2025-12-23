import { Router } from "express";
import { bookingControllers } from "./booking.controller";

const router = Router();

router.post('/add-new-booking', bookingControllers.addBooking);
router.get('/get-all-booking', bookingControllers.getAllBooking)

export const bookingRoutes = router;
