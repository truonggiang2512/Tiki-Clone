import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { productController } from '~/controllers/productController'
import { authenticateJWT, authorizeSeller } from '~/middlewares/authenticateMiddleware'
import { productValidation } from '~/validations/productValidation'
const Router = express.Router()

Router.route('/')
  .get(productController.getAll)
Router.route('/seller')
  .get(authenticateJWT, authorizeSeller, productController.getAll)
  .post(authenticateJWT, authorizeSeller, productValidation.createNew, productController.createNew)
Router.route('/seller/:id')
  .delete(authenticateJWT, authorizeSeller, productController.deleteOne)
  .put(authenticateJWT, authorizeSeller, productValidation.updateProduct, productController.editOneById)
export const productRoutes = Router