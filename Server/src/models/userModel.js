import { ObjectId } from "mongodb"

const Joi = require("joi")
const { GET_DB } = require("~/config/mongodb")

const USER_COLLECTION_NAME = 'users'
const USER_COLLECTION_SCHEMA = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .required()
  ,

  passwordHash: Joi.string()
    .min(8)
    .required(),

  email: Joi.string()
    .email()
    .required(),

  phone_number: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .optional(),

  address: Joi.string()
    .max(255)
    .optional(),

  role: Joi.string()
    .valid('seller', 'buyer')
    .required(),
  createdAt: Joi.date().timestamp('javascript').default(() => Date.now()),
  updatedAt: Joi.date().timestamp('javascript').allow(null).default(() => null),
  status: Joi.string()
    .valid('active', 'inactive')
    .required()
    .default('active'),
  _destroy: Joi.boolean().default(false)
})
const createNew = async (data) => {
  try {
    return await GET_DB().collection(USER_COLLECTION_NAME).insertOne(data)
  } catch (error) {
    throw new Error(error)
  }
}

const getUserByEmail = async (email) => {
  try {
    return GET_DB().collection(USER_COLLECTION_NAME).findOne({ email })
  } catch (error) {
    throw new Error(error)
  }
}
const updateUserById = async (data, userId) => {
  try {
    return await GET_DB().collection(USER_COLLECTION_NAME).updateOne({ _id: ObjectId.createFromHexString(userId) }, { $set: data })
  } catch (error) {
    throw new Error(error)
  }
}

const getUserById = async (userId) => {
  try {
    return await GET_DB().collection(USER_COLLECTION_NAME).findOne({ _id: ObjectId.createFromHexString(userId) })
  } catch (error) {
    throw new Error(error)
  }
}
const getAllUser = async () => {
  try {
    return await GET_DB().collection(USER_COLLECTION_NAME).find({}).toArray()
  } catch (error) {
    throw new Error(error)
  }
}
const softDeleteUser = async (userId) => {
  try {
    return await GET_DB().collection(USER_COLLECTION_NAME).updateOne({ _id: ObjectId.createFromHexString(userId) }, { $set: { _destroy: true } })
  } catch (error) {
    throw new Error(error)
  }
}
export const userModel = {
  USER_COLLECTION_NAME,
  USER_COLLECTION_SCHEMA,
  createNew,
  getUserByEmail,
  updateUserById,
  getUserById,
  getAllUser,
  softDeleteUser
}

