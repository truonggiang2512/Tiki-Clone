import { StatusCodes } from "http-status-codes";
import { ObjectId } from "mongodb";
import { orderModel } from "~/models/orderModel";
import ApiError from "~/utils/ApiError";

const calculateProductData = (items) => {
  let grandTotal = 0;

  items.forEach(item => {
    grandTotal += item.price * item.quantity;
  });

  return { grandTotal };
};
const getOrdersByUserId = async (userId) => {
  try {
    return await orderModel.getOrdersByUserId(userId)
  } catch (error) {
    throw error
  }
}

// Fetch orders by seller ID for sellers
const getOrdersBySellerId = async (sellerId) => {
  try {
    return await orderModel.getOrdersBySellerId(sellerId);
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
const updateOrderStatus = async (orderId, status) => {
  try {
    const db = GET_DB();
    const updatedOrder = await db.collection(ORDER_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(orderId) },
      { $set: { status } },
      { returnDocument: 'after' }
    );
    return updatedOrder.value;
  } catch (error) {
    throw new Error('Error updating order status: ' + error.message);
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