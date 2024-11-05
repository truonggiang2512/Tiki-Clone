import express from 'express'

const Router = express.Router()
Router.route('/')
  .get((req, res) => {
    res.status(200).json({ message: "GET API seller" })
  }).post((req, res) => {
    res.status(201).json({ message: "CREATE API seller" })
  })
export const sellerRoutes = Router