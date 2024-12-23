import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.routes';
import { BikeRoutes } from '../modules/bike/bike.route';
import { OrderRoutes } from '../modules/Order/order.routes';
import { paymentRoutes } from '../modules/payment/payment.route';
import { RentRoutes } from '../modules/rent/rent.route';
import { UserRoutes } from '../modules/user/user.route';
import { ReviewRoutes } from '../modules/review/review.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/bikes',
    route: BikeRoutes,
  },
  {
    path: '/rentals',
    route: RentRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/order',
    route: OrderRoutes,
  },
  {
    path: '/payment',
    route: paymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
