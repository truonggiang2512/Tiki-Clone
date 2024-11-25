import { StatusCodes } from "http-status-codes"
import { productModel } from "~/models/productModel"
import { reviewModel } from "~/models/reviewModel"
import ApiError from "~/utils/ApiError"

const createNewReview = async (req) => {
  try {
    const { userId } = req.user
    const { productId } = req.body
    if (!userId) throw new ApiError(StatusCodes.FORBIDDEN, 'Permission denied to create this review ')
    const product = await productModel.findOneById(productId)
    if (product) {
      const sellerId = product.sellerId;
      const newReview = {
        ...req.body,
        sellerId: sellerId,
        createdAt: new Date().getTime(),
        updatedAt: null,
        userId,
      }

      return await reviewModel.insertOneReview(newReview)
    }
    else {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found')
    }
  } catch (error) {
    throw error
  }
}
const updateReview = async (req) => {
  try {
    const { userId } = req.user;
    const { reviewId } = req.params
    const data = {
      reviewId,
      ...req.body
    }
    if (!userId) throw new ApiError(StatusCodes.FORBIDDEN, 'Permission denied to create this review ')
    const review = await reviewModel.updateReview(data, userId)
    if (!review) {
      // If no document was found, throw an error
      throw new ApiError(StatusCodes.NOT_FOUND, "Review not found. Cannot update a non-existent review.");
    }
    return review
  } catch (error) {
    throw error
  }
}
const deleteReview = async (req) => {
  try {
    const { userId } = req.user;
    const { reviewId } = req.params;
    if (!userId) throw new ApiError(StatusCodes.FORBIDDEN, 'Permission denied to create this review ')
    const review = await reviewModel.deleteReview(reviewId, userId)
    return review
  } catch (error) {
    throw error
  }
}
const getReviews = async (req) => {
  try {
    const { type, id } = req.params
    if (!type && !id) throw new ApiError(StatusCodes.BAD_REQUEST, 'Missing agrument')
    if (type === "product") {
      return await reviewModel.getReviewsForProduct(id);
    }
    if (type === "seller") {
      return await reviewModel.getReviewsForSeller(id);
    }
  } catch (error) {
    throw error
  }
}
export const reviewService = {
  createNewReview,
  updateReview,
  deleteReview,
  getReviews
}