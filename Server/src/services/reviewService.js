import { StatusCodes } from "http-status-codes"
import { productModel } from "~/models/productModel"
import { reviewModel } from "~/models/reviewModel"
import ApiError from "~/utils/ApiError"

const createNewReview = async (req) => {
  try {
    const { userId } = req.user
    const { productId } = req.body
    if (!userId) throw new ApiError(StatusCodes.FORBIDDEN, 'Permission denied to create this review ')
    const isProductValid = productModel.findOneById(productId)
    if (isProductValid) {
      const newReview = {
        ...req.body,
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
    const review = await reviewModel.updateOrCreateReview(data, userId)
    if (!review) {
      // If no document was found, throw an error
      throw new ApiError(StatusCodes.NOT_FOUND, "Review not found. Cannot update a non-existent review.");
    }
    return review
  } catch (error) {
    throw error
  }
}

export const reviewService = {
  createNewReview,
  updateReview
}