import Joi from "joi";
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
    role: Joi.string().required().valid('buyer', 'seller'),
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

const updateProduct = async (req, res, next) => {
  const updateCondition = Joi.object({
    sellerId: Joi.string().optional().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    name: Joi.string().optional().min(3).max(50).trim().strict(),
    desc: Joi.string().optional().min(3).max(255).trim().strict(),
    price: Joi.number().optional(),
    discount: Joi.number().optional(),
    stock: Joi.number().optional(),
    status: Joi.string().valid('in stock', 'out of stock').optional(),
    categoryId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).optional(),
    updatedAt: Joi.date().timestamp('javascript').default(() => Date.now())
  });

  try {
    await updateCondition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message));
  }
};
export const productValidation = {
  createNew,
  updateProduct
}