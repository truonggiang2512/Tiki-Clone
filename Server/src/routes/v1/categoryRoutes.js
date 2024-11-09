import express from "express"
import { categoryController } from "~/controllers/categoryController";
import { authenticateJWT, authorizeAdmin } from "~/middlewares/authenticateMiddleware";
import { categoryValidation } from "~/validations/categoryValidation";
const Router = express.Router()

Router.route('/')
  .get(categoryController.getAllCategory)
  .post(authenticateJWT, authorizeAdmin, categoryValidation.createNew, categoryController.createNew)
Router.route('/:categoryId')
  .delete(authenticateJWT, authorizeAdmin, categoryController.deleteOne).put(authenticateJWT, authorizeAdmin, categoryValidation.createNew, categoryController.putOne)
export const categoryRoutes = Router