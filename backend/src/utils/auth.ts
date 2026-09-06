import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
}

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return secret;
};

export const generateToken = (userId: string): string => {
  return jwt.sign(
    { userId },
    getJwtSecret(),
    { expiresIn: "7d", }
  );
};

export const verifyToken = (token: string): JwtPayload => {
  const decoded = jwt.verify(token, getJwtSecret());

  if (typeof decoded === "string" || !decoded.userId) {
    throw new Error("Invalid token payload");
  }

  return {
    userId: decoded.userId,
  };
};