import express from 'express'
import { orderController } from '~/controllers/orderController'
import { productController } from '~/controllers/productController'
import { authenticateJWT, authorizeSeller } from '~/middlewares/authenticateMiddleware'
import { productValidation } from '~/validations/productValidation'
const Router = express.Router()

Router.route('/products')
  .get(authenticateJWT, authorizeSeller, productController.getAllSellerProduct)
  .post(authenticateJWT, authorizeSeller, productValidation.createNew, productController.createNew)
Router.route('/products/:id')
  .get(authenticateJWT, authorizeSeller, productController.getDetailProduct)
  .delete(authenticateJWT, authorizeSeller, productController.deleteOne)
  .put(authenticateJWT, authorizeSeller, productValidation.updateProduct, productController.editOneById)
Router.route('/orders')
  .get(authenticateJWT, authorizeSeller, orderController.getOrdersBySeller)
export const sellerRoutes = Router