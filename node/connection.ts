import  Mongoose from "mongoose";
let database: Mongoose.Connection;
export const connect = () => {
  
  const uri = "mongodb+srv://subbulakshmi:5ixShBpskVrGpDR5@cluster0.3thcfbt.mongodb.net/E-commerce?retryWrites=true&w=majority&appName=Cluster0";
  if (database) {
    return;
  }
  Mongoose.connect(uri);
  database = Mongoose.connection;
  database.once("open", async () => {
    console.log("Connected to database");
  });
  database.on("error", () => {
    console.log("Error connecting to database");
  });
};
export const disconnect = () => {
  if (!database) {
    return;
  }
  Mongoose.disconnect();
};