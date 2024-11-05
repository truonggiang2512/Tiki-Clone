import { MongoClient, ServerApiVersion } from "mongodb";
import ApiError from "~/utils/ApiError";
import { env } from "./environment";
import { StatusCodes } from 'http-status-codes'

// Định nghĩa tikiDatabaseInstance với giá trị ban đầu là null
let tikiDatabaseInstance = null;
const uri = env.MONGODB_URI;

// Tạo một MongoClient với một MongoClientOptions để thiết lập phiên bản API ổn định
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const CONNECT_DB = async () => {
  try {
    // Kết nối client tới server
    await client.connect();
    // Lưu trữ đối tượng database vào tikiDatabaseInstance
    tikiDatabaseInstance = client.db(env.DATABASE_NAME); // Thay "admin" bằng tên database của bạn, nếu khác
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, `Failed to connect to MongoDB: ${error.message}`);
    next()
  }
};

const GET_DB = () => {
  if (!tikiDatabaseInstance) throw new Error('Must connect to database first!');
  return tikiDatabaseInstance;
};

const CLOSE_DB = async () => {
  await tikiDatabaseInstance.close()
}

export {
  CONNECT_DB,
  GET_DB,
  CLOSE_DB
}