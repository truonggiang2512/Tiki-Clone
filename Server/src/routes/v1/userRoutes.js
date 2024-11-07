import express from 'express'
import { StatusCodes } from 'http-status-codes'
const Router = express.Router();
Router.route('/signup')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: ' get signup API ' })
  })
  .post((req, res) => {
    res.status(StatusCodes.CREATED).json({ message: 'create new user ' })
  }),
  Router.route('/login')
    .get((req, res) => {
      res.status(StatusCodes.OK).json({ message: ' get API user ' })
    })
    .post((req, res) => {
      res.status(StatusCodes.CREATED).json({ message: 'create API user ' })
    }),
  Router.route('/logout')
    .get((req, res) => {
      res.status(StatusCodes.OK).json({ message: ' get API user ' })
    })
    .post((req, res) => {
      res.status(StatusCodes.CREATED).json({ message: 'create API user ' })
    })

export const userRoutes = Router