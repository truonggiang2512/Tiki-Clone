import express from 'express'
import { productController } from '~/controllers/productController'
import { authenticateJWT, authorizeSeller } from '~/middlewares/authenticateMiddleware'
import { productValidation } from '~/validations/productValidation'
const Router = express.Router()

Router.route('/products')
  .get(authenticateJWT, authorizeSeller, productController.getAllSellerProduct)
  .post(authenticateJWT, authorizeSeller, productValidation.createNew, productController.createNew)
Router.route('/products/:id')
  .delete(authenticateJWT, authorizeSeller, productController.deleteOne)
  .put(authenticateJWT, authorizeSeller, productValidation.updateProduct, productController.editOneById)
export const sellerRoutes = Router