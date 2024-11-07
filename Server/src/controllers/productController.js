import { async } from '@babel/runtime/regenerator'
import { StatusCodes } from 'http-status-codes'
import { productService } from '~/services/productService'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  try {
    // dieu huong du lieu sang tang service
    const createdProduct = await productService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createdProduct)
  } catch (error) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));

  }
}
const getAll = async (req, res, next) => {
  try {
    const getAllProduct = await productService.getAll();
    res.status(StatusCodes.OK).json(getAllProduct);
  } catch (error) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
  }
}
const editOneById = async (req, res, next) => {
  try {
    const result = await productService.editOneById(req.body, req.params.id);
    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(new ApiError(StatusCodes.NO_CONTENT, error.message))
  }
}
const deleteOne = async (req, res, next) => {
  try {
    await productService.deleteOne(req.params.id)
    res.status(StatusCodes.OK).json("Delete successfully")
  } catch (error) {
    next(new ApiError(StatusCodes.NO_CONTENT, error.message))
  }
}
export const productController = {
  getAll,
  createNew,
  editOneById,
  deleteOne
}