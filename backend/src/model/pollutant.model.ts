import mongoose, { Document, Schema } from "mongoose";

interface IPollutant extends Document {
  deviceId: Schema.Types.ObjectId;
  timestamp: Date;
  p1: number;
  p25: number;
  p10: number;
}

const pollutantSchema = new Schema<IPollutant>({
  deviceId: { type: Schema.Types.ObjectId, ref: "devices" },
  timestamp: { type: Date, default: new Date() },
  p1: { type: Number, default: 0 },
  p25: { type: Number, default: 0 },
  p10: { type: Number, default: 0 },
});

export default mongoose.model<IPollutant>("pollutants", pollutantSchema);
