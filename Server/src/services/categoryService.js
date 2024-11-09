import { StatusCodes } from "http-status-codes"
import { ObjectId } from "mongodb"
import { categoryModel } from "~/models/categoryModel"
import ApiError from "~/utils/ApiError"
//service layer
const createNew = async (req) => {
  try {
    const { body, user } = req
    if (body.parentCategoryId) {
      const parentOjectId = ObjectId.createFromHexString(body.parentCategoryId)
      const parentCategory = await categoryModel.getCategoryById(parentOjectId)
      if (!parentCategory) throw new ApiError(StatusCodes.BAD_REQUEST, 'Parent category does not exist')
    }
    const newCategory = {
      ...body,
      createdBy: user.userId
    }
    await categoryModel.CATEGORY_COLLECTION_SCHEMA.validateAsync(newCategory)
    const { insertedId } = await categoryModel.createNew(newCategory);
    return await categoryModel.getCategoryById(insertedId)
  } catch (error) {
    throw new Error(error)
  }

}
const deleteOne = async (req) => {
  try {
    const { categoryId } = req.params;
    const userId = req.user.userId;

    const category = await categoryModel.getCategoryById(ObjectId.createFromHexString(categoryId))
    if (!category) throw new ApiError(StatusCodes.NOT_FOUND, "Category not found")
    if (userId.toString() !== category.createdBy.toString()) {
      throw new ApiError(StatusCodes.FORBIDDEN, 'Permission denied to delete this category')
    }
    return await categoryModel.deleteOne(categoryId)
  } catch (error) {
    throw new Error(error)
  }
}
const putOne = async (req) => {
  try {
    const { categoryId } = req.params;
    const categoryOjectId = ObjectId.createFromHexString(categoryId)
    const { body } = req
    return await categoryModel.putOne(body, categoryOjectId)
  } catch (error) {
    throw new Error(error)
  }
}


export const categoryService = {
  createNew,
  deleteOne,
  putOne
}