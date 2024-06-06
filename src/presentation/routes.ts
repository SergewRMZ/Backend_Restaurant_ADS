import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { CategoryRoutes } from './category/routes';
import { ProductRoutes } from './products/routes';
import { ReservationRoutes } from './reservation/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/categories', CategoryRoutes.routes);
    router.use('/api/products', ProductRoutes.routes);
    router.use('/api/reservation', ReservationRoutes.routes);
    return router;
  }
}

