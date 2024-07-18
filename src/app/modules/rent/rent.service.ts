import { TBooking } from './rent.interface';
import Booking from './rent.model';

const createRentIntoDB = async (payload: TBooking) => {
    // Log the original payload
    console.log("Original payload:", payload);

    const result = await Booking.create(payload);
    return result;
};

export const RentServices = {
    createRentIntoDB,
};
