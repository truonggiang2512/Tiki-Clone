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

export const userController = {
  createNew
}