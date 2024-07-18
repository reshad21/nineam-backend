import { TBike } from './bike.interface';
import { Bike } from './bike.model';

const createBikeIntoDB = async (payload: TBike) => {
    // Log the original payload
    console.log("Original payload:", payload);

    const result = await Bike.create(payload);
    return result;
};

export const BikeServices = {
    createBikeIntoDB,
};
