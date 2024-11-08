import { userModel } from "~/models/userModel"
import { userService } from "~/services/userService"

const { StatusCodes } = require("http-status-codes")
const { default: ApiError } = require("~/utils/ApiError")



const createNew = async (req, res, next) => {
  try {
    // dieu huong toi tang service
    await userService.createNew(req.body)
    res.status(StatusCodes.CREATED).json("User created!!!")
  } catch (error) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
  }
}
const signIn = async (req, res, next) => {
  try {
    //dieu huong toi tang service
    const token = await userService.signIn(req.body)
    res.status(StatusCodes.OK).json({ token })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, error.message))
  }
}
const updateUserById = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await userModel.updateUserById(req.body, userId)
    res.status(StatusCodes.OK).json({ user })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, error.message))
  }
}
const getDetailUser = async (req, res, next) => {
  try {
    const userId = req.params.userId
    if (req.user.userId !== userId) {
      return next(new ApiError(StatusCodes.FORBIDDEN, "Unauthorized action"));
    }
    const user = await userService.getUserById(userId)
    res.status(StatusCodes.OK).json({ user })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, error.message))
  }
}
const getAllUser = async (req, res, next) => {
  try {
    const data = await userService.getAllUser()
    res.status(StatusCodes.OK).json({ data })
  } catch (error) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message))

  }
}
const softDeleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    if (req.user.userId !== userId) {
      return next(new ApiError(StatusCodes.FORBIDDEN, "Unauthorized action"));
    }
    const result = await userModel.softDeleteUser(userId);
    if (result.modifiedCount === 0) {
      throw new ApiError(StatusCodes.NOT_FOUND, "User not found or already deleted");
    }
    res.status(StatusCodes.OK).json("User deleted")
  } catch (error) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
  }
}

export const userController = {
  createNew,
  signIn,
  updateUserById,
  getDetailUser,
  getAllUser,
  softDeleteUser
}