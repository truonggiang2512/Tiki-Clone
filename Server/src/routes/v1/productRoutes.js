import express from 'express'
import { productController } from '~/controllers/productController'
import { authenticateJWT, authorizeAdmin, authorizeSeller } from '~/middlewares/authenticateMiddleware'
import { productValidation } from '~/validations/productValidation'
const Router = express.Router()

Router.route('/')
  .get(productController.getAll)
  .post(authenticateJWT, authorizeAdmin, productValidation.createNew, productController.createNew)
Router.route('/:id')
  .get(authenticateJWT, productController.getDetailProduct)
  .delete(authenticateJWT, authorizeAdmin, productController.deleteOne)
  .put(authenticateJWT, authorizeAdmin, productValidation.updateProduct, productController.editOneById)
export const productRoutes = Router