import { Response } from "express";

interface SendResponseOptions<T = unknown> {
  res: Response;
  statusCode: number;
  message: string;
  data?: T;
  errors?: unknown;
}

export const sendResponse = <T = unknown>({
  res,
  statusCode,
  message,
  data,
  errors,
}: SendResponseOptions<T>): void => {
  const response: {
    success: boolean;
    message: string;
    data?: T;
    errors?: unknown;
  } = {
    success: statusCode < 400,
    message,
  };

  if (data !== undefined) {
    response.data = data;
  }

  if (errors !== undefined) {
    response.errors = errors;
  }

  res.status(statusCode).json(response);
};