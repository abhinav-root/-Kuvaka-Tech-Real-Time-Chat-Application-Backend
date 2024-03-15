import { connect } from "mongoose";

function connectMongoDB() {
  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
  }
  connect(MONGO_URI).then((connection) => console.log("Connected to MongoDB"));
}

export default connectMongoDB;
