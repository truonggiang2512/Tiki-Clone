import { StatusCodes } from "http-status-codes";
import ApiError from "./ApiError";

const authorizeUser = async (authUserId, targetUserId) => {
  if (!targetUserId) throw new ApiError(StatusCodes.NOT_FOUND, "User not found!!");
  if (!authUserId) throw new ApiError(StatusCodes.FORBIDDEN, "Unauthorized action");
  if (authUserId !== targetUserId) {
    throw new ApiError(StatusCodes.FORBIDDEN, "Unauthorized action");
  }
};


export const userHelper = {
  authorizeUser
};
