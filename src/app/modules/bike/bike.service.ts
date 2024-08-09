import { TBike } from './bike.interface';
import { Bike } from './bike.model';

const createBikeIntoDB = async (payload: TBike) => {
    const result = await Bike.create(payload);
    return result;
};

const getAllBikeIntoDB = async () => {
    const result = await Bike.find();
    return result;
}


const updateBikeIntoDB = async (payload: TBike, id: string) => {
    const result = await Bike.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
}

const deleteBikeFromDB = async (payload: TBike, id: string) => {
    const result = await Bike.findByIdAndUpdate(
        id,
        { isAvailable: false },
        { new: true, runValidators: true }
    );
    return result;
}

export const BikeServices = {
    createBikeIntoDB,
    getAllBikeIntoDB,
    updateBikeIntoDB,
    deleteBikeFromDB
};
