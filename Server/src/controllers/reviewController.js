import { StatusCodes } from "http-status-codes"
import { reviewService } from "~/services/reviewService"

const createNewReview = async (req, res, next) => {
  try {
    await reviewService.createNewReview(req)
    res.status(StatusCodes.CREATED).json("Review added successfully")
  } catch (error) {
    next(error)
  }
}

const updateReview = async (req, res, next) => {
  try {
    const review = await reviewService.updateReview(req);
    res.status(StatusCodes.OK).json({ review })
  } catch (error) {
    next(error)
  }
}
export const reviewController = {
  createNewReview,
  updateReview
}