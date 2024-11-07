import bcrypt from "bcryptjs"
import { userModel } from "~/models/userModel";

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


export const userService = {
  createNew
}