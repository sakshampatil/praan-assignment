import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  active: boolean;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  active: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model<IUser>("User", userSchema);
