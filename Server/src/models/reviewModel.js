import Joi from "joi"
import { ObjectId } from "mongodb";
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


const updateReview = async (data, userId) => {
  try {
    const { reviewId, rating, comment } = data
    if (!ObjectId.isValid(reviewId)) {
      throw new Error("Invalid reviewId format.");
    }
    const query = {
      _id: ObjectId.createFromHexString(reviewId),
      userId: userId.toString(),
    };
    return await GET_DB()
      .collection(REVIEW_COLLECTION_NAME)
      .findOneAndUpdate(
        query, // Check if a review exists for this review by this user
        {
          $set: { rating, comment, updatedAt: new Date().getTime() }, // Update fields
        },
        {
          returnDocument: "after", // Return the updated or inserted document
        }
      );
  } catch (error) {
    throw new Error("Error updating review: " + error.message);
  }
};

const deleteReview = async (reviewId, userId) => {
  try {
    const query = {
      _id: ObjectId.createFromHexString(reviewId),
      userId: userId.toString(),
    }
    return await GET_DB()
      .collection(REVIEW_COLLECTION_NAME)
      .findOneAndDelete(
        query,
      )
  } catch (error) {
    throw new Error("Error deleting review: " + error.message);
  }
}
export const reviewModel = {
  REVIEW_COLLECTION_NAME,
  REVIEW_COLLECTION_SCHEMA,
  insertOneReview,
  updateReview,
  deleteReview
}