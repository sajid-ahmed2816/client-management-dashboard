import mongoose, { Document, Schema } from "mongoose";

export interface IClient extends Document {
  name: string;
  email: string;
  company?: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: string;
  updatedAt: string;
}

const clientSchema = new Schema<IClient>(
  {
    name: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Client email is required"],
      lowercase: true,
      trim: true,
    },

    company: {
      type: String,
      trim: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Client creator is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Client = mongoose.model<IClient>("Client", clientSchema);

export default Client;