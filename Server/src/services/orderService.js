import { orderModel } from "~/models/orderModel";

const calculateProductData = (items) => {
  let grandTotal = 0;

  items.forEach(item => {
    grandTotal += item.price * item.quantity;
  });

  return { grandTotal };
};
const getOrdersByUserId = async (userId) => {
  try {
    const db = GET_DB();
    const orders = await db.collection(ORDER_COLLECTION_NAME).find({ buyerId: new ObjectId(userId) }).toArray();
    return orders;
  } catch (error) {
    throw new Error('Error fetching orders for user: ' + error.message);
  }
}

// Fetch orders by seller ID for sellers
const getOrdersBySellerId = async (sellerId) => {
  try {
    const db = GET_DB();
    const orders = await db.collection(ORDER_COLLECTION_NAME).find({ 'products.sellerId': new ObjectId(sellerId) }).toArray();
    return orders;
  } catch (error) {
    throw new Error('Error fetching orders for seller: ' + error.message);
  }
}

// Fetch order by order ID
const getOrderById = async (orderId) => {
  try {
    const db = GET_DB();
    const order = await db.collection(ORDER_COLLECTION_NAME).findOne({ _id: new ObjectId(orderId) });
    return order;
  } catch (error) {
    throw new Error('Error fetching order details: ' + error.message);
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
      userId,
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


export const orderService = {
  getOrderById,
  getOrdersBySellerId,
  getOrdersByUserId,
  updateOrderStatus,
  createOrder
}