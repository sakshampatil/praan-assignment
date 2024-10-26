import mongoose, { Document, Schema } from "mongoose";

interface IDevice extends Document {
  userId: Schema.Types.ObjectId;
  deviceNo: number;
  p1: number;
  p25: number;
  p10: number;
}

const deviceSchema = new Schema<IDevice>({
  userId: { type: Schema.Types.ObjectId, ref: "users" },
  deviceNo: { type: Number, required: true },
  p1: { type: Number, default: 0 },
  p25: { type: Number, default: 0 },
  p10: { type: Number, default: 0 },
});

export default mongoose.model<IDevice>("devices", deviceSchema);
