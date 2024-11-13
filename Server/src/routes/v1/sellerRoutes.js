import express from 'express'
import { productController } from '~/controllers/productController'
import { authenticateJWT, authorizeSeller } from '~/middlewares/authenticateMiddleware'
import { productValidation } from '~/validations/productValidation'
const Router = express.Router()

Router.route('/')
  .get(authenticateJWT, authorizeSeller, productController.getAll)
  .post(authenticateJWT, authorizeSeller, productValidation.createNew, productController.createNew)
Router.route('/:id')
  .delete(authenticateJWT, authorizeSeller, productController.deleteOne)
  .put(productValidation.updateProduct, productController.editOneById)
export const productRoutes = Router