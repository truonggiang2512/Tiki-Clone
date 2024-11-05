import express from 'express'
const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(200).json({ message: 'get API product' })
  }).post((req, res) => {
    res.status(201).json({ message: 'create API product ' })
  })
export const productRoutes = Router