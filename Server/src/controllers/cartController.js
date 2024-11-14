import { StatusCodes } from "http-status-codes"
import { cartService } from "~/services/cartService"
import ApiError from "~/utils/ApiError"

const getCart = async (req, res, next) => {
  try {

    res.status(StatusCodes.OK).json()
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.messages)
  }
}
const addToCart = async (req, res, next) => {
  try {
    const data = await cartService.addToCart(req)
    res.status(StatusCodes.OK).json(data)
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.messages)
  }
}
const updateCartItem = async (req, res, next) => {

}
const removeCartItem = async (req, res, next) => {

}

export const cartController = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem
}