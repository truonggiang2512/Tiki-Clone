import { StatusCodes } from "http-status-codes";
import Joi, { string } from "joi";
import ApiError from "~/utils/ApiError";
const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    username: Joi.string()
      .min(3)
      .max(30)
      .required()
      .messages({
        'string.base': 'Tên đăng nhập phải là một chuỗi.',
        'string.empty': 'Tên đăng nhập không được để trống.',
        'string.min': 'Tên đăng nhập phải có ít nhất 3 ký tự.',
        'string.max': 'Tên đăng nhập không được quá 30 ký tự.',
      }),

    password: Joi.string()
      .min(8)
      .required()
      .messages({
        'string.base': 'Mật khẩu phải là một chuỗi.',
        'string.empty': 'Mật khẩu không được để trống.',
        'string.min': 'Mật khẩu phải có ít nhất 8 ký tự.',
      }),

    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.base': 'Email phải là một chuỗi.',
        'string.email': 'Email không hợp lệ.',
        'string.empty': 'Email không được để trống.',
      }),

    phone_number: Joi.string()
      .pattern(/^[0-9]{10,15}$/)
      .optional()
      .messages({
        'string.base': 'Số điện thoại phải là một chuỗi.',
        'string.pattern.base': 'Số điện thoại không hợp lệ.',
      }),

    address: Joi.string()
      .max(255)
      .optional()
      .messages({
        'string.base': 'Địa chỉ phải là một chuỗi.',
        'string.max': 'Địa chỉ không được quá 255 ký tự.',
      }),

    role: Joi.string()
      .valid('seller', 'buyer')
      .required()
      .messages({
        'string.base': 'Vai trò phải là một chuỗi.',
        'string.valid': 'Vai trò chỉ có thể là "seller" hoặc "buyer".',
        'string.empty': 'Vai trò không được để trống.',
      }),
    createdAt: Joi.date().timestamp('javascript').default(() => Date.now()),
    updatedAt: Joi.date().timestamp('javascript').allow(null).default(() => null),
    status: Joi.string()
      .valid('active', 'inactive')
      .messages({
        'string.base': 'Trạng thái phải là một chuỗi.',
        'string.valid': 'Trạng thái chỉ có thể là "active" hoặc "inactive".',
        'string.empty': 'Trạng thái không được để trống.',
      }).default('active')
  })
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // validate du lieu thanh cong -> controller dieu huong 
    next();
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const userValidation = {
  createNew
}