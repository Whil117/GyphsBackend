import mongoose, { ConnectionOptions } from "mongoose";
import dotenv from "dotenv";
import Environment from "../assets/assets";
dotenv.config();


const dbOptions:ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
};

mongoose.connect(Environment(), dbOptions);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("connected to mongodb");
});

connection.on("warning", (e:any) => console.warn(e.stack));
