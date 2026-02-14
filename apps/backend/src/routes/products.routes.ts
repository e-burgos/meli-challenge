import { Router } from 'express';
import * as productsController from '../controllers/products.controller';

const router = Router();

router.get('/', productsController.list);
router.get('/:productId', productsController.getById);

export const productsRoutes = router;
