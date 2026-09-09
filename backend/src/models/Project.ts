import mongoose, { Document, Schema } from "mongoose";
import FileSchema from "./File.js";
import type { FileType } from "./File.js";

export type ProjectStatus = "pending" | "in-progress" | "completed";

export interface IProject extends Document {
  name: string;
  description?: string;
  status: ProjectStatus;
  clientId: mongoose.Types.ObjectId;
  files: FileType[];
  createdBy: mongoose.Types.ObjectId;
  createdAt: string;
  updatedAt: string;
};

const projectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: {
        values: ["pending", "in-progress", "completed"],
        message: "Invalid project status",
      },
      default: "pending",
    },

    clientId: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: [true, "Client is required"],
    },

    files: {
      type: [FileSchema],
      default: [],
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Project creator is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model<IProject>("Project", projectSchema);

export default Project;