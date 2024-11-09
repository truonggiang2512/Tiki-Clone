import { StatusCodes } from "http-status-codes"
import { categoryModel } from "~/models/categoryModel";
import { categoryService } from "~/services/categoryService";
import ApiError from "~/utils/ApiError"

const createNew = async (req, res, next) => {
  try {
    const category = await categoryService.createNew(req);
    res.status(StatusCodes.CREATED).json(category)
  } catch (error) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error))
  }
}
const getAllCategory = async (req, res, next) => {
  try {
    const data = await categoryModel.getAllCategory()
    res.status(StatusCodes.OK).json({ data })
  } catch (error) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error))
  }
}
const deleteOne = async (req, res, next) => {
  try {
    const data = await categoryService.deleteOne(req)
    res.status(StatusCodes.OK).json(data)
  } catch (error) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error))
  }
}
const putOne = async (req, res, next) => {
  try {
    await categoryService.putOne(req)
    res.status(StatusCodes.OK).json("Update successfully")
  } catch (error) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error))
  }
}

export const categoryController = {
  createNew,
  getAllCategory,
  deleteOne,
  putOne
}