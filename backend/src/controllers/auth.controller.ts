import { Request, Response } from "express";
import {
  loginSchema,
  signupSchema,
} from "../validators/auth.validator.js";
import {
  login,
  signup,
  getCurrentUser
} from "../services/auth.service.js";
import { formatZodError } from "../utils/formatZodError.js";
import { sendResponse } from "../utils/sendResponse.js";
import { AuthenticatedRequest } from "../middleware/auth.middleware.js";

const setAuthCookie = (res: Response, token: string): void => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const signupController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const validationResult = signupSchema.safeParse(req.body);

  if (!validationResult.success) {
    sendResponse({
      res,
      statusCode: 400,
      message: "Validation failed",
      errors: formatZodError(validationResult.error),
    });

    return;
  }

  try {
    const result = await signup(validationResult.data);

    setAuthCookie(res, result.token);

    sendResponse({
      res,
      statusCode: 201,
      message: "Account created successfully",
      data: {
        user: result.user,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to create account";

    if (message === "User with this email already exists") {
      sendResponse({
        res,
        statusCode: 409,
        message,
      });

      return;
    }

    sendResponse({
      res,
      statusCode: 500,
      message: "Unable to create account",
    });
  }
};

export const loginController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const validationResult = loginSchema.safeParse(req.body);

  if (!validationResult.success) {
    sendResponse({
      res,
      statusCode: 400,
      message: "Validation failed",
      errors: formatZodError(validationResult.error),
    });

    return;
  }

  try {
    const result = await login(validationResult.data);

    setAuthCookie(res, result.token);

    sendResponse({
      res,
      statusCode: 200,
      message: "Login successful",
      data: {
        user: result.user,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to login";

    if (message === "Invalid email or password") {
      sendResponse({
        res,
        statusCode: 401,
        message,
      });

      return;
    }

    sendResponse({
      res,
      statusCode: 500,
      message: "Unable to login",
    });
  }
};

export const logoutController = (
  _req: Request,
  res: Response
): void => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  sendResponse({
    res,
    statusCode: 200,
    message: "Logout successful",
  });
};

export const meController = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.userId) {
      sendResponse({
        res,
        statusCode: 401,
        message: "Authentication required",
      });

      return;
    }

    const user = await getCurrentUser(req.userId);

    if (!user) {
      sendResponse({
        res,
        statusCode: 404,
        message: "User not found",
      });

      return;
    }

    sendResponse({
      res,
      statusCode: 200,
      message: "User retrieved successfully",
      data: {
        user
      },
    });
  } catch {
    sendResponse({
      res,
      statusCode: 500,
      message: "Unable to retrieve user",
    });
  }
};