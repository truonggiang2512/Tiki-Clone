import Joi, { string } from "joi";
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res) => {
  const correctCondition = Joi.object({
    name: Joi.string().required().min(3).max(50).trim().strict(),
    desc: Joi.string().required().min(3).max(120).trim().strict(),
    price: Joi.number().required(),
    discount: Joi.number(),
    finalPrice: Joi.number(),
    stock: Joi.number().required(),
    createdAt: Joi.date().required()
  })
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // validate du lieu thanh cong -> controller dieu huong 
    next();
  }
  catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }
  res.status(StatusCodes.CREATED).json({ message: 'create API product ' })
}
export const boardValidation = {
  createNew
}