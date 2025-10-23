import { Schema, model, Document, Types } from "mongoose";

export interface IAppointment extends Document {
  client: Types.ObjectId; // Referência ao User
  professional: Types.ObjectId; // Referência ao Professional
  service: Types.ObjectId; // Referência ao Service
  startTime: Date;
  endTime: Date;
  status: "pending" | "confirmed" | "cancelled";
}

const AppointmentSchema = new Schema<IAppointment>({
  client: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  professional: {
    type: Schema.Types.ObjectId,
    ref: "Professional",
    required: true,
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "confirmed",
  },
});

export default model<IAppointment>("Appointment", AppointmentSchema);
