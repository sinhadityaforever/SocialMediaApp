export default {
  mongo_username: process.env.MONGO_USERNAME ?? "",
  mongo_password: process.env.MONGO_PASSWORD ?? "",
  mongo_db_name: process.env.MONGO_DB_NAME ?? "",
  port: process.env.PORT ?? "4000",
};
