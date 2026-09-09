import mongoose, { Document, Schema } from "mongoose";
import FileSchema from "./File.js";
import type { FileType } from "./File.js";

export interface IClient extends Document {
  name: string;
  email: string;
  company?: string;
  files: FileType[];
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

    files: {
      type: [FileSchema],
      default: [],
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