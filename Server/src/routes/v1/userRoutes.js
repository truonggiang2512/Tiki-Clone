import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { userController } from '~/controllers/userController';
import { userValidation } from '~/validations/userValidation';
const Router = express.Router();
Router.route('/signup')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: ' get signup API ' })
  })
  .post(userValidation.createNew, userController.createNew),
  Router.route('/login')
    .get((req, res) => {
      res.status(StatusCodes.OK).json({ message: ' get API user ' })
    })
    .post((req, res) => {
      res.status(StatusCodes.CREATED).json({ message: 'create API user ' })
    })

export const userRoutes = Router