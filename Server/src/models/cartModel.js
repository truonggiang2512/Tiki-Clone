import Joi from "joi"
import { ObjectId } from "mongodb"
import { GET_DB } from "~/config/mongodb"
import { OBJECT_ID_RULE } from "./validator"

const CART_COLLECTION_NAME = "carts"
const CART_COLLECTION_SCHEMA = Joi.object({
  userId: Joi.string().required(),
  items: Joi.array().items(
    Joi.object({
      productId: Joi.string().required().pattern(OBJECT_ID_RULE),
      quantity: Joi.number().integer().min(1).required(),
      price: Joi.number().positive().required(),
      addedAt: Joi.date().optional(),
    })
  ).required(),
  totalQuantity: Joi.number().integer().min(1).required(),
  grandTotal: Joi.number().positive().required(),
  updatedAt: Joi.date().required(),
})

const upsertCart = async (userId, cartData) => {
  try {
    const result = await GET_DB()
      .collection(CART_COLLECTION_NAME)
      .updateOne(
        { userId: userId },
        { $set: cartData },
        { upsert: true }
      );
    return result
  } catch (error) {
    throw new Error(error)
  }
}
const findOne = async (userId) => {
  try {
    return await GET_DB().collection(CART_COLLECTION_NAME).findOne({ userId: ObjectId.createFromHexString(userId) })
  } catch (error) {
    throw new Error(error)
  }
}


export const cartModel = {
  CART_COLLECTION_NAME,
  CART_COLLECTION_SCHEMA,
  upsertCart,
  findOne
}