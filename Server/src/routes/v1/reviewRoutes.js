import express from "express"
import { reviewController } from "~/controllers/reviewController";
import { authenticateJWT } from "~/middlewares/authenticateMiddleware";
import { reviewValidation } from "~/validations/reviewValidation";

const Router = express.Router();

Router.route('/')
  .post(authenticateJWT, reviewValidation.createNew, reviewController.createNewReview) // Create new review
Router.route('/:reviewId')
  .put(authenticateJWT, reviewValidation.updateReview, reviewController.updateReview)
export const reviewRoutes = Router