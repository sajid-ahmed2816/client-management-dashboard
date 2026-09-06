import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/auth.js";
import { sendResponse } from "../utils/sendResponse.js";

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.token;

  if (!token) {
    sendResponse({
      res,
      statusCode: 401,
      message: "Authentication required",
    });

    return;
  }

  try {
    const decoded = verifyToken(token);

    req.userId = decoded.userId;

    next();
  } catch {
    sendResponse({
      res,
      statusCode: 401,
      message: "Invalid or expired authentication token",
    });
  }
};