import express from 'express'
import { mapOrder } from '~/utils/sorts.js'
import corsConfig from '~/config/cors'
import cors from 'cors'
import { CONNECT_DB, GET_DB, CLOSE_DB } from '~/config/mongodb'
import exitHook from "async-exit-hook"
const START_SERVER = () => {
  const app = express()
  const hostname = 'localhost'
  const port = 8017
  app.use(cors(corsConfig))
  app.get('/', async (req, res) => {
    // console.log(await GET_DB().listCollections().toArray())
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(port, hostname, () => {

    // eslint-disable-next-line no-console
    console.log(`Hello Docute, I am running at ${hostname}:${port}/`)
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
