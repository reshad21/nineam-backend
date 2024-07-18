import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BikeControllers } from './bike.controller';
import { BikeValidation } from './bike.validation';

const router = express.Router();

router.post(
    '/create-bike',
    validateRequest(BikeValidation.bikeValidationSchema),
    BikeControllers.createBike,
);

export const BikeRoutes = router;
