import { StatusCodes } from "http-status-codes";
import Joi from "joi"
import ApiError from "~/utils/ApiError";

const createNew = async (req, res, next) => {
  try {
    const correctCondition = Joi.object({
      productId: Joi.string()
        .required()
        .pattern(/^[0-9a-fA-F]{24}$/) // Ensures it's a valid MongoDB ObjectId
        .messages({
          "string.empty": "Product ID is required.",
          "string.pattern.base": "Product ID must be a valid MongoDB ObjectId."
        }),
      rating: Joi.number()
        .required()
        .min(1)
        .max(5) // Ratings are typically between 1 and 5
        .messages({
          "number.base": "Rating must be a number.",
          "number.min": "Rating must be at least 1.",
          "number.max": "Rating cannot exceed 5.",
          "any.required": "Rating is required."
        }),
      comment: Joi.string()
        .optional()
        .max(500) // Limit comment length to 500 characters
        .messages({
          "string.base": "Comment must be a string.",
          "string.max": "Comment cannot exceed 500 characters."
        })
    });
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

const updateReview = async (req, res, next) => {
  try {
    const correctCondition = Joi.object({
      rating: Joi.number()
        .optional()
        .min(1)
        .max(5)
        .messages({
          "number.base": "Rating must be a number.",
          "number.min": "Rating must be at least 1.",
          "number.max": "Rating cannot exceed 5."
        }),
      comment: Joi.string()
        .optional()
        .max(500)
        .messages({
          "string.base": "Comment must be a string.",
          "string.max": "Comment cannot exceed 500 characters."
        })
    })
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}
export const reviewValidation = {
  createNew,
  updateReview
}