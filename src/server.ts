import express, { Request, Response } from "express";
import config from "./config";
import initDB from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { authRoutes } from "./modules/auth/auth.routes";
import { vehicleRoutes } from "./modules/vehicle/vehicle.routes";
import { bookingRoutes } from "./modules/booking/booking.routes";

const app = express();
const port = config.port;

// parser (MiddleWare)
app.use(express.json());

// initializing DB
initDB();

// root
app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello Boss!");
});

// CRUD OPERATIONS
// USERS
app.use("/api/v2", userRoutes);

// AUTH
app.use("/api/v2", authRoutes);

// VEHICLES
app.use("/api/v2", vehicleRoutes);

// BOOKINGS
app.use("/api/v2", bookingRoutes);


// not found error handle
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Routes Not Found",
    path: req.path,
  });
});

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
