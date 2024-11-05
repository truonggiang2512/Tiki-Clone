import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import { env } from '~/config/environment'
// Middleware xu ly loi tap trung trong BE NodeJs (express)
export const errorHandlingMiddleware = (err, req, res, next) => {
  // Neu dev khong can than thieu statusCode thi default return status 500 INTERNAL_SERVER_ERROR
  err.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  // define responseError to control the returned 
  const responseError = {
    statusCode: err.statusCode,
    message: err.message || getReasonPhrase(err.StatusCodes),
    stack: err.stack
  }

  // chi khi moi truong la dev thi moi tra ve stack trace de debug de dang hon con khong thi xoa di 
  // if (env.BUILD_MODE !== 'dev') delete responseError.stack

  //tra ve responeError // cho FE
  res.status(responseError.statusCode).json(responseError)
  next();
}