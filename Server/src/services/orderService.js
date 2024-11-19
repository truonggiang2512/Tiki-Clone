import { StatusCodes } from "http-status-codes";
import { ObjectId } from "mongodb";
import { orderModel } from "~/models/orderModel";
import ApiError from "~/utils/ApiError";
import { orderValidation } from "~/validations/orderValidation";

const calculateProductData = (items) => {
  let grandTotal = 0;

  items.forEach(item => {
    grandTotal += item.price * item.quantity;
  });

  return { grandTotal };
};
const getOrdersByUserId = async (req) => {
  const { userId } = req.user
  const { status, startDate, endDate } = req.query;
  try {
    if (startDate || endDate || status) return await orderModel.filterOrderByQuery({ startDate, endDate, status })
    return await orderModel.getOrdersByUserId(userId)
  } catch (error) {
    throw error
  }
}

// Fetch orders by seller ID for sellers
const getOrdersBySellerId = async (req) => {
  try {
    const sellerId = req.user.userId
    const { status, startDate, endDate } = req.query
    return await orderModel.getOrdersBySellerId(sellerId, status, startDate, endDate);
  } catch (error) {
    throw new Error('Error fetching orders for seller: ' + error.message);
  }
}

// Fetch order by order ID
const getOrderById = async (orderId) => {
  try {
    return await orderModel.getOrderById(orderId)
  } catch (error) {
    throw error
  }
}

// Update order status by order ID
const updateOrderStatus = async (req) => {
  const { orderId } = req.params
  const { status } = req.body
  try {
    if (!orderId || !status) throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid agrument")
    await orderValidation.updateStatusOrder.validateAsync({ status })
    return await orderModel.updateOrderStatus(orderId, status)
  } catch (error) {
    throw error
  }
}

const createOrder = async (req) => {
  const { userId } = req.user
  const { items } = req.body
  const { grandTotal } = calculateProductData(items);
  try {
    const reqData = {
      ...req.body,
      userId: userId,
      totalPrice: grandTotal,
      orderDate: new Date().getTime(),
      status: "processing"
    }
    await orderModel.ORDER_COLLECTION_SCHEMA.validateAsync(reqData, { abortEarly: false })

    return await orderModel.createOrder(reqData)
  } catch (error) {
    throw error
  }
}
//Cancel an order (if not yet shipped).
const cancelOrder = async (orderId) => {
  try {
    const order = await orderModel.getOrderById(orderId)
    if (!order) throw new ApiError(StatusCodes.NOT_FOUND, "Order not found")
    const { status } = order
    if (status !== "processing") throw new ApiError(StatusCodes.BAD_REQUEST, "Only orders with status 'processing' can be deleted.")
    return await orderModel.cancelOrder(orderId)
  } catch (error) {
    throw error
  }
}
const reorderOrder = async (req) => {
  try {
    const { orderId } = req.params
    const { userId } = req.user
    if (!orderId) throw new ApiError(StatusCodes.NOT_FOUND, "Order not found")

    // GET order
    const order = await orderModel.getOrderById(orderId)


    if (order.userId != userId) throw new ApiError(StatusCodes.UNAUTHORIZED, "You dont have permission")
    const { items, _id, res } = order
    // Calculate the payment grandToal
    const { grandTotal } = calculateProductData(items);


    // Allow reorder only for specific statuses
    const allowedStatuses = ["canceled", "delivered", "completed"];
    if (!allowedStatuses.includes(order.status)) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        `You can only reorder completed, delivered or canceled orders. Current status: ${order.status}`
      );
    }

    const newOrder = {
      ...res,
      userId: userId,
      totalPrice: grandTotal,
      orderDate: new Date().getTime(),
      status: "processing"
    }
    return await orderModel.createOrder(newOrder)
  } catch (error) {
    throw error
  }
}


export const orderService = {
  getOrderById,
  getOrdersBySellerId,
  getOrdersByUserId,
  updateOrderStatus,
  createOrder,
  cancelOrder,
  reorderOrder
}