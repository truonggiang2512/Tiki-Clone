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
  sellerId: Joi.string()
    .required()
    .pattern(/^[0-9a-fA-F]{24}$/),
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
const getReviewsForProduct = async (productId) => {
  try {
    return await GET_DB()
      .collection(REVIEW_COLLECTION_NAME)
      .aggregate([
        {
          $match: {
            productId: productId // Filter reviews for the given productId
          }
        },
        {
          $lookup: {
            from: "products", // Join with the products collection
            let: { productId: "$productId" }, // Use productId from the reviews collection
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", { $toObjectId: "$$productId" }] // Compare product _id with converted productId
                  }
                }
              },
              {
                $project: {
                  name: 1,
                  category: 1,
                  price: 1
                }
              }
            ],
            as: "productDetails" // Add matched product details here
          }
        },
        {
          $unwind: "$productDetails" // Flatten product details if necessary
        },
        {
          $project: {
            _id: 1,
            rating: 1,
            comment: 1,
            userId: 1,
            createdAt: 1,
            updatedAt: 1,
            productDetails: 1 // Include product details in the result
          }
        }
      ])
      .toArray();

  } catch (error) {
    throw new Error(error)
  }
}
const getReviewsForSeller = async (sellerId) => {
  try {
    const query = {
      sellerId
    }
    return await GET_DB()
      .collection(REVIEW_COLLECTION_NAME)
      .find(query)
      .toArray()
  } catch (error) {
    throw new Error(error)
  }
}
const topRatingProduct = async () => {
  try {
    const data = await GET_DB()
      .collection(REVIEW_COLLECTION_NAME)
      .aggregate([
        { $group: { _id: "$productId", avgRating: { $avg: "$rating" } } },
        { $sort: { avgRating: -1 } },
        { $limit: 10 },
        {
          $lookup: {
            from: "products",
            let: { productId: "$_id" }, // Using _id from reviews as productId
            pipeline: [
              {
                $match: {
                  $expr: {
                    // Convert productId to ObjectId if it's not already
                    $eq: [{ $toObjectId: "$$productId" }, "$_id"]
                  }
                }
              },
              {
                $project: {
                  name: 1,
                  category: 1,
                  price: 1
                }
              }
            ],
            as: "productDetails"
          }
        },
        { $unwind: { path: "$productDetails", preserveNullAndEmptyArrays: true } },
        {
          $project: {
            productId: "$_id",
            avgRating: 1,
            productName: "$productDetails.name",
            price: "$productDetails.price",
            category: "$productDetails.category"
          }
        }
      ]).toArray();

    return data; // Ensure to return the data
  } catch (error) {
    throw new Error(error);
  }
};

export const reviewModel = {
  REVIEW_COLLECTION_NAME,
  REVIEW_COLLECTION_SCHEMA,
  insertOneReview,
  updateReview,
  deleteReview,
  getReviewsForSeller,
  getReviewsForProduct,
  topRatingProduct
}