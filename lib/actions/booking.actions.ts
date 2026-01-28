"use server";

import connectDB from "../mongodb";
import Booking from "../../database/booking.model";

export const createBooking = async ({eventId, email, slug}: { eventId:string, email: string, slug: string }) => {
  try {
    await connectDB();

    await Booking.create({eventId, email, slug})

    return {success: true}

  } catch(e) {
    console.log('Booking failed in actions')
     return {success: false}
  }
};