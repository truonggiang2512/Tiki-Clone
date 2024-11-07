import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { productController } from '~/controllers/productController'
import { productValidation } from '~/validations/productValidation'
const Router = express.Router()

Router.route('/')
  .get(productController.getAll)
  .post(productValidation.createNew, productController.createNew)
Router.route('/:id').put(productValidation.updateProduct, productController.editOneById)
export const productRoutes = Router