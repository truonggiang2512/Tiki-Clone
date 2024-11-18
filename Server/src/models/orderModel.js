import Joi from "joi"
import { ObjectId } from "mongodb"
import { GET_DB } from "~/config/mongodb"

const ORDER_COLLECTION_NAME = "orders"
const ORDER_COLLECTION_SCHEMA = Joi.object({
  userId: Joi.string().required(),
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
        price: Joi.number().positive().required(),
      }).required()
    )
    .min(1)
    .required()
  ,
  totalPrice: Joi.number().positive().required(),
  orderDate: Joi.date().required(),
  status: Joi.string()
    .valid("processing", "shipped", "canceled", "delivered")
    .required()
})
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

export const orderModel = {
  ORDER_COLLECTION_SCHEMA,
  ORDER_COLLECTION_NAME,
  createOrder,
  getOrdersByUserId,
  getOrderById,
  deleteOrder
}