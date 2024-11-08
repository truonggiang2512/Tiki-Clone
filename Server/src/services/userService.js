import bcrypt from "bcryptjs"
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { userModel } from "~/models/userModel";
import ApiError from "~/utils/ApiError";
import jwt from "jsonwebtoken"
import { env } from "~/config/environment";
async function hashPassword(password) {
  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}
const createNew = async (reqBody) => {
  try {
    const hashedPassword = await hashPassword(reqBody.password);
    const newUser = {
      ...reqBody,
      passwordHash: hashedPassword,
      updatedAt: null,
      status: 'active',
      _destroy: false
    }
    // Xoa field password de thay the bang field passwordHash
    delete newUser.password;
    await userModel.USER_COLLECTION_SCHEMA.validateAsync(newUser, { abortEarly: false });
    return await userModel.createNew(newUser)
  } catch (error) {
    throw error
  }
}
const signIn = async (reqBody) => {
  try {
    const { password, email } = reqBody
    const user = await userModel.getUserByEmail(email)
    if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')
    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordCorrect) {
      throw new Error('Incorrect password');
    }
    // Generate JWT
    const payload = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, env.SECRET_JWT_KEY, { expiresIn: '30d' });
    return token;
  } catch (error) {
    throw error
  }
}
const getUserById = async (userId) => {
  try {
    const user = await userModel.getUserById(userId);
    if (!user) throw new ApiError(StatusCodes.NOT_FOUND, "user not found")
    const userData = { ...user };

    // Remove sensitive fields
    delete userData.passwordHash;
    delete userData._destroy;
    return userData
  } catch (error) {
    throw error
  }
}
const getAllUser = async () => {
  try {
    const data = await userModel.getAllUser()
    if (!data) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases(INTERNAL_SERVER_ERROR))
    const newData = data
      .filter((item) => item._destroy !== true)
      .map((item) => {
        const { passwordHash, _destroy, ...res } = item;
        return res;
      });
    return newData
  } catch (error) {
    throw error
  }
}

export const userService = {
  createNew,
  signIn,
  getUserById,
  getAllUser,
}