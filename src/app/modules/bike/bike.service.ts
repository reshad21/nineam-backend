import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TBike } from './bike.interface';
import { Bike } from './bike.model';

const createBikeIntoDB = async (payload: TBike) => {
    // Check if a bike with the same name and model already exists
    const existingBike = await Bike.findOne({
        name: payload.name,
        model: payload.model,
        year: payload.year,
    });

    if (existingBike) {
        throw new AppError(httpStatus.FORBIDDEN, "Bike with the same name, model, and year already exists!");
    }

    const result = await Bike.create(payload);
    return result;
};



const getSingleBikeIntoDB = async (id: string) => {
    const result = await Bike.findById(id);
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
    const result = await Bike.findByIdAndDelete(id);
    return result;
}

const getAllBikeIntoDB = async (query: Record<string, unknown>) => {

    const queryObj = { ...query };
    //find korber age amader search ar kaj ta korte hobe
    //{name:{$regex:query.searchTerm, $options:"i"}}
    //{email:{$regex:query.searchTerm, $options:"i"}}

    const bikeSearchableFields = ['name', 'model', 'brand']

    let searchTerm = "";
    if (query?.searchTerm) {
        searchTerm = query?.searchTerm as string;
    }

    //filtering
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

    excludeFields.forEach(el => delete queryObj[el]);

    console.log({ query }, { queryObj });

    const searchQuery = Bike.find({
        $or: bikeSearchableFields.map((field) => ({
            [field]: { $regex: searchTerm, $options: "i" }
        }))
    });


    const filterQuery = searchQuery.find(queryObj);

    let sort = '-createdAt'
    if (query.sort) {
        sort = query.sort as string;
    }

    const sortQuery = filterQuery.sort(sort);

    let page = 1;
    let limit = 1;
    let skip = 0;


    if (query.limit) {
        limit = Number(query.limit);
    }


    if (query.page) {
        page = Number(query.page);
        skip = (page - 1) * limit;
    }


    const paginateQuery = sortQuery.skip(skip)

    const limitQuery = paginateQuery.limit(limit);

    //field limiting
    let fields = '-__v';
    if (query.fields) {
        fields = (query.fields as string).split(',').join(' ')
        console.log(fields);
    }

    const filedQuery = await limitQuery.select(fields);

    return filedQuery;
}

export const BikeServices = {
    createBikeIntoDB,
    getAllBikeIntoDB,
    getSingleBikeIntoDB,
    updateBikeIntoDB,
    deleteBikeFromDB
};
