import mongoose from "mongoose";
import config from "config";
import logger from "../logger/pino";

const connect = async()=> {
  // const mongodburl = process.env.mongodburl as string;
  const mongodburl = config.get("mongodburl") as string;

  return await mongoose.connect(mongodburl)
    .then(() => {
        logger.info("Database connected");
    })
    .catch((error) => {
        logger.error("db error", error);
      process.exit(1);
    });
}

export default connect;