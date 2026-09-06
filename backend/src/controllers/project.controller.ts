import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware.js";
import {
  projectSchema,
  updateProjectSchema,
  projectQuerySchema
} from "../validators/project.validator.js";
import { formatZodError } from "../utils/formatZodError.js";
import { sendResponse } from "../utils/sendResponse.js";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
} from "../services/project.service.js";

export const createProjectController = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  const validationResult = projectSchema.safeParse(req.body);

  if (!validationResult.success) {
    sendResponse({
      res,
      statusCode: 400,
      message: "Validation failed",
      errors: formatZodError(validationResult.error)
    });
    return;
  };

  if (!req.userId) {
    sendResponse({
      res,
      statusCode: 401,
      message: "Authentication required"
    });
    return;
  };

  try {
    const project = await createProject(
      validationResult.data,
      req.userId
    );

    sendResponse({
      res,
      statusCode: 201,
      message: "Project created successfully",
      data: {
        project
      }
    });
  } catch (error) {
    sendResponse({
      res,
      statusCode: 500,
      message: "Unable to create project"
    });
  };
};

export const getProjectsController = async (
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

  const queryValidation = projectQuerySchema.safeParse(req.query);

  if (!queryValidation.success) {
    sendResponse({
      res,
      statusCode: 400,
      message: "Invalid query parameters",
      errors: formatZodError(queryValidation.error),
    });

    return;
  }

  try {
    const projects = await getProjects(
      req.userId,
      queryValidation.data
    );

    sendResponse({
      res,
      statusCode: 200,
      message: "Projects retrieved successfully",
      data: {
        projects,
      },
    });
  } catch {
    sendResponse({
      res,
      statusCode: 500,
      message: "Unable to retrieve projects",
    });
  }
};

export const getProjectByIdController = async (
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
    const project = await getProjectById(
      String(req.params.id),
      req.userId
    );

    if (!project) {
      sendResponse({
        res,
        statusCode: 404,
        message: "Project not found",
      });

      return;
    }

    sendResponse({
      res,
      statusCode: 200,
      message: "Project retrieved successfully",
      data: {
        project,
      },
    });
  } catch {
    sendResponse({
      res,
      statusCode: 500,
      message: "Unable to retrieve project",
    });
  }
};

export const updateProjectController = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const validationResult = updateProjectSchema.safeParse(req.body);

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
    const project = await updateProject(
      String(req.params.id),
      validationResult.data,
      req.userId
    );

    if (!project) {
      sendResponse({
        res,
        statusCode: 404,
        message: "Project or client not found",
      });

      return;
    }

    sendResponse({
      res,
      statusCode: 200,
      message: "Project updated successfully",
      data: {
        project,
      },
    });
  } catch {
    sendResponse({
      res,
      statusCode: 500,
      message: "Unable to update project",
    });
  }
};

export const deleteProjectController = async (
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
    const project = await deleteProject(
      String(req.params.id),
      req.userId
    );

    if (!project) {
      sendResponse({
        res,
        statusCode: 404,
        message: "Project not found",
      });

      return;
    }

    sendResponse({
      res,
      statusCode: 200,
      message: "Project deleted successfully",
      data: {
        project,
      },
    });
  } catch {
    sendResponse({
      res,
      statusCode: 500,
      message: "Unable to delete project",
    });
  }
};