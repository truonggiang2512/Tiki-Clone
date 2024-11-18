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

const getOrdersBySeller = async (req, res) => {
  try {
    const orders = await orderService.getOrdersBySellerId(req.user._id);
    res.status(StatusCodes.OK).json(orders);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching orders' });
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

const updateOrderStatus = async (req, res) => {
  try {
    const updatedOrder = await orderService.updateOrderStatus(req.params.id, req.body.status);
    res.status(StatusCodes.OK).json(updatedOrder);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error updating order status' });
  }
}

export const orderController = {
  getOrdersByUser,
  getOrdersBySeller,
  getOrderById,
  updateOrderStatus,
  createNew
}