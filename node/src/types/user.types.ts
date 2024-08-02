import { Document, Model } from "mongoose";
export interface IUser {
    username: String,
    password: String,
    email:String,
    phoneno:String
}
export interface IUserDocument extends IUser, Document {}
// export interface IUserModel extends Model<IUserDocument> {}