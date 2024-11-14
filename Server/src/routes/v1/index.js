import express from 'express'
import { cartRoutes } from './cartRoutes';
import { categoryRoutes } from './categoryRoutes';
import { productRoutes } from './productRoutes';
import { sellerRoutes } from './sellerRoutes';
import { userRoutes } from './userRoutes';

const Router = express.Router();
Router.use('/user', userRoutes)
Router.use('/product', productRoutes)
Router.use('/category', categoryRoutes)
Router.use('/seller', sellerRoutes)
Router.use('/cart', cartRoutes)
export const APIs_V1 = Router