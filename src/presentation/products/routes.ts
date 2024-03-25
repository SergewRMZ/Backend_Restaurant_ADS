import { Router } from 'express';
import { envs } from '../../config/envs';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ProductController } from './products.controller';
import { ProductService } from '../services/product-service';

export class ProductRoutes {


  static get routes(): Router {

    const router = Router();
    const productService = new ProductService();
    const controller = new ProductController(productService);

    router.get('/', controller.getProducts);
    router.post('/', [ AuthMiddleware.validateJWT ] ,controller.createProduct);
    return router;
  }
}
