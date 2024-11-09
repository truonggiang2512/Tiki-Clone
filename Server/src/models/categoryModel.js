import Joi from "joi"
import { ObjectId } from "mongodb"
import { GET_DB } from "~/config/mongodb"
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "./validator"
const CATEGORY_COLLECTION_NAME = "categories"
const CATEGORY_COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Category name is required.',
    'string.base': 'Category name must be a string.',
  }),
  parentCategoryId: Joi.string().allow(null).required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).messages({
    'string.pattern.name': 'Invalid parent category ID format.',
  }),
  createdBy: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
})


const createNew = async (data) => {
  try {
    return await GET_DB().collection(CATEGORY_COLLECTION_NAME).insertOne(data)
  } catch (error) {
    throw new Error(error)
  }
}
const getCategoryById = async (cateId) => {
  try {
    return await GET_DB().collection(CATEGORY_COLLECTION_NAME).findOne({ _id: cateId })
  } catch (error) {
    throw new Error(error)
  }
}
const getAllCategory = async () => {
  try {
    return await GET_DB().collection(CATEGORY_COLLECTION_NAME).find({}).toArray()
  } catch (error) {
    throw new Error(error)
  }
}
const deleteOne = async (categoryId) => {
  try {
    const result = await GET_DB().collection(CATEGORY_COLLECTION_NAME).findOneAndDelete({ _id: ObjectId.createFromHexString(categoryId) })
    return result.value
  } catch (error) {
    throw new Error(error)
  }
}
const putOne = async (data, categoryId) => {
  try {
    return await GET_DB().collection(CATEGORY_COLLECTION_NAME).updateOne({ _id: categoryId }, { $set: data })
  } catch (error) {
    throw new Error(error)
  }
}
export const categoryModel = {
  CATEGORY_COLLECTION_NAME,
  CATEGORY_COLLECTION_SCHEMA,
  createNew,
  getCategoryById,
  getAllCategory,
  deleteOne,
  putOne
}