import { model, Schema } from "mongoose";
import { TBooking } from "./rent.interface";

const bookingSchema = new Schema<TBooking>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        bikeId: { type: Schema.Types.ObjectId, ref: 'Bike', required: true },
        startTime: { type: Date, required: true },
        returnTime: { type: Date, required: true },
        totalCost: { type: Number, required: true },
        isReturned: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
);

const Booking = model<TBooking>('Booking', bookingSchema);

export default Booking;