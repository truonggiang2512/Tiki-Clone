import { StatusCodes } from "http-status-codes"
import Joi from "joi"
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/models/validator"
import ApiError from "~/utils/ApiError"

const createNew = async (req, res, next) => {
  const itemSchema = Joi.object({
    productId: Joi.string().required().pattern(OBJECT_ID_RULE).messages({
      "string.empty": "Product ID cannot be empty.",
      "string.pattern": "Invalid Product ID format.",
      "number.base": "{#label} must be a valid number.",
      "number.integer": "{#label} must be a whole number.",
      "number.min": "{#label} must be at least {#limit}.",
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
const updateStatusOrder = Joi.object({
  status: Joi.string()
    .valid("processing", "shipped", "canceled", "delivered")
    .required(),
})




export const orderValidation = {
  createNew,
  updateStatusOrder
}