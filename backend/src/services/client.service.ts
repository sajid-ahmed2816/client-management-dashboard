import mongoose from "mongoose";
import Client from "../models/Client.js";
import {
  ClientInput,
  UpdateClientInput,
} from "../validators/client.validator.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../utils/uploadToCloudinary.js";

export const createClient = async (
  input: ClientInput,
  userId: string,
  files: Express.Multer.File[] = []
) => {
  const client = await Client.create({
    name: input.name,
    email: input.email,
    company: input.company,
    createdBy: userId,
  });

  try {
    if (files.length > 0) {
      const uploadedFiles = [];

      const filePath = `clients/${client._id.toString()}`;

      for (const file of files) {
        const fileName = file.originalname;
        const publicId = `${filePath}/${fileName}`;

        const uploadedFile = await uploadToCloudinary(
          file.buffer,
          publicId
        );

        uploadedFiles.push({
          path: filePath,
          name: fileName,
          url: uploadedFile.secure_url,
          resourceType: uploadedFile.resource_type,
        });
      }

      client.files = uploadedFiles;

      await client.save();
    }

    return {
      id: client._id.toString(),
      name: client.name,
      email: client.email,
      company: client.company,
      files: client.files,
      createdBy: client.createdBy.toString(),
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  } catch (error) {
    await Client.findByIdAndDelete(client._id);
    throw error;
  }
};

export const getClients = async (userId: string) => {
  const clients = await Client.find({
    createdBy: userId,
  }).sort({
    createdAt: -1,
  });

  return clients.map((client) => ({
    id: client._id.toString(),
    name: client.name,
    email: client.email,
    company: client.company,
    files: client.files,
    createdBy: client.createdBy.toString(),
    createdAt: client.createdAt,
    updatedAt: client.updatedAt,
  }));
};

export const updateClient = async (
  clientId: string,
  input: UpdateClientInput,
  userId: string,
  files: Express.Multer.File[] = []
) => {
  const client = await Client.findOne({
    _id: clientId,
    createdBy: userId,
  });

  if (!client) {
    return null;
  }

  Object.assign(client, input);

  if (files.length > 0) {
    const filePath =
      client.files?.[0]?.path ??
      `clients/${client._id.toString()}`;

    const uploadedFiles = [];

    for (const file of files) {
      const fileName = file.originalname;
      const publicId = `${filePath}/${fileName}`;

      const uploadedFile = await uploadToCloudinary(
        file.buffer,
        publicId
      );

      uploadedFiles.push({
        path: filePath,
        name: fileName,
        url: uploadedFile.secure_url,
        resourceType: uploadedFile.resource_type,
      });
    }

    client.files = [
      ...(client.files ?? []),
      ...uploadedFiles,
    ];
  }

  await client.save();

  return {
    id: client._id.toString(),
    name: client.name,
    email: client.email,
    company: client.company,
    files: client.files,
    createdBy: client.createdBy.toString(),
    createdAt: client.createdAt,
    updatedAt: client.updatedAt,
  };
};

export const deleteClient = async (
  clientId: string,
  userId: string
) => {
  const client = await Client.findOne({
    _id: clientId,
    createdBy: userId,
  });

  if (!client) {
    return null;
  }

  if (client.files.length > 0) {
    for (const file of client.files) {
      const publicId = `${file.path}/${file.name}`;

      try {
        await deleteFromCloudinary(
          publicId,
          file.resourceType
        );
      } catch (error) {
        console.error(
          `Cloudinary file deletion failed for ${file.name}:`,
          error
        );
      }
    }
  }

  await Client.findByIdAndDelete(client._id);

  return {
    id: client._id.toString(),
    name: client.name,
    email: client.email,
    company: client.company,
  };
};

export const getClientById = async (
  clientId: string,
  userId: string
) => {
  const client = await Client.findOne({
    _id: clientId,
    createdBy: userId,
  });

  if (!client) {
    return null;
  }

  return {
    id: client._id.toString(),
    name: client.name,
    email: client.email,
    company: client.company,
    files: client.files,
    createdBy: client.createdBy.toString(),
    createdAt: client.createdAt,
    updatedAt: client.updatedAt,
  };
};