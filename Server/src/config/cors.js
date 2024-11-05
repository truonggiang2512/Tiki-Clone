import ApiError from "~/utils/ApiError"
import { StatusCodes } from 'http-status-codes'

const whitelist = ['localhost:3000', 'localhost:8017']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new ApiError(StatusCodes.NETWORK_AUTHENTICATION_REQUIRED, 'Not allowed by CORS'))
    }
  }
}
export default {
  corsOptions
}
