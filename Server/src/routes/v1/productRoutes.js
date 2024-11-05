import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardValidation } from '~/validations/productValidation'
const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'get API product' })
  }).post(boardValidation.createNew)
export const productRoutes = Router