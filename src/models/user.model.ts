import mongoose, { Document, Schema, Model } from "mongoose";
import { EUserRole } from "../enums/user";
import { IUserCredential } from "./user-credential.model";

export interface IUser extends Document {
  name: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  role: EUserRole;
  userCredential?: IUserCredential;
}

const user = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    require: true,
    enum: EUserRole,
    default: EUserRole.USER,
  },
});

user.virtual("userCredential", {
  ref: "UserCredential",
  localField: "_id",
  foreignField: "userId",
  justOne: true,
});

user.set("toObject", { virtuals: true });
user.set("toJSON", { virtuals: true });

const User: Model<IUser> = mongoose.model("User", user, "Users");

export default User;
