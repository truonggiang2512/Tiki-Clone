import express from 'express'
import { mapOrder } from '~/utils/sorts.js'
import corsConfig from '~/config/cors'
import cors from 'cors'
import { CONNECT_DB, GET_DB, CLOSE_DB } from '~/config/mongodb'
import exitHook from "async-exit-hook"
import { env } from './config/environment'
import { APIs_V1 } from './routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'
const START_SERVER = () => {
  const app = express()
  app.use(cors(corsConfig))
  // Enable req.body json data
  app.use(express.json())
  app.use('/v1', APIs_V1)
  // Middleware xu ly loi tap trung 
  app.use(errorHandlingMiddleware)
  app.listen(env.APP_PORT, env.APP_HOST, () => {

    // eslint-disable-next-line no-console
    console.log(`Hello Docute, I am running at ${env.APP_HOST}:${env.APP_PORT}/`)
  })
  exitHook(() => {
    CLOSE_DB()
  })
}
(async () => {
  try {
    console.log("Connecting to MongoDB Atlas")
    await CONNECT_DB();
    console.log("Connected to mongoDB")
    START_SERVER();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})()
