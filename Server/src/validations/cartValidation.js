import { StatusCodes } from "http-status-codes";
import Joi from "joi"
import { OBJECT_ID_RULE } from "~/models/validator";
import ApiError from "~/utils/ApiError";

const createNew = async (req, res, next) => {
  const cartItemSchema = Joi.object({
    productId: Joi.string().required().pattern(/^[a-f\d]{24}$/i).messages({
      'any.required': 'Product ID is required',
      'string.pattern.base': 'Product ID must be a valid MongoDB ObjectId',
    }),
    quantity: Joi.number().integer().min(1).required().messages({
      'any.required': 'Quantity is required',
      'number.base': 'Quantity must be a number',
      'number.min': 'Quantity must be at least 1',
      'number.integer': 'Quantity must be an integer',
    }),
    price: Joi.number().positive().required().messages({
      'any.required': 'Price is required',
      'number.base': 'Price must be a number',
      'number.positive': 'Price must be a positive value',
    }),
    addedAt: Joi.date().optional().messages({
      'date.base': 'AddedAt must be a valid date',
    })
  });
  // Validation schema cho giỏ hàng
  const correctCondition = Joi.object({
    items: Joi.array().items(cartItemSchema).min(1).required().messages({
      'array.min': 'Cart must contain at least one item',
      'any.required': 'Items are required',
    }),
  });

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const cartValidation = {
  createNew
}