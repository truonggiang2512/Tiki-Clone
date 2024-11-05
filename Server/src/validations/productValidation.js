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
    console.log(req.body)
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    res.status(StatusCodes.CREATED).json({ message: 'POST from Validation: API create new board' })
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