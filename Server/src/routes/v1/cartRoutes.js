import express from "express"
import { cartController } from "~/controllers/cartController"
import { authenticateJWT } from "~/middlewares/authenticateMiddleware"
import { cartValidation } from "~/validations/cartValidation"
const Router = express.Router()

Router.route('/')
  .get(authenticateJWT, cartController.getCartByUserId)           // Lấy giỏ hàng của user
  .post(authenticateJWT, cartValidation.createNew, cartController.addToCart)        // Thêm sản phẩm vào giỏ hàng
Router.route('/remove-item')
  .delete(authenticateJWT, cartController.removeItemFromCart) // Xóa sản phẩm khỏi giỏ hàng
Router.route('/update-quantity')
  .put(authenticateJWT, cartController.updateItemQuantity)
export const cartRoutes = Router