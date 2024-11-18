import { StatusCodes } from "http-status-codes"
import Joi from "joi"
import ApiError from "~/utils/ApiError"

const createNew = async (req, res, next) => {
  const itemSchema = Joi.object({
    productId: Joi.string().required().messages({
      "string.empty": "productId is required",
    }),
    quantity: Joi.number().integer().min(1).required().messages({
      "number.base": "quantity must be a number",
      "number.integer": "quantity must be an integer",
      "number.min": "quantity must be at least 1",
    }),
    price: Joi.number().positive().required().messages({
      "number.base": "price must be a number",
      "number.positive": "price must be a positive number",
    }),
  })
  const correctCondition = Joi.object({
    items: Joi.array()
      .items(itemSchema)
      .min(1)
      .required()
      .messages({
        "array.base": "items must be an array",
        "array.min": "items must contain at least one item",
      }),
  })
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }

}


export const orderValidation = {
  createNew
}