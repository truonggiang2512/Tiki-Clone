import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { userController } from '~/controllers/userController';
import { authenticateJWT, authorizeAdmin } from '~/middlewares/authenticateMiddleware';
import { userValidation } from '~/validations/userValidation';
const Router = express.Router();
Router.route('/signup')
  .post(userValidation.createNew, userController.createNew),
  Router.route('/login')
    .post(userValidation.signIn, userController.signIn)
Router.route('/:userId').get(authenticateJWT, userController.getDetailUser).put(authenticateJWT, userValidation.updateOne, userController.updateUserById).delete(authenticateJWT, userController.softDeleteUser)
Router.route('').get(authenticateJWT, authorizeAdmin, userController.getAllUser)
//TODO enhance user order api 
export const userRoutes = Router