
import express from "express"
import { orderController } from "~/controllers/orderController"
import { authenticateJWT } from "~/middlewares/authenticateMiddleware"
import { orderValidation } from "~/validations/orderValidation"

const Router = express.Router()

Router.route('/')
  .get(authenticateJWT, orderController.getOrdersByUser)
  .post(authenticateJWT, orderValidation.createNew, orderController.createNew) // create an order 
Router.route('/:orderId')
  .get(authenticateJWT, orderController.getOrderById)
  .put(authenticateJWT, orderController.updateOrderStatus)
  .delete(authenticateJWT, orderController.cancelOrder)


export const orderRoutes = Router