import { Router } from 'express';
import * as sellersController from '../controllers/sellers.controller';

const router = Router();

router.get('/', sellersController.list);
router.get('/:sellerId', sellersController.getById);

export const sellersRoutes = router;
