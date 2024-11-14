import express from "express"
import { cartController } from "~/controllers/cartController"
import { authenticateJWT } from "~/middlewares/authenticateMiddleware"
import { cartValidation } from "~/validations/cartValidation"
const Router = express.Router()

Router.route('/')
  .get(authenticateJWT, cartController.getCart)           // Lấy giỏ hàng của user
  .post(authenticateJWT, cartValidation.createNew, cartController.addToCart)        // Thêm sản phẩm vào giỏ hàng

Router.route('/:productId')
  .put(authenticateJWT, cartController.updateCartItem)    // Cập nhật số lượng sản phẩm
  .delete(authenticateJWT, cartController.removeCartItem) // Xóa sản phẩm khỏi giỏ hàng
export const cartRoutes = Router