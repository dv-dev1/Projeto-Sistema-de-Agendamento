import { Schema, model, Document, Types } from "mongoose";

interface IAvailability {
  dayOfWeek: number; // 0 = Domingo, 1 = Segunda, etc
  startTime: string; // "09:00"
  endTime: string;   // "18:00"
  breakStart?: string;
  breakEnd?: string;
}

export interface IProfessional extends Document {
  user: Types.ObjectId;
  services: Types.ObjectId[];
  availability: IAvailability[];
}

const AvailabilitySchema = new Schema<IAvailability>(
  {
    dayOfWeek: { type: Number, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    breakStart: { type: String },
    breakEnd: { type: String },
  },
  { _id: false }
);

const ProfessionalSchema = new Schema<IProfessional>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  services: [
    {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
  ],
  availability: {
    type: [AvailabilitySchema],
    required: true,
    default: [],
  }
});

export default model<IProfessional>("Professional", ProfessionalSchema);
