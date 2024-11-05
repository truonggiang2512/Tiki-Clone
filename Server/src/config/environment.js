import 'dotenv/config'
const MONGODB_URI = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@tiki-clone.j9i82.mongodb.net/`
const DATABASE_NAME = 'Tiki-Clone'
export {
  MONGODB_URI,
  DATABASE_NAME
}