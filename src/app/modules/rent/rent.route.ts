import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { RentControllers } from './rent.controller';
import { RentValidation } from './rent.validation';

const router = express.Router();

router.post(
    '',
    auth(USER_ROLE.admin, USER_ROLE.user),
    validateRequest(RentValidation.rentValidationSchema),
    RentControllers.createRent,
);

router.put(
    '/:id/return',
    auth(USER_ROLE.admin),
    RentControllers.returnBike
)

router.get(
    "/",
    auth(USER_ROLE.admin, USER_ROLE.user),
    RentControllers.getRentBike
)

export const RentRoutes = router;
