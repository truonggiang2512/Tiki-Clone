import express from 'express'
import { StatusCodes } from 'http-status-codes'
const Router = express.Router()
Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: "GET API seller" })
  }).post((req, res) => {
    res.status(StatusCodes.CREATED).json({ message: "CREATE API seller" })
  })
export const sellerRoutes = Router