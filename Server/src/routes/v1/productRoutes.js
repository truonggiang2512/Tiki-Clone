import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { productController } from '~/controllers/productController'
import { boardValidation } from '~/validations/productValidation'
const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'get API product' })
  }).post(boardValidation.createNew, productController.createNew)
export const productRoutes = Router