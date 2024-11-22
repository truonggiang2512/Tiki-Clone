import { StatusCodes } from "http-status-codes"
import { reviewService } from "~/services/reviewService"

const createNewReview = async (req, res, next) => {
  try {
    await reviewService.createNewReview(req)
    res.status(StatusCodes.CREATED).json("Create new review successfully")
  } catch (error) {
    throw error
  }
}

export const reviewController = {
  createNewReview
}