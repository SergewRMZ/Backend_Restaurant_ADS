import { Router } from 'express';
import { envs } from '../../config/envs';
import { ReservationService } from '../services/reservation-service';
import { ReservationController } from './reservation.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class ReservationRoutes {
  static get routes(): Router {

    const router = Router(); 
    const productService = new ReservationService();
    const controller = new ReservationController(productService);

    router.get('/', controller.getReservations);
    router.post('/', [AuthMiddleware.validateJWT], controller.createReservation);
    router.delete('/:id', [AuthMiddleware.validateJWT], controller.deleteReservation);
    router.get('/:id', [AuthMiddleware.validateJWT], controller.getUserReservation);
    return router;
  }
}

