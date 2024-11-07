import express from 'express'
import { authenticateJWT } from '~/middlewares/authenticateMiddleware';
import { productRoutes } from './productRoutes';
import { userRoutes } from './userRoutes';

const Router = express.Router();
Router.use('/user', userRoutes)
Router.use('/product', authenticateJWT, productRoutes)
export const APIs_V1 = Router