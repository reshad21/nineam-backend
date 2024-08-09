import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BikeControllers } from './bike.controller';
import { BikeValidation } from './bike.validation';

const router = express.Router();

router.post(
    '/create-bike',
    // auth(ROLE_admin),
    validateRequest(BikeValidation.createBikeValidationSchema),
    BikeControllers.createBike,
);
router.get(
    '/',
    auth(),
    BikeControllers.getAllBike
);

router.patch(
    '/:bikeId',
    // auth(ROLE_admin),
    validateRequest(BikeValidation.updateBikeValidationSchema),
    BikeControllers.updateBike
);

router.delete(
    '/:bikeId',
    // auth(ROLE_admin),
    validateRequest(BikeValidation.updateBikeValidationSchema),
    BikeControllers.deleteBike
);

export const BikeRoutes = router;
