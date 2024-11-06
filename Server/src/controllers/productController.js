import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  try {
    // dieu huong du lieu sang tang service
    const createdBoard = await boardService.createNew(req.body)

    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));

  }
}
export const productController = {
  createNew
}