import express from 'express'
import { StatusCodes } from 'http-status-codes'
const Router = express.Router();
Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: ' get API user ' })
  })
  .post((req, res) => {
    res.status(StatusCodes.CREATED).json({ message: 'create API user ' })
  })
export const userRoutes = Router