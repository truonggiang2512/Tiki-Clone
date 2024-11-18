
import express from "express"
import { orderController } from "~/controllers/orderController"
import { authenticateJWT } from "~/middlewares/authenticateMiddleware"
import { orderValidation } from "~/validations/orderValidation"

const Router = express.Router()

Router.route('/')
  .post(authenticateJWT, orderValidation.createNew, orderController.createNew) // create an order  


export const orderRoutes = Router