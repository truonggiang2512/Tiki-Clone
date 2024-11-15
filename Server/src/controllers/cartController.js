import { StatusCodes } from "http-status-codes"
import { cartService } from "~/services/cartService"
import ApiError from "~/utils/ApiError"

const getCartByUserId = async (req, res, next) => {
  try {
    const { userId } = req.user
    const data = await cartService.getCartByUserId(userId)
    res.status(StatusCodes.OK).json({ data })
  } catch (error) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.messages))
  }
}
const addToCart = async (req, res, next) => {
  try {
    const data = await cartService.addToCart(req)
    res.status(StatusCodes.CREATED).json(data)
  } catch (error) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.messages))

  }
}
const updateItemQuantity = async (req, res, next) => {
  try {
    const data = await cartService.updateItemQuantity(req)
    res.status(StatusCodes.OK).json({ data })
  } catch (error) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.messages))

  }
}
const removeItemFromCart = async (req, res, next) => {
  try {
    const data = await cartService.removeItemFromCart(req)
    res.status(StatusCodes.OK).json({ data })
  } catch (error) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.messages))
  }
}

export const cartController = {
  getCartByUserId,
  addToCart,
  updateItemQuantity,
  removeItemFromCart
}