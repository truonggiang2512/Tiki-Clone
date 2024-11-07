import Joi, { string } from "joi";
import { StatusCodes } from 'http-status-codes'
import ApiError from "~/utils/ApiError";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/models/validator";

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    sellerId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    name: Joi.string().required().min(3).max(50).trim().strict(),
    desc: Joi.string().required().min(3).max(255).trim().strict(),
    price: Joi.number().required(),
    discount: Joi.number().optional(),
    stock: Joi.number().required(),
    status: Joi.string().valid('in stock', 'out of stock').default('in stock'),
    categoryId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).optional(),
    createdAt: Joi.date().timestamp('javascript').default(() => Date.now()),
    updatedAt: Joi.date().timestamp('javascript').allow(null).default(() => null),

  })
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // validate du lieu thanh cong -> controller dieu huong 
    next();
  }
  catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }

}
export const productValidation = {
  createNew
}