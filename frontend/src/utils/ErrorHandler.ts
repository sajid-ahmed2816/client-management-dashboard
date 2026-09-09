import axios from "axios";

export const ErrorHandler = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status == 403 || error.response?.status == 401) {
      return error.response?.data?.message ?? "Unauthorized";
    }
    return error.response?.data ?? error.message;
  }
  return error instanceof Error
    ? error.message
    : "Something went wrong";
};