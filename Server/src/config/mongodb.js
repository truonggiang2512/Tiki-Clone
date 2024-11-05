import { MongoClient, ServerApiVersion } from "mongodb";
import { MONGODB_URI, DATABASE_NAME } from "./environment";

// Định nghĩa tikiDatabaseInstance với giá trị ban đầu là null
let tikiDatabaseInstance = null;
const uri = MONGODB_URI;

// Tạo một MongoClient với một MongoClientOptions để thiết lập phiên bản API ổn định
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export const CONNECT_DB = async () => {
  try {
    // Kết nối client tới server
    await client.connect();
    // Lưu trữ đối tượng database vào tikiDatabaseInstance
    tikiDatabaseInstance = client.db(DATABASE_NAME); // Thay "admin" bằng tên database của bạn, nếu khác
  } catch (error) {
    throw new Error(`Failed to connect to MongoDB: ${error.message}`);
  }
};

export const GET_DB = () => {
  if (!tikiDatabaseInstance) throw new Error('Must connect to database first!');
  return tikiDatabaseInstance;
};
