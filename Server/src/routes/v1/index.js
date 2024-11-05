import express from 'express'
import { userRoutes } from './userRoutes';

const Router = express.Router();
Router.get('/status', (req, res) => {
  res.status(200).json({ message: 'API v1 are ready to use' })
})
Router.use('/user', userRoutes)
export const APIs_V1 = Router