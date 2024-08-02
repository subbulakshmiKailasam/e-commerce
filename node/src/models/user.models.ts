import mongoose from "mongoose";
const Schema = mongoose.Schema;

const user = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  phoneno: {
    type: Number,
    required: true,
  },
});
import { model } from "mongoose";
import { IUserDocument } from "../types/user.types";
export const usermodel = model<IUserDocument>("user", user);
