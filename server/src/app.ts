import express, { Express } from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
import endpoints from "./endpoint.config";
import helmet from "helmet";
import morgan from "morgan";
const app: Express = express();

//Connect to mongoose
const connectionURL: string = "mongodb://localhost:27017/socialmediaapp";

mongoose.connect(connectionURL).then(() => {
  console.log("Mongo connected");
});

//essential middleware
app.use(express.json());
app.use(helmet());
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
});
