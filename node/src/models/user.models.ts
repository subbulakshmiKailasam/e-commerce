import mongoose from "mongoose";
const Schema = mongoose.Schema;

const user = new Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 100,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 5,
    max: 255,
  },
  phoneno: {
    type: Number,
    required: true,
    min: 10,
  },
});
function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(100).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(100).required(),
    phoneno: Joi.required()

  });
  return schema.validate(user);
}

import { model } from "mongoose";
import { IUserDocument } from "../types/user.types";
import Joi from "joi";
export const usermodel = model<IUserDocument>("user", user);
export const validate = validateUser;
