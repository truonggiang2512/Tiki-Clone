import express from 'express'
import { cartRoutes } from './cartRoutes';
import { categoryRoutes } from './categoryRoutes';
import { orderRoutes } from './orderRoutes';
import { productRoutes } from './productRoutes';
import { sellerRoutes } from './sellerRoutes';
import { userRoutes } from './userRoutes';

const Router = express.Router();
Router.use('/user', userRoutes)
Router.use('/product', productRoutes)
Router.use('/category', categoryRoutes)
Router.use('/seller', sellerRoutes)
Router.use('/cart', cartRoutes)
Router.use('/order', orderRoutes)
export const APIs_V1 = Router