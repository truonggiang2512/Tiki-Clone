import Joi from "joi"
import { ObjectId } from "mongodb"
import { GET_DB } from "~/config/mongodb"
import { OBJECT_ID_RULE } from "./validator";

const ORDER_COLLECTION_NAME = "orders"
const ORDER_COLLECTION_SCHEMA = Joi.object({
  userId: Joi.string().required().regex(OBJECT_ID_RULE, 'object Id'),

  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required().regex(OBJECT_ID_RULE, 'object Id'),
        quantity: Joi.number().integer().min(1).required(),
        price: Joi.number().positive().required(),
      }).required()
    )
    .min(1)
    .required(),

  totalPrice: Joi.number().positive().required(),
  orderDate: Joi.date().required(),

  status: Joi.string()
    .valid("processing", "shipped", "canceled", "delivered")
    .required(),
});

const createOrder = async (order) => {
  try {
    return GET_DB().collection(ORDER_COLLECTION_NAME).insertOne(order)
  } catch (error) {
    throw new Error(error)
  }
}

const getOrdersByUserId = async (userId) => {
  try {
    return await GET_DB().collection(ORDER_COLLECTION_NAME).find({ userId }).toArray()
  } catch (error) {
    throw new Error(error)
  }
}
const getOrderById = async (orderId) => {
  try {
    return await GET_DB().collection(ORDER_COLLECTION_NAME).findOne({ _id: ObjectId.createFromHexString(orderId) })
  } catch (error) {
    throw new Error(error)
  }
}
const deleteOrder = async (orderId) => {
  try {
    return await GET_DB().collection(ORDER_COLLECTION_NAME).findOneAndDelete({ _id: ObjectId.createFromHexString(orderId) })
  } catch (error) {
    throw new Error(error)
  }
}
const getOrdersBySellerId = async (sellerId) => {
  try {
    const orders = await GET_DB().collection(ORDER_COLLECTION_NAME).aggregate([
      {
        $unwind: "$items" // Break down each order's items array
      },
      {
        $lookup: {
          from: "products", // Join with the products collection
          let: { productId: "$items.productId" }, // Define a variable
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", { $toObjectId: "$$productId" }] }
              }
            }
          ],
          as: "productDetails"
        }
      },
      {
        $unwind: "$productDetails" // Flatten productDetails
      },
      {
        $match: {
          "productDetails.sellerId": sellerId // Match sellerId
        }
      },
      {
        $group: {
          _id: "$_id", // Regroup by order ID
          items: { $push: "$items" }, // Reconstruct items array
          totalPrice: { $first: "$totalPrice" },
          userId: { $first: "$userId" },
          orderDate: { $first: "$orderDate" },
          status: { $first: "$status" }
        }
      },
      {
        $sort: { orderDate: -1 } // Sort by newest orders first
      }
    ])
      .toArray();
    return orders;
  } catch (error) {
    throw new Error('Error fetching orders for seller: ' + error.message);
  }
}
const updateOrderStatus = async (orderId, status) => {
  try {
    return GET_DB().collection(ORDER_COLLECTION_NAME).updateOne(
      {
        _id: ObjectId.createFromHexString(orderId),
      },
      { $set: { status } },
    )
  } catch (error) {
    throw new Error(error)
  }
}
export const orderModel = {
  ORDER_COLLECTION_SCHEMA,
  ORDER_COLLECTION_NAME,
  createOrder,
  getOrdersByUserId,
  getOrderById,
  deleteOrder,
  getOrdersBySellerId,
  updateOrderStatus
}