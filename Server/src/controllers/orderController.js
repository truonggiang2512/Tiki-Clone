import { StatusCodes } from "http-status-codes";
import { orderService } from "~/services/orderService";
import ApiError from "~/utils/ApiError";

const createNew = async (req, res, next) => {
  try {
    await orderService.createOrder(req)
    res.status(StatusCodes.CREATED).json("Order successfully")
  } catch (error) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error))
  }
}
const getOrdersByUser = async (req, res, next) => {
  try {
    const orders = await orderService.getOrdersByUserId(req.user.userId);
    res.status(StatusCodes.OK).json(orders);
  } catch (error) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error))
  }
}
const getOrderById = async (req, res, next) => {
  try {
    const order = await orderService.getOrderById(req.params.orderId);
    res.status(StatusCodes.OK).json(order);
  } catch (error) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error))
  }
}
const cancelOrder = async (req, res, next) => {
  try {
    await orderService.cancelOrder(req.params.orderId)
    res.status(StatusCodes.OK).json("Cancel Successfully");
  } catch (error) {
    next(error)
  }
}
// Fetch orders by seller ID for sellers
const getOrdersBySeller = async (req, res, next) => {
  try {
    const orders = await orderService.getOrdersBySellerId(req.user.userId);
    res.status(StatusCodes.OK).json(orders);
  } catch (error) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error))

  }
}


const updateOrderStatus = async (req, res, next) => {
  try {
    const updatedOrder = await orderService.updateOrderStatus(req);
    res.status(StatusCodes.OK).json(updatedOrder);
  } catch (error) {
    next(error)
  }
}

export const orderController = {
  getOrdersByUser,
  getOrdersBySeller,
  getOrderById,
  updateOrderStatus,
  createNew,
  cancelOrder
}