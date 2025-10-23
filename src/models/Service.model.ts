import { Schema, model, Document } from "mongoose";

export interface IService extends Document {
  name: string;
  description?: string;
  price: number;
  duration: number; // em minutos
}

const ServiceSchema = new Schema<IService>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  duration: {
    type: Number,
    required: true,
    min: 1, // duração mínima de 1 minuto
  },
});

export default model<IService>("Service", ServiceSchema);
