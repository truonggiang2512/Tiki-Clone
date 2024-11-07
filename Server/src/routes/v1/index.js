import express from 'express'
import { productRoutes } from './productRoutes';
import { userRoutes } from './userRoutes';

const Router = express.Router();
Router.use('/user', userRoutes)
Router.use('/product', productRoutes)
export const APIs_V1 = Router