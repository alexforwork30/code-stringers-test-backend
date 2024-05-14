import mongoose, { Document, Schema, Model } from "mongoose";
import { IUser } from "./user.model";

export interface IUserCredential extends Document {
  password: string;
  userId: mongoose.Types.ObjectId;
  user?: IUser;
}

const userCredential = new Schema<IUserCredential>({
  password: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

userCredential.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

userCredential.set("toObject", { virtuals: true });
userCredential.set("toJSON", { virtuals: true });

const UserCredential: Model<IUserCredential> = mongoose.model(
  "UserCredential",
  userCredential,
  "UserCredentials"
);

export default UserCredential;
