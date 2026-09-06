import Client from "../models/Client.js";
import {
  ClientInput,
  UpdateClientInput
} from "../validators/client.validator.js";

export const createClient = async (
  input: ClientInput,
  userId: string
) => {
  const client = await Client.create({
    name: input.name,
    email: input.email,
    company: input.company,
    createdBy: userId,
  });

  return {
    id: client._id.toString(),
    name: client.name,
    email: client.email,
    company: client.company,
    createdBy: client.createdBy.toString(),
    createdAt: client.createdAt,
    updatedAt: client.updatedAt,
  };
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
    createdBy: client.createdBy.toString(),
    createdAt: client.createdAt,
    updatedAt: client.updatedAt,
  }));
};

export const updateClient = async (
  clientId: string,
  input: UpdateClientInput,
  userId: string
) => {
  const client = await Client.findOneAndUpdate(
    {
      _id: clientId,
      createdBy: userId,
    },
    {
      $set: input,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!client) {
    return null;
  }

  return {
    id: client._id.toString(),
    name: client.name,
    email: client.email,
    company: client.company,
    createdBy: client.createdBy.toString(),
    createdAt: client.createdAt,
    updatedAt: client.updatedAt,
  };
};

export const deleteClient = async (
  clientId: string,
  userId: string
) => {
  const client = await Client.findOneAndDelete({
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
    createdBy: client.createdBy.toString(),
    createdAt: client.createdAt,
    updatedAt: client.updatedAt,
  };
};