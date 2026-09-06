import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware.js";
import {
  clientSchema,
  updateClientSchema
} from "../validators/client.validator.js";
import { formatZodError } from "../utils/formatZodError.js";
import { sendResponse } from "../utils/sendResponse.js";
import {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient
} from "../services/client.service.js";

export const createClientController = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const validationResult = clientSchema.safeParse(req.body);

  if (!validationResult.success) {
    sendResponse({
      res,
      statusCode: 400,
      message: "Validation failed",
      errors: formatZodError(validationResult.error),
    });

    return;
  }

  if (!req.userId) {
    sendResponse({
      res,
      statusCode: 401,
      message: "Authentication required",
    });

    return;
  }

  try {
    const client = await createClient(
      validationResult.data,
      req.userId
    );

    sendResponse({
      res,
      statusCode: 201,
      message: "Client created successfully",
      data: {
        client,
      },
    });
  } catch {
    sendResponse({
      res,
      statusCode: 500,
      message: "Unable to create client",
    });
  }
};

export const getClientsController = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  if (!req.userId) {
    sendResponse({
      res,
      statusCode: 401,
      message: "Authentication required",
    });

    return;
  }

  try {
    const clients = await getClients(req.userId);

    sendResponse({
      res,
      statusCode: 200,
      message: "Clients retrieved successfully",
      data: {
        clients,
      },
    });
  } catch {
    sendResponse({
      res,
      statusCode: 500,
      message: "Unable to retrieve clients",
    });
  }
};

export const updateClientController = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const validationResult = updateClientSchema.safeParse(req.body);

  if (!validationResult.success) {
    sendResponse({
      res,
      statusCode: 400,
      message: "Validation failed",
      errors: formatZodError(validationResult.error),
    });

    return;
  }

  if (!req.userId) {
    sendResponse({
      res,
      statusCode: 401,
      message: "Authentication required",
    });

    return;
  }

  try {
    const client = await updateClient(
      String(req.params.id),
      validationResult.data,
      req.userId
    );

    if (!client) {
      sendResponse({
        res,
        statusCode: 404,
        message: "Client not found",
      });

      return;
    }

    sendResponse({
      res,
      statusCode: 200,
      message: "Client updated successfully",
      data: {
        client,
      },
    });
  } catch {
    sendResponse({
      res,
      statusCode: 500,
      message: "Unable to update client",
    });
  }
};

export const deleteClientController = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  if (!req.userId) {
    sendResponse({
      res,
      statusCode: 401,
      message: "Authentication required",
    });

    return;
  }

  try {
    const client = await deleteClient(
      String(req.params.id),
      req.userId
    );

    if (!client) {
      sendResponse({
        res,
        statusCode: 404,
        message: "Client not found",
      });

      return;
    }

    sendResponse({
      res,
      statusCode: 200,
      message: "Client deleted successfully",
      data: {
        client,
      },
    });
  } catch {
    sendResponse({
      res,
      statusCode: 500,
      message: "Unable to delete client",
    });
  }
};

export const getClientByIdController = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  if (!req.userId) {
    sendResponse({
      res,
      statusCode: 401,
      message: "Authentication required",
    });

    return;
  }

  try {
    const client = await getClientById(
      String(req.params.id),
      req.userId
    );

    if (!client) {
      sendResponse({
        res,
        statusCode: 404,
        message: "Client not found",
      });

      return;
    }

    sendResponse({
      res,
      statusCode: 200,
      message: "Client retrieved successfully",
      data: {
        client,
      },
    });
  } catch {
    sendResponse({
      res,
      statusCode: 500,
      message: "Unable to retrieve client",
    });
  }
};