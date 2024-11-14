import { StatusCodes } from "http-status-codes";

const getOrdersByUser = async (req, res) => {
  try {
    const orders = await orderService.getOrdersByUserId(req.user._id);
    res.status(StatusCodes.OK).json(orders);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching orders' });
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

const getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    res.status(StatusCodes.OK).json(order);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching order details' });
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

export const ordersController = {
  getOrdersByUser,
  getOrdersBySeller,
  getOrderById,
  updateOrderStatus
}