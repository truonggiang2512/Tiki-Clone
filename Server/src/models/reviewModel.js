import Joi from "joi"
import { GET_DB } from "~/config/mongodb";

const REVIEW_COLLECTION_NAME = "reviews"
const REVIEW_COLLECTION_SCHEMA = Joi.object({
  productId: Joi.string()
    .required()
    .pattern(/^[0-9a-fA-F]{24}$/), // MongoDB ObjectId
  userId: Joi.string()
    .required()
    .pattern(/^[0-9a-fA-F]{24}$/), // MongoDB ObjectId for the user
  rating: Joi.number()
    .required()
    .min(1)
    .max(5), // Valid range for ratings
  comment: Joi.string()
    .allow("") // Optional, allow empty string
    .max(500), // Comment character limit
  createdAt: Joi.date()
    .required(),
  updatedAt: Joi.date().allow(null)
    .required()
});



const insertOneReview = async (data) => {
  try {
    return await GET_DB().collection(REVIEW_COLLECTION_NAME).insertOne(data)
  } catch (error) {
    throw new Error(error)
  }
}

export const reviewModel = {
  REVIEW_COLLECTION_NAME,
  REVIEW_COLLECTION_SCHEMA,
  insertOneReview
}