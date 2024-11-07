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

export const userController = {
  createNew,
  signIn
}