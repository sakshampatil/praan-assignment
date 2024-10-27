import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  devices: number;
  active: boolean;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  devices: { type: Number, default: 1 },
  active: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model<IUser>("users", userSchema);
