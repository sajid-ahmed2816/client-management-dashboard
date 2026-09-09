import mongoose from "mongoose";
import Client from "../models/Client.js";
import Project, { ProjectStatus } from "../models/Project.js";
import {
  ProjectInput,
  UpdateProjectInput,
} from "../validators/project.validator.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary
} from "../utils/uploadToCloudinary.js";

export const createProject = async (
  input: ProjectInput,
  userId: string,
  file?: Express.Multer.File
) => {
  const project = await Project.create({
    name: input.name,
    description: input.description,
    status: input.status,
    clientId: input.clientId,
    createdBy: userId,
  });

  try {
    if (file) {
      const filePath = `projects/${project._id.toString()}`;
      const fileName = file.originalname;

      const publicId = `${filePath}/${fileName}`;

      const uploadedFile = await uploadToCloudinary(
        file.buffer,
        publicId
      );

      project.file = {
        path: filePath,
        name: fileName,
        url: uploadedFile.secure_url
      };

      await project.save();
    }

    await project.populate("clientId", "name email company");

    const client = project.clientId as unknown as {
      _id: mongoose.Types.ObjectId;
      name: string;
      email: string;
      company: string;
    };

    return {
      id: project._id.toString(),
      name: project.name,
      description: project.description,
      status: project.status,
      clientId: client._id.toString(),
      client: {
        id: client._id.toString(),
        name: client.name,
        email: client.email,
        company: client.company,
      },
      file: project.file,
      createdBy: project.createdBy.toString(),
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  } catch (error) {
    await Project.findByIdAndDelete(project._id);
    throw error;
  }
};

export const getProjects = async (
  userId: string,
  options?: {
    search?: string;
    status?: ProjectStatus;
  }
) => {
  const filter: {
    createdBy: string;
    status?: ProjectStatus;
    $or?: Array<{
      name?: { $regex: string; $options: string };
      description?: { $regex: string; $options: string };
    }>;
  } = {
    createdBy: userId
  };

  if (options?.status) {
    filter.status = options.status;
  };

  if (options?.search) {
    filter.$or = [
      {
        name: {
          $regex: options.search,
          $options: "i"
        }
      },
      {
        description: {
          $regex: options.search,
          $options: "i"
        }
      }
    ]
  };

  const projects = await Project.find(filter).populate("clientId", "name email company").sort({
    createdAt: -1,
  });

  return projects.map((project) => {
    const client = project.clientId as unknown as {
      _id: mongoose.Types.ObjectId;
      name: string;
      email: string;
      company: string;
    }

    return ({
      id: project._id.toString(),
      name: project.name,
      description: project.description,
      status: project.status,
      clientId: client._id.toString(),
      client: {
        id: client._id.toString(),
        name: client.name,
        email: client.email,
        company: client.company
      },
      file: project.file,
      createdBy: project.createdBy.toString(),
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    })
  });
};

export const getProjectById = async (
  projectId: string,
  userId: string
) => {
  const project = await Project.findOne({
    _id: projectId,
    createdBy: userId,
  });

  if (!project) {
    return null;
  }

  return {
    id: project._id.toString(),
    name: project.name,
    description: project.description,
    status: project.status,
    clientId: project.clientId.toString(),
    createdBy: project.createdBy.toString(),
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  };
};

export const updateProject = async (
  projectId: string,
  input: UpdateProjectInput,
  userId: string,
  file?: Express.Multer.File,
) => {
  const project = await Project.findOne({
    _id: projectId,
    createdBy: userId,
  });

  if (!project) {
    return null;
  }

  if (input.clientId) {
    const client = await Client.findOne({
      _id: input.clientId,
      createdBy: userId,
    });

    if (!client) {
      return null;
    }
  }

  Object.assign(project, input);

  if (file) {
    const filePath = project.file?.path
      ?? `projects/${project._id.toString()}`;

    const fileName = file.originalname;

    const publicId = `${filePath}/${fileName}`;

    const uploadedFile = await uploadToCloudinary(
      file.buffer,
      publicId
    );

    project.file = {
      path: filePath,
      name: fileName,
      url: uploadedFile.secure_url
    };
  }

  await project.save();

  const updatedProject = await Project.findById(project._id)
    .populate("clientId", "name email company");

  if (!updatedProject) { return null; }

  const client = updatedProject.clientId as unknown as {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    company: string;
  };

  return {
    id: updatedProject._id.toString(),
    name: updatedProject.name,
    description:
      updatedProject.description,
    status: updatedProject.status,
    clientId: client._id.toString(),
    client: {
      id: client._id.toString(),
      name: client.name,
      email: client.email,
      company: client.company,
    },
    file: updatedProject.file,
    createdBy: updatedProject.createdBy.toString(),
    createdAt: updatedProject.createdAt,
    updatedAt: updatedProject.updatedAt,
  };
};

export const deleteProject = async (
  projectId: string,
  userId: string
) => {
  const project = await Project.findOne({
    _id: projectId,
    createdBy: userId,
  });

  if (!project) {
    return null;
  }

  if (project.file) {
    const publicId = `${project.file.path}/${project.file.name}`;

    try {
      await deleteFromCloudinary(publicId, project.file.resourceType);
    } catch (error) {
      console.error("Cloudinary file deletion failed:", error);
    }
  }

  await Project.findByIdAndDelete(project._id);

  return {
    id: project._id.toString(),
    name: project.name,
    status: project.status,
  };
};