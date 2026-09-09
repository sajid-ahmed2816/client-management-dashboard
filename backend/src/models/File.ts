import { Schema } from "mongoose";

export interface FileType {
  path: string;
  name: string;
  url: string;
  resourceType?: string;
};

const FileSchema = new Schema({
  path: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  resourceType: {
    type: String,
    required: true,
  },
}, {
  _id: false,
});

export default FileSchema;
