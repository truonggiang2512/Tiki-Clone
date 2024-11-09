import { StatusCodes } from "http-status-codes";
import Joi from "joi"
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/models/validator";
import ApiError from "~/utils/ApiError";


const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    name: Joi.string().required().messages({
      'any.required': 'Category name is required.',
      'string.base': 'Category name must be a string.',
    }),
    parentCategoryId: Joi.string().required().allow(null).pattern(OBJECT_ID_RULE).messages({
      'string.pattern.name': 'Invalid parent category ID format.',
    }),
  })
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}



export const categoryValidation = {
  createNew
}