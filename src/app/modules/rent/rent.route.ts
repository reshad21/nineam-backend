import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { RentControllers } from './rent.controller';
import { RentValidation } from './rent.validation';

const router = express.Router();

router.post(
    '',
    validateRequest(RentValidation.rentValidationSchema),
    RentControllers.createRent,
);

export const RentRoutes = router;
