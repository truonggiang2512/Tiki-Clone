import express from 'express'
import { userController } from '~/controllers/userController';
import { authenticateJWT, authorizeAdmin } from '~/middlewares/authenticateMiddleware';
import { userValidation } from '~/validations/userValidation';
const Router = express.Router();
Router.route('/signup')
  .post(userValidation.createNew, userController.createNew),
  Router.route('/login')
    .post(userValidation.signIn, userController.signIn)
Router.route('/me').get(authenticateJWT, userController.getDetailUser)
  .put(authenticateJWT, userValidation.updateOne, userController.updateUserById)
  .delete(authenticateJWT, userController.softDeleteUser)
Router.route('').get(authenticateJWT, authorizeAdmin, userController.getAllUser)
export const userRoutes = Router