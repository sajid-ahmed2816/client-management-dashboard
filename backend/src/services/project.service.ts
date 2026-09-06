import mongoose from "mongoose";
import Client from "../models/Client.js";
import Project, { ProjectStatus } from "../models/Project.js";
import {
  ProjectInput,
  UpdateProjectInput,
} from "../validators/project.validator.js";

export const createProject = async (
  input: ProjectInput,
  userId: string
) => {
  const project = await Project.create({
    name: input.name,
    description: input.description,
    status: input.status,
    clientId: input.clientId,
    createdBy: userId,
  });

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
  userId: string
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

  await project.save();

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

export const deleteProject = async (
  projectId: string,
  userId: string
) => {
  const project = await Project.findOneAndDelete({
    _id: projectId,
    createdBy: userId,
  });

  if (!project) {
    return null;
  }

  return {
    id: project._id.toString(),
    name: project.name,
    status: project.status,
  };
};