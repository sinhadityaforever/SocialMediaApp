import express, { Express } from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import endpoints from "./endpoint.config";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cloudinary from "cloudinary";
const app: Express = express();

//Connect to mongoose
const connectionURL: string = `mongodb+srv://${endpoints.mongo_username}:${endpoints.mongo_password}@cluster0.dgbze.mongodb.net/${endpoints.mongo_db_name}?retryWrites=true&w=majority
`;

mongoose.connect(connectionURL).then(() => {
  console.log("Mongo connected");
});

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//essential middleware
app.use(express.json({ limit: "50MB" }));
app.use(express.urlencoded({ limit: "50MB", extended: true }));
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

//Routes
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import postRoutes from "./routes/postRoutes";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);

//start server
app.listen(endpoints.port, () => {
  console.log(`Server running on port: ${endpoints.port}`);
  console.log(process.env.PORT);
});
