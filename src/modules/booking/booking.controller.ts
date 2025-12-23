import { Request, Response } from "express";
import { bookingServices } from "./booking.service";

const addBooking = async (req: Request, res: Response) => {
  try {
    const booking = await bookingServices.addBooking(req.body);
    res.status(201).json({
      success: true,
      message: "Booking Added Successfully",
      data: booking,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllBooking=async(req:Request,res:Response)=>{
  try {
    const result = await bookingServices.getAllBooking()
    res.status(200).json({
      success: true,
      message: "Booking Fetched Successfully",
      data: result.rows
    })
    
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

export const bookingControllers = {
  addBooking,
  getAllBooking
};
