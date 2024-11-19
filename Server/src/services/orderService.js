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
  console.log(status, startDate, endDate)
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
    if (!orderId || !status) throw new ApiError(StatusCodes.BAD_REQUEST, "orderId Invalid")
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
      userId: ObjectId(userId),
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
    if (!order) throw new ApiError(StatusCodes.NOT_FOUND, "order not found")
    const { status } = order
    if (status !== "processing") throw new ApiError(StatusCodes.BAD_REQUEST, "Only orders with status 'processing' can be deleted.")
    return await orderModel.deleteOrder(orderId)
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
  cancelOrder
}