import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SubscriptionControllers } from './subscription.controller';
import { SubscriptionValidation } from './subscription.validation';

const router = express.Router();

router.post(
    '/',
    // auth(USER_ROLE.user),
    validateRequest(SubscriptionValidation.SubscriptionValidationSchema),
    SubscriptionControllers.createSubscription,
);

export const SubscriptionRoutes = router;
