import Joi, { string } from "joi";
import { StatusCodes } from 'http-status-codes'
import ApiError from "~/utils/ApiError";

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    name: Joi.string().required().min(3).max(50).trim().strict(),
    desc: Joi.string().required().min(3).max(120).trim().strict(),
    // price: Joi.number().required(),
    // discount: Joi.number(),
    // finalPrice: Joi.number(),
    // stock: Joi.number().required(),
    // createdAt: Joi.date().required()
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
export const boardValidation = {
  createNew
}