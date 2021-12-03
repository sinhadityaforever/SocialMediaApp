export default {
  mongo_username: process.env.MONGO_USERNAME ?? "",
  mongo_password: process.env.MONGO_PASSWORD ?? "",
  mongo_db_name: process.env.MONGO_DB_NAME ?? "",
  port: process.env.PORT ?? "4000",
  cloudinary_name: process.env.CLOUDINARY_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};
