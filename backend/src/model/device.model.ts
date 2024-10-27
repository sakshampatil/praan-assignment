import mongoose, { Document, Schema } from "mongoose";

interface IDevice extends Document {
  userId: Schema.Types.ObjectId;
  deviceNo: number;
}

const deviceSchema = new Schema<IDevice>({
  userId: { type: Schema.Types.ObjectId, ref: "users" },
  deviceNo: { type: Number, required: true },
});

export default mongoose.model<IDevice>("devices", deviceSchema);
