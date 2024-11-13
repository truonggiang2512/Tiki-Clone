import Joi from "joi";
import { GET_DB } from "~/config/mongodb";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "./validator";
import { ObjectId } from 'mongodb';
const PRODUCT_COLLECTION_NAME = 'products'
const PRODUCT_COLLECTION_SCHEMA = Joi.object({
  sellerId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  name: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  desc: Joi.string().required().min(3).max(255).trim().strict(),
  price: Joi.number().required(),
  finalPrice: Joi.number(),
  discount: Joi.number().optional(),
  stock: Joi.number().required(),
  createdAt: Joi.date().timestamp('javascript').default(() => Date.now()),
  updatedAt: Joi.date().timestamp('javascript').allow(null).default(() => null),
  status: Joi.string().valid('in stock', 'out of stock').default('in stock'),
  categoryId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).optional(),
  _destroy: Joi.boolean().default(false),
})
const createNew = async (data) => {
  try {
    return await GET_DB().collection(PRODUCT_COLLECTION_NAME).insertOne(data)
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    const result = await GET_DB().collection(PRODUCT_COLLECTION_NAME).findOne({
      _id: id
    })
    return result
  } catch (error) {
    throw new Error(error)
  }
}
const getAllProduct = async () => {
  try {
    const result = await GET_DB().collection(PRODUCT_COLLECTION_NAME).find().toArray()
    return result;
  } catch (error) {
    throw new Error(error)
  }
}
const getSellerProduct = async (userId) => {
  try {
    const result = await GET_DB().collection(PRODUCT_COLLECTION_NAME).find({ seller_id: userId }).toArray()
    return result;
  } catch (error) {
    throw new Error(error)
  }
}
const editOneById = async (data, productId) => {
  try {
    const result = await GET_DB().collection(PRODUCT_COLLECTION_NAME).updateOne({ _id: ObjectId.createFromHexString(productId) }, { $set: data })
    return result;
  } catch (error) {
    throw new Error(error)
  }
}
export const productModel = {
  PRODUCT_COLLECTION_NAME,
  PRODUCT_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getAllProduct,
  editOneById,
  getSellerProduct
}
